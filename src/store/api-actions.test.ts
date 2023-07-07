import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from './services/api';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../mocks';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchCameraAction, fetchCamerasAction, fetchPostReviewAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction } from './api-actions';
import { APIRoute } from '../conts';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const camera = makeFakeCamera();
const cameras = [makeFakeCamera()];
const review = makeFakeReview();
const reviews = [makeFakeReview()];
const promo = [makeFakePromo()];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Async cameras actions', () => {

  it('should dispatch cameras when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, cameras);

    const store = mockStore();
    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });
});

describe('Async camera actions', () => {

  it('should dispatch camera when GET /cameras', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${camera.id}`)
      .reply(200, camera);

    const store = mockStore();
    await store.dispatch(fetchCameraAction(camera.id));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type,
    ]);
  });
});

describe('Async similar actions', () => {

  it('should dispatch camera when GET /cameras', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${camera.id}/similar`)
      .reply(200, camera);

    const store = mockStore();
    await store.dispatch(fetchSimilarAction(camera.id));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.fulfilled.type,
    ]);
  });
});

describe('Async promo actions', () => {

  it('should dispatch promo when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, promo);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type,
    ]);
  });
});

describe('Async load reviews actions', () => {

  it('should dispatch reviews when GET /reviews', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}/${camera.id}/reviews`)
      .reply(200, reviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(camera.id));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });
});

describe('Async post review actions', () => {

  it('should dispatch reviews when GET /reviews', async () => {
    mockAPI
      .onPost(`${APIRoute.Reviews}`)
      .reply(200, reviews);

    const store = mockStore();
    await store.dispatch(fetchPostReviewAction(review));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchPostReviewAction.pending.type,
      fetchPostReviewAction.fulfilled.type,
    ]);
  });
});

describe('Async post coupon review actions', () => {

  it('should dispatch reviews when GET /coupons', async () => {
    mockAPI
      .onPost(`${APIRoute.Coupons}`)
      .reply(200, reviews);

    const store = mockStore();
    await store.dispatch(fetchPostReviewAction(review));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchPostReviewAction.pending.type,
      fetchPostReviewAction.fulfilled.type,
    ]);
  });
});
