import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ProjectForm, {
  fromProjectDetailToProjectForm,
} from '@domain/entities/ProjectForm';
import ProjectDetail from '@domain/entities/ProjectDetail';
import { createProject } from '@domain/features/thunks/createProject';
import { editProject } from '@domain/features/thunks/editProject';
import { removeProject } from '@domain/features/thunks/removeProject';
import { fetchProject } from '@domain/features/thunks/fetchProject';
import { RootState } from '@ui/StoreType';

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
      state.detail = fromProjectDetailToProjectForm(action.payload);
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

    // remove project
    builder.addCase(
      removeProject.fulfilled,
      (state, action: PayloadAction<number>) => {
        if (state.detail.id === action.payload) {
          state.detail = createProductDetailInitialState().detail;
        }
      },
    );

    // fetch project detail
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(fetchProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProject.fulfilled,
      (state, action: PayloadAction<ProjectDetail>) => {
        state.loading = false;
        state.detail = fromProjectDetailToProjectForm(action.payload);
      },
    );
  },
});

export const loadDetail = projectDetailSlice.actions.loadDetail;
export const clearDetail = projectDetailSlice.actions.clearDetail;
export const updateDetail = projectDetailSlice.actions.updateDetail;

export const selectDetail = (state: RootState) => state.projectDetail;

const projectDetailReducer = projectDetailSlice.reducer;
export default projectDetailReducer;
