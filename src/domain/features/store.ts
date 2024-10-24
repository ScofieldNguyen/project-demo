import { configureStore } from '@reduxjs/toolkit';
import projectListReducer from '@domain/features/projectList/projectListSlice';
import projectDetailSlice from '@domain/features/projectDetail/projectDetailSlice';
import APIService from '@domain/services/APIService';

export default function createStore(apiService: APIService) {
  return configureStore({
    reducer: {
      projectList: projectListReducer,
      projectDetail: projectDetailSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { apiService },
        },
      }),
  });
}
