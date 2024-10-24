import { createSlice } from '@reduxjs/toolkit';
import ProjectForm from '@domain/entities/ProjectForm';
import ProjectDetail from '@domain/entities/ProjectDetail';
import { createProject } from '@domain/features/thunks/createProject';
import { editProject } from '@domain/features/thunks/editProject';

export interface ProductDetailSliceState {
  detail: ProjectForm;
  error: string | null;
  loading: boolean;
}

export function createProductDetailInitialState(): ProductDetailSliceState {
  return {
    detail: {
      name: null,
      from: null,
      to: null,
      budget: null,
      description: null,
      country: null,
      domain: null,
    },
    error: null,
    loading: false,
  };
}

const initialState: ProductDetailSliceState = createProductDetailInitialState();

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
  extraReducers: (builder) => {
    // Create Project
    builder.addCase(createProject.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.detail = initialState.detail;
      state.loading = false;
    });

    // Edit Project
    builder.addCase(editProject.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
    builder.addCase(editProject.pending, (state) => {
      state.loading = true;
    });
  },
});

export const loadDetail = projectDetailSlice.actions.loadDetail;
export const clearDetail = projectDetailSlice.actions.clearDetail;
export const updateDetail = projectDetailSlice.actions.updateDetail;

const projectDetailReducer = projectDetailSlice.reducer;
export default projectDetailReducer;
