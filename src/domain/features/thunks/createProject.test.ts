import {
  createMockAPIService,
  createRandomProject,
  createRandomProjectDetail,
} from '@domain/testUtils';
import Exception from '@domain/entities/Exception';
import createStore from '@domain/features/store';
import { createProject } from '@domain/features/thunks/createProject';
import {
  createProductDetailInitialState,
  updateDetail,
} from '@domain/features/projectDetail/projectDetailSlice';
import { loadProjects } from '@domain/features/projectList/projectListSlice';

const apiService = createMockAPIService();

describe('test create project', () => {
  test('create project failed', async () => {
    // given
    const form = createRandomProjectDetail();
    const exception: Exception = {
      code: 0,
      message: 'Create project failed',
    };
    apiService.createProject = jest.fn().mockRejectedValueOnce(exception);
    const store = createStore(apiService);

    // when
    store.dispatch(updateDetail({ name: 'name', description: 'description' }));
    await store.dispatch(createProject(form));

    // then
    const state = store.getState();

    // project list should be the same
    expect(state.projectList.projects).toHaveLength(0);

    // project detail should be the same
    expect(state.projectDetail.detail).toStrictEqual({
      name: 'name',
      from: null,
      to: null,
      budget: null,
      description: 'description',
      country: null,
      domain: null,
    });

    // has error
    expect(state.projectDetail.error).toBe(exception.message);
  });

  test('create project success', async () => {
    // given
    const form = createRandomProjectDetail();
    apiService.createProject = jest.fn().mockResolvedValueOnce(form);
    const store = createStore(apiService);
    const projectList = [
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
    ];

    // already have few projects
    store.dispatch(loadProjects(projectList));

    // when
    await store.dispatch(createProject(form));

    // then
    const state = store.getState();

    // project list should have 1 new projects
    expect(state.projectList.projects).toHaveLength(projectList.length + 1);

    // should be add on top
    expect(state.projectList.projects[0].id).toBe(form.id);

    // project detail should be cleared
    expect(state.projectDetail.detail).toStrictEqual(
      createProductDetailInitialState().detail,
    );

    // has no error
    expect(state.projectDetail.error).toBe(null);
  });
});
