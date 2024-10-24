import { createAsyncThunk } from '@reduxjs/toolkit';
import APIService from '@domain/services/APIService';

export const removeProject = createAsyncThunk<
  number,
  number,
  { extra: { apiService: APIService } }
>('projects/deleteProject', async (id, { extra }) => {
  const apiService = extra.apiService;
  return await apiService.deleteProject(id);
});
