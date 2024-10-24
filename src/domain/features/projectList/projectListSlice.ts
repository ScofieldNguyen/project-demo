import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Project from '@domain/entities/Project';
import { fetchProjects } from '@domain/features/thunks/fetchProjects';
import { createProject } from '@domain/features/thunks/createProject';
import ProjectDetail from '@domain/entities/ProjectDetail';
import { editProject } from '@domain/features/thunks/editProject';
import { removeProject } from '@domain/features/thunks/removeProject';

import { RootState } from '@ui/StoreType';

export interface ProjectListSliceState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  total: number;
}

export function createInitialProjectListState(): ProjectListSliceState {
  return {
    projects: [],
    total: 0,
    loading: false,
    error: null,
  };
}

const initialState: ProjectListSliceState = createInitialProjectListState();

const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    addProject: (state, action: { payload: Project }) => {
      state.projects = [action.payload, ...state.projects];
    },
    updateProject: (
      state,
      action: PayloadAction<{
        id: number;
        updatedProject: Partial<Project>;
      }>,
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          ...action.payload.updatedProject,
        };
      }
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
    loadProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = [...state.projects, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    // fetch projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<{ list: Project[]; total: number }>) => {
        state.loading = false;
        state.projects = action.payload.list;
        state.total = action.payload.total;
        state.error = null;
      },
    );

    // create projects
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<ProjectDetail>) => {
        state.projects = [action.payload, ...state.projects];
      },
    );

    // edit projects
    builder.addCase(
      editProject.fulfilled,
      (state, action: PayloadAction<{ id: number; detail: ProjectDetail }>) => {
        const projectIndex = state.projects.findIndex(
          (project) => project.id === action.payload.id,
        );

        if (projectIndex !== -1) {
          state.projects[projectIndex] = {
            ...state.projects[projectIndex],
            ...action.payload.detail,
          };
        }
      },
    );

    // delete project
    builder.addCase(removeProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(
      removeProject.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload,
        );
      },
    );
  },
});

export const addProject = projectListSlice.actions.addProject;
export const updateProject = projectListSlice.actions.updateProject;
export const deleteProject = projectListSlice.actions.deleteProject;
export const loadProjects = projectListSlice.actions.loadProjects;

export const selectProjectListInfo = (state: RootState) => ({
  list: state.projectList.projects,
  loading: state.projectList.loading,
  error: state.projectList.error,
  total: state.projectList.total,
});

const projectListReducer = projectListSlice.reducer;
export default projectListReducer;
