import { createAsyncThunk } from '@reduxjs/toolkit';
import ProjectDetail from '@domain/entities/ProjectDetail';
import ProjectForm from '@domain/entities/ProjectForm';
import APIService from '@domain/services/APIService';

export const editProject = createAsyncThunk<
  { id: number; detail: ProjectDetail },
  { form: ProjectForm; id: number },
  { extra: { apiService: APIService } }
>('projects/editProject', async ({ form, id }, { extra }) => {
  const apiService = extra.apiService;
  const response = await apiService.editProject(id, form);
  return {
    id,
    detail: response,
  };
});
