import { createSlice } from '@reduxjs/toolkit';
import Project from '@domain/entities/Project';

export interface ProjectListSliceState {
  projects: Project[];
}

const initialState: ProjectListSliceState = {
  projects: [],
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
      action: { payload: { id: number; updatedProject: Partial<Project> } },
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
    deleteProject: (state, action: { payload: number }) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
    },
    loadProjects: (state, action: { payload: Project[] }) => {
      state.projects = [...state.projects, ...action.payload];
    },
  },
});

export const addProject = projectListSlice.actions.addProject;
export const updateProject = projectListSlice.actions.updateProject;
export const deleteProject = projectListSlice.actions.deleteProject;
export const loadProjects = projectListSlice.actions.loadProjects;

const projectListReducer = projectListSlice.reducer;
export default projectListReducer;
