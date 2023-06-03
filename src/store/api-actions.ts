import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Camera, Cameras, CouponType, Order, ReviewRequest, ReviewResponse, Reviews } from '../types/catalog';
import { APIRoute} from '../conts';
import { notify } from '../utils';
import { Promo } from '../types/catalog';

type ThunkConfig = {
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
};

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  undefined,
  ThunkConfig
>('fetchCamerasAction', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data: cameras } = await api.get<Cameras>(APIRoute.Cameras);
    return cameras;
  } catch (error) {
    notify('Список товаров не получен!');
    throw error;
  }
});

export const fetchCameraAction = createAsyncThunk<
Camera,
number,
ThunkConfig
>('fetchCameraAction', async (cameraId, {dispatch, extra: api}) => {
  try {
    const {data: camera} = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
    return camera;
  } catch (error){
    notify('Товар не получен!');
    throw error;
  }
});


export const fetchSimilarAction = createAsyncThunk<
Cameras,
number,
ThunkConfig
>('fetchSimilarAction', async (cameraId, {dispatch, extra: api}) => {
  try {
    const {data: camera} = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/similar`);
    return camera;
  } catch (error){
    notify('Список похожих товаров не получен!');
    throw error;
  }
});

export const fetchPromoAction = createAsyncThunk<
Promo,
undefined,
ThunkConfig
>('fetchPromoAction', async (_arg, {dispatch, extra: api}) => {
  try {
    const {data: promo} = await api.get<Promo>(APIRoute.Promo);
    return promo;
  } catch(error) {
    notify('Промо не получено!');
    throw error;
  }
});

export const fetchReviewsAction = createAsyncThunk<
Reviews,
number,
ThunkConfig
>('fetchReviewsAction', async (cameraId, {dispatch, extra: api}) => {
  try {
    const {data: reviews} = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/reviews`);
    return reviews;
  } catch (error){
    notify('Список похожих товаров не получен!');
    throw error;
  }
});

export const fetchPostReviewAction = createAsyncThunk<
ReviewResponse,
ReviewRequest,
ThunkConfig
>('fetchPostReviewAction', async ({cameraId,userName,advantage,disadvantage,review,rating},{dispatch, extra: api}) => {
  try {
    const {data} = await api.post<ReviewResponse>(APIRoute.Reviews, {cameraId,userName,advantage,disadvantage,review,rating});
    return data;
  } catch (error){
    notify('Отзыв не отправлен! Пожалуйста повторите.');
    throw error;
  }
});

export const fetchPostCouponAction = createAsyncThunk<
string,
CouponType,
ThunkConfig
>('fetchPostCouponAction', async ({coupon}, {dispatch, extra: api}) => {
  try {
    const {data} = await api.post<string>(APIRoute.Coupons, {coupon});
    return data;
  } catch (error){
    notify('Купон не получен!');
    throw error;
  }
});

export const fetchPostNewOrderAction = createAsyncThunk<
void,
Order,
ThunkConfig
>('fetchPostNewOrderAction', async ({camerasIds, coupon}, {dispatch, extra: api}) => {
  try {
    const {data} = await api.post<void>(APIRoute.Orders, {camerasIds, coupon});
    return data;
  } catch (error){
    notify('Заказ не создан! Повторите...');
    throw error;
  }
});
