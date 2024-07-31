import { BACKEND_PORT, FirmId, FirmUrl } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { $firm } from '..';

export const OaiDescriptionGate = createGate<FirmUrl>('OaiDescriptionsGate');
export const oaiDescriptionD = createDomain('descriptions');

export interface OaiDescription {
  oai_description_id: string;
  firm_id: string;
  oai_description_value?: string;
}
export interface OaiDescriptionQueryResult {
  status: string;
  data: {
    oai_description: OaiDescription;
  };
}

export const $oaiDescription = oaiDescriptionD.createStore<OaiDescription | null>(null);
export const fetchOaiDescriptionEvt = oaiDescriptionD.createEvent<FirmId>();

export const getOaiDescriptionByUrlFx = oaiDescriptionD.createEffect({
  handler: async ({ firmUrl }: FirmUrl): Promise<{ oai_description: OaiDescriptionQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/oai_description_by_url/${firmUrl}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const oai_description = await res.json();

    return { oai_description };
  },
});

sample({
  clock: OaiDescriptionGate.open,
  source: $oaiDescription,
  filter: (s) => !s,
  fn: (_, c) => ({ firmUrl: c?.firmUrl }),
  target: getOaiDescriptionByUrlFx,
});

sample({
  clock: OaiDescriptionGate.close,
  source: $oaiDescription,
  fn: (_, c) => null,
  target: $oaiDescription,
});

sample({
  clock: getOaiDescriptionByUrlFx.doneData,
  fn: (c) => c?.oai_description?.data?.oai_description || null,
  target: $oaiDescription,
});

// sample({
//   clock: setOaiDescriptionsPageEvt,
//   target: $oaiDescriptionsPage,
// });

// // Pagination
// sample({
//   clock: setOaiDescriptionsPageEvt,
//   source: $firm,
//   filter: (firm) => firm !== null,
//   fn: (firm, page) => ({ firmId: firm?.firm_id ?? '', page, limit: 10 }),
//   target: getOaiDescriptions,
// });

sample({
  source: $firm,
  fn: (c) => ({ firmId: c?.firm_id || '' }),
  target: fetchOaiDescriptionEvt,
});
