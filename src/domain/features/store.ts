import { configureStore } from '@reduxjs/toolkit';
import projectListReducer from '@domain/features/projectList/projectListSlice';
import projectDetailSlice from '@domain/features/projectDetail/projectDetailSlice';

export const store = configureStore({
  reducer: {
    projectList: projectListReducer,
    projectDetail: projectDetailSlice,
  },
});
