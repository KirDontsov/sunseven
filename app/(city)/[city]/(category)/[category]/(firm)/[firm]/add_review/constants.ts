export const enum AddReviewFields {
  Author = 'author',
  Text = 'text',
  Rating = 'rating',
}

export const AUTHOR_MAX_VALUE = 100;
export const TEXT_MAX_VALUE = 2000;
export const TEXT_INPUT_REG_EXP = /^[Ёёа-яА-Яa-zA-Z0-9 –“«».,/\-()№"']*$/;

export const DEFAULT_ADDREVIEW_FORM_VALUES = {
  [AddReviewFields.Author]: '',
  [AddReviewFields.Text]: '',
  [AddReviewFields.Rating]: '',
};
