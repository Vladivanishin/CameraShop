import { makeFakeCamera, makeFakePromo } from '../../mocks';
import { fetchCameraAction, fetchCamerasAction, fetchPostReviewAction, fetchPromoAction } from '../api-actions';
import { CatalogProcess, catalogProcess } from './catalog-process';

const cameras = Array.from({length: 5}, makeFakeCamera);
const promo = makeFakePromo();
const product = makeFakeCamera();

describe('Reducer: catalogProcess', () => {
  let state: CatalogProcess;

  beforeEach(() => {
    state = {
      cameras: [],
      isLoading: false,
      isError: false,
      promo: null,
      product: null,
      isModalBuy: false,
      isModalReview: false,
      isModalSuccess: false,
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(catalogProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });


  describe('fetchCamerasAction test', () => {
    it('Should update status to "isLoading" and reload "isError" status, if fetchCamerasAction pending', () => {
      expect(catalogProcess.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({
          ...state,
          isLoading: true,
          isError: false,
        });
    });

    it('Should load cameras and update status to "isLoading" if fetchCamerasAction fulfilled', () => {
      expect(catalogProcess.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: cameras }))
        .toEqual({
          ...state,
          cameras: cameras,
          isLoading: false,
        });
    });

    it('Should update status to "isError" is fetchCamerasAction rejected', () => {
      expect(catalogProcess.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({
          ...state,
          isError: true,
        });
    });
  });

  describe('fetchPromoAction test', () => {
    it('Should update status to "isLoading" if fetchPromoAction pending', () => {
      expect(catalogProcess.reducer(state, { type: fetchPromoAction.pending.type }))
        .toEqual({
          ...state,
          isLoading: true,
        });
    });

    it('Should load promo and update status to "isLoading" if fetchPromoAction fulfilled', () => {
      expect(catalogProcess.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: promo }))
        .toEqual({
          ...state,
          promo: promo,
          isLoading: false,
        });
    });
  });

  describe('fetchCameraAction test', () => {
    it('Should update status to "isLoading" if fetchCameraAction pending', () => {
      expect(catalogProcess.reducer(state, { type: fetchCameraAction.pending.type }))
        .toEqual({
          ...state,
          isLoading: true,
        });
    });

    it('Should load product and update status to "isLoading" if fetchCameraAction fulfilled', () => {
      expect(catalogProcess.reducer(state, { type: fetchCameraAction.fulfilled.type, payload: product }))
        .toEqual({
          ...state,
          product: product,
          isLoading: false,
        });
    });

    it('Should update status to "isError" is fetchCameraAction rejected', () => {
      expect(catalogProcess.reducer(state, { type: fetchCameraAction.rejected.type }))
        .toEqual({
          ...state,
          isError: true,
        });
    });
  });

  describe('fetchPostReviewAction test', () => {
    it('Should update status to "isLoading" if fetchPostReviewAction pending', () => {
      expect(catalogProcess.reducer(state, { type: fetchPostReviewAction.pending.type }))
        .toEqual({
          ...state,
          isLoading: true,
        });
    });

    it('Should load product and update status to "isLoading" if fetchPostReviewAction fulfilled', () => {
      expect(catalogProcess.reducer(state, { type: fetchPostReviewAction.fulfilled.type, payload: product }))
        .toEqual({
          ...state,
          isLoading : false,
          isModalReview : false,
          isModalSuccess : true,
        });
    });

    it('Should update status to "isError" is fetchPostReviewAction rejected', () => {
      expect(catalogProcess.reducer(state, { type: fetchPostReviewAction.rejected.type }))
        .toEqual({
          ...state,
          isError: true,
          isLoading : false,
          isModalReview : false,
          isModalSuccess : false,
        });
    });
  });

});

