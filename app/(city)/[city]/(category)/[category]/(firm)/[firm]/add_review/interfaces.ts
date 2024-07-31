import { AddReviewFields } from './constants';

export interface AddReviewValues {
  [AddReviewFields.Author]: string;
  [AddReviewFields.Text]: string;
  [AddReviewFields.Rating]: string;
}
