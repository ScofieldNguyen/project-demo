import { createMockAPIService, createRandomProject } from '@domain/testUtils';
import createStore from '@domain/features/store';
import { fetchProjects } from '@domain/features/thunks/fetchProjects';
import Exception from '@domain/entities/Exception';

const apiService = createMockAPIService();

describe('test fetch projects thunk', () => {
  test('fetch projects failed', async () => {
    // given
    const exception: Exception = {
      code: 404,
      message: 'Not Found',
    };
    apiService.fetchProjects = jest.fn().mockRejectedValueOnce(exception);
    const store = createStore(apiService);

    // when
    await store.dispatch(fetchProjects({ page: 1, itemsPerPage: 10 }));

    // then
    const state = store.getState();
    expect(state.projectList.projects).toHaveLength(0);
    expect(state.projectList.loading).toBe(false);
    expect(state.projectList.error).toStrictEqual(exception.message);
  });

  test('fetch projects success', async () => {
    // given
    const projects = [
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
    ];
    apiService.fetchProjects = jest.fn().mockResolvedValueOnce(projects);
    const store = createStore(apiService);

    // when
    await store.dispatch(fetchProjects({ page: 1, itemsPerPage: 10 }));

    // then
    const state = store.getState();
    expect(state.projectList.projects).toStrictEqual(projects);
    expect(state.projectList.loading).toBe(false);
    expect(state.projectList.error).toStrictEqual(null);
  });

  test('fetch failed then fetch success - error should be removed', async () => {
    // given
    const projects = [
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
    ];
    const exception: Exception = {
      code: 404,
      message: 'Not Found',
    };
    apiService.fetchProjects = jest
      .fn()
      .mockRejectedValueOnce(exception)
      .mockResolvedValueOnce(projects);
    const store = createStore(apiService);

    // when
    await store.dispatch(fetchProjects({ page: 1, itemsPerPage: 10 }));
    await store.dispatch(fetchProjects({ page: 1, itemsPerPage: 10 }));

    // then
    const state = store.getState();
    expect(state.projectList.projects).toStrictEqual(projects);
    expect(state.projectList.loading).toBe(false);
    expect(state.projectList.error).toStrictEqual(null);
  });
});
