import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Project from '@domain/entities/Project';
import { fetchProjects } from '@domain/features/projectList/thunks/fetchProjects';
import { createProject } from '@domain/features/projectDetail/thunks/createProject';
import ProjectDetail from '@domain/entities/ProjectDetail';
import { editProject } from '@domain/features/projectDetail/thunks/editProject';

export interface ProjectListSliceState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectListSliceState = {
  projects: [],
  loading: false,
  error: null,
};

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
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      },
    );
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<ProjectDetail>) => {
        state.projects = [action.payload, ...state.projects];
      },
    );
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
  },
});

export const addProject = projectListSlice.actions.addProject;
export const updateProject = projectListSlice.actions.updateProject;
export const deleteProject = projectListSlice.actions.deleteProject;
export const loadProjects = projectListSlice.actions.loadProjects;

const projectListReducer = projectListSlice.reducer;
export default projectListReducer;
