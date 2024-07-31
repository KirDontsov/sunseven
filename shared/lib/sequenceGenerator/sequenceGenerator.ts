/**
 * Функция генерирует массив последовательных чисел от 0 до заданного числа
 * @param {Number} maxVal
 */
export function* sequenceGenerator(maxVal: number) {
  let i = 0;

  while (i < maxVal) yield (i += 1);
}
