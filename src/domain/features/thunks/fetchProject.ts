import { createAsyncThunk } from '@reduxjs/toolkit';
import ProjectDetail from '@domain/entities/ProjectDetail';
import APIService from '@domain/services/APIService';

export const fetchProject = createAsyncThunk<
  ProjectDetail,
  number,
  { extra: { apiService: APIService } }
>('projects/fetchProject', async (id, thunkAPI) => {
  const apiService = thunkAPI.extra.apiService;
  const state: any = thunkAPI.getState();
  if (state.projectDetail?.detail?.id === id) {
    return Promise.resolve(state.projectDetail.detail);
  }
  return await apiService.fetchDetailProject(id);
});
