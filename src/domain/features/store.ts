import { configureStore } from '@reduxjs/toolkit';
import projectListReducer from '@domain/features/projectList/projectListSlice';

export const store = configureStore({
  reducer: {
    project: projectListReducer,
  },
});
