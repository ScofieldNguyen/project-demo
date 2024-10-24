import Project from '@domain/entities/Project';
import { createSlice } from '@reduxjs/toolkit';
import ProjectForm from '@domain/entities/ProjectForm';

export interface ProductDetailSliceState {
  detail: ProjectForm;
}

const initialState: ProductDetailSliceState = {
  detail: {
    name: null,
    from: null,
    to: null,
    budget: null,
    description: null,
  },
};

const projectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    loadDetail: (state, action: { payload: Project }) => {
      state.detail = action.payload;
    },
    clearDetail: (state) => {
      state.detail = initialState.detail;
    },
    updateDetail: (state, action: { payload: Partial<Project> }) => {
      state.detail = {
        ...state.detail,
        ...action.payload,
      };
    },
  },
});

export const loadDetail = projectDetailSlice.actions.loadDetail;
export const clearDetail = projectDetailSlice.actions.clearDetail;
export const updateDetail = projectDetailSlice.actions.updateDetail;

const projectDetailReducer = projectDetailSlice.reducer;
export default projectDetailReducer;
