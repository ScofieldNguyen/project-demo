import { createSlice } from '@reduxjs/toolkit';
import ProjectForm from '@domain/entities/ProjectForm';
import ProjectDetail from '@domain/entities/ProjectDetail';

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
    country: null,
    domain: null,
  },
};

const projectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    loadDetail: (state, action: { payload: ProjectDetail }) => {
      state.detail = action.payload;
    },
    clearDetail: (state) => {
      state.detail = initialState.detail;
    },
    updateDetail: (state, action: { payload: Partial<ProjectForm> }) => {
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
