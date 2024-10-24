import APIService from '@domain/services/APIService';
import { createMockAPIService, createRandomProject } from '@domain/testUtils';
import createStore from '@domain/features/store';
import { loadProjects } from '@domain/features/projectList/projectListSlice';
import { fetchProject } from '@domain/features/thunks/fetchProject';
import Exception from '@domain/entities/Exception';
import {
  createProductDetailInitialState,
  loadDetail,
} from '@domain/features/projectDetail/projectDetailSlice';
import ProjectDetail from '@domain/entities/ProjectDetail';

const apiService: APIService = createMockAPIService();

describe('test fetch projects', () => {
  test('fetch project failed', async () => {
    // given
    const exception: Exception = {
      code: 0,
      message: 'Cannot fetch this project',
    };
    apiService.fetchDetailProject = jest.fn().mockRejectedValueOnce(exception);
    const projects = [createRandomProject(), createRandomProject()];
    const store = createStore(apiService);
    store.dispatch(loadProjects(projects));

    // when
    await store.dispatch(fetchProject(projects[0].id));

    // then
    const state = store.getState();
    expect(state.projectDetail.detail).toStrictEqual(
      createProductDetailInitialState().detail,
    );
    expect(state.projectDetail.error).toBe(exception.message);
  });

  test('fetch project success - when empty detail', async () => {
    // given
    const projects = [createRandomProject(), createRandomProject()];
    const projectDetail: ProjectDetail = {
      ...projects[0],
      country: 'VN',
      domain: 'Payment',
    };
    apiService.fetchDetailProject = jest
      .fn()
      .mockResolvedValueOnce(projectDetail);
    const store = createStore(apiService);
    store.dispatch(loadProjects(projects));

    // when
    await store.dispatch(fetchProject(projects[0].id));

    // then
    const state = store.getState();
    expect(state.projectDetail.detail).toStrictEqual(projectDetail);
    expect(state.projectDetail.error).toBe(null);
    expect(state.projectDetail.loading).toBe(false);
  });

  test('fetch project but there is already that project in detail', async () => {
    // given
    const projects = [createRandomProject(), createRandomProject()];
    const projectDetail: ProjectDetail = {
      ...projects[0],
      country: 'VN',
      domain: 'Payment',
    };
    apiService.fetchDetailProject = jest.fn();
    const store = createStore(apiService);

    store.dispatch(loadProjects(projects));

    // detail already has that project
    store.dispatch(loadDetail(projectDetail));

    // when
    await store.dispatch(fetchProject(projects[0].id));

    // then it should works
    const state = store.getState();
    expect(state.projectDetail.detail).toStrictEqual(projectDetail);
    expect(state.projectDetail.error).toBe(null);
    expect(state.projectDetail.loading).toBe(false);

    // but there is no API call
    expect(apiService.fetchDetailProject).not.toBeCalled();
  });
});
