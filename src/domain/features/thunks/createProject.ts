import { createAsyncThunk } from '@reduxjs/toolkit';
import ProjectForm from '@domain/entities/ProjectForm';
import ProjectDetail from '@domain/entities/ProjectDetail';
import APIService from '@domain/services/APIService';

export const createProject = createAsyncThunk<
  ProjectDetail,
  ProjectForm,
  { extra: { apiService: APIService } }
>('projects/createProject', async (form: ProjectForm, { extra }) => {
  const apiService = extra.apiService;
  return await apiService.createProject(form);
});
