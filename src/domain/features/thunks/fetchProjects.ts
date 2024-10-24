import { createAsyncThunk } from '@reduxjs/toolkit';
import Project from '@domain/entities/Project';
import Pagination from '@domain/entities/Pagination';
import APIService from '@domain/services/APIService';

export const fetchProjects = createAsyncThunk<
  Project[],
  Pagination,
  { extra: { apiService: APIService } }
>('projects/fetchProjects', async (pagination, { extra }) => {
  const apiService = extra.apiService;
  return await apiService.fetchProjects(pagination);
});
