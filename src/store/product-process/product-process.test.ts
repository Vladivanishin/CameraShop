import { TabsControl } from '../../conts';
import { makeFakeCamera, makeFakeReview } from '../../mocks';
import { fetchPostReviewAction, fetchReviewsAction, fetchSimilarAction} from '../api-actions';
import { ProductProcess, productProcess } from './product-process';

const similarCameras = Array.from({length: 5}, makeFakeCamera);
const reviews = Array.from({length: 5}, makeFakeReview);

describe('Reducer: catalogProcess', () => {
  let state: ProductProcess;

  beforeEach(() => {
    state = {
      similarCameras: [],
      currentTabControl: TabsControl.Description,
      reviews: [],
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(productProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });


  describe('fetchSimilarAction test', () => {
    it('Should load similarCameras, if fetchSimilarAction fulfilled', () => {
      expect(productProcess.reducer(state, { type: fetchSimilarAction.fulfilled.type, payload: similarCameras }))
        .toEqual({
          ...state,
          similarCameras: similarCameras,
        });
    });
  });

  describe('fetchReviewsAction test', () => {
    it('Should load reviews, if fetchReviewsAction fulfilled', () => {
      expect(productProcess.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews }))
        .toEqual({
          ...state,
          reviews: reviews,
        });
    });
  });

  describe('fetchPostReviewAction test', () => {
    const review = makeFakeReview();
    it('Should post review, if fetchPostReviewAction fulfilled', () => {
      expect(productProcess.reducer(state, { type: fetchPostReviewAction.fulfilled.type, payload: review }))
        .toEqual({
          ...state,
          reviews: [review],
        });
    });
  });

});

