import { createEffect, createEvent, createStore, Event, is, sample, Store, Unit } from 'effector';

type EventAsReturnType<Payload> = unknown extends Payload ? Event<Payload> : never;

function toStoreNumber(value: number | Store<number> | unknown): Store<number> {
  if (is.store(value)) return value;
  if (typeof value === 'number') {
    if (value < 0 || !Number.isFinite(value))
      throw new Error(`timeout must be positive number or zero. Received: "${value}"`);
    return createStore(value, { name: '$timeout' });
  }

  throw new TypeError(`timeout parameter should be number or Store. "${typeof value}" was passed`);
}
/**
 * Обновляет стор из target с задержкой timeout
 * @see https://patronum.effector.dev/methods/throttle/
 */
export function createThrottleUnit<T>({
  source,
  timeout,
  target = createEvent<T>(),
}: {
  source: Unit<T>;
  timeout: number | Store<number>;
  target?: Unit<any>;
}): EventAsReturnType<T> {
  if (!is.unit(source)) throw new TypeError('source must be unit from effector');

  const $timeout = toStoreNumber(timeout);

  const timerFx = createEffect<number, void>(
    // eslint-disable-next-line no-promise-executor-return
    (timeoutValue) => new Promise((resolve) => setTimeout(resolve, timeoutValue)),
  );

  // It's ok - nothing will ever start unless source is triggered
  const $payload = createStore<T>(null as unknown as T, { serialize: 'ignore' });

  sample({
    clock: source,
    source: $payload,
    fn: (_, payload) => payload,
    target: $payload,
  });

  const triggerTick = createEvent<T>();

  const $canTick = createStore(true, { serialize: 'ignore' });

  sample({
    clock: triggerTick,
    fn: () => false,
    target: $canTick,
  });

  sample({
    clock: target,
    fn: () => true,
    target: $canTick,
  });

  sample({
    clock: source,
    filter: $canTick,
    target: triggerTick,
  });

  sample({
    source: $timeout,
    clock: triggerTick as Unit<any>,
    target: timerFx,
  });

  sample({
    // @ts-ignore
    source: $payload,
    clock: timerFx.done,
    target,
  });

  return target as any;
}
