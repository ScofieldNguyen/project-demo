import {
  createMockAPIService,
  createRandomProject,
  createRandomProjectDetail,
} from '@domain/testUtils';
import Exception from '@domain/entities/Exception';
import createStore from '@domain/features/store';
import { removeProject } from '@domain/features/thunks/removeProject';
import { loadProjects } from '@domain/features/projectList/projectListSlice';
import {
  createProductDetailInitialState,
  loadDetail,
} from '@domain/features/projectDetail/projectDetailSlice';

const apiService = createMockAPIService();

describe('test delete project', () => {
  test('deletes project failed', async () => {
    // given
    const exception: Exception = {
      code: 0,
      message: 'Delete failed',
    };
    apiService.deleteProject = jest.fn().mockRejectedValueOnce(exception);
    const store = createStore(apiService);
    const projects = [createRandomProject(), createRandomProject()];

    // already have 2 projects
    store.dispatch(loadProjects(projects));

    // when
    await store.dispatch(removeProject(projects[0].id));

    // then
    const state = store.getState();

    // state still have 2 projects
    expect(state.projectList.projects).toHaveLength(projects.length);

    // have error
    expect(state.projectList.loading).toBe(false);
    expect(state.projectList.error).toStrictEqual(exception.message);
  });

  test('deletes project success', async () => {
    // given
    const store = createStore(apiService);
    const projects = [createRandomProject(), createRandomProject()];
    apiService.deleteProject = jest
      .fn()
      .mockImplementationOnce((id) => Promise.resolve(id));

    // already have 2 projects
    store.dispatch(loadProjects(projects));

    // when
    await store.dispatch(removeProject(projects[0].id));

    // then
    const state = store.getState();

    // state have only 1 project
    expect(state.projectList.projects).toHaveLength(projects.length - 1);

    // have error
    expect(state.projectList.loading).toBe(false);
    expect(state.projectList.error).toStrictEqual(null);
  });

  test('delete project success - detail has the same project', async () => {
    // given
    apiService.deleteProject = jest
      .fn()
      .mockImplementationOnce((id) => Promise.resolve(id));
    const store = createStore(apiService);

    // already have 2 projects
    const projects = [createRandomProjectDetail(), createRandomProjectDetail()];
    store.dispatch(loadProjects(projects));

    // and detail has the first project
    store.dispatch(loadDetail(projects[0]));

    // when
    await store.dispatch(removeProject(projects[0].id));

    // then
    const state = store.getState();

    // the list have only 1 project
    expect(state.projectList.projects).toHaveLength(projects.length - 1);

    // detail now be cleared
    expect(state.projectDetail.detail).toStrictEqual(
      createProductDetailInitialState().detail,
    );
  });
});
