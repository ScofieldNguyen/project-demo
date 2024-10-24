import {
  createMockAPIService,
  createRandomProject,
  createRandomProjectDetail,
} from '@domain/testUtils';
import Exception from '@domain/entities/Exception';
import createStore from '@domain/features/store';
import {
  loadDetail,
  updateDetail,
} from '@domain/features/projectDetail/projectDetailSlice';
import { editProject } from '@domain/features/thunks/editProject';
import { loadProjects } from '@domain/features/projectList/projectListSlice';
import { fromProjectDetailToProjectForm } from '@domain/entities/ProjectForm';

const apiService = createMockAPIService();

describe('test edit project', () => {
  test('edit project failed', async () => {
    // given
    const productDetail = createRandomProjectDetail();
    const exception: Exception = {
      code: 0,
      message: 'Edit project failed',
    };
    apiService.editProject = jest.fn().mockRejectedValueOnce(exception);
    const store = createStore(apiService);
    store.dispatch(loadDetail(productDetail));

    // when
    const form = fromProjectDetailToProjectForm(productDetail);
    form.name = 'new name';
    form.domain = 'new domain';
    form.country = 'US';

    await store.dispatch(updateDetail(form));
    await store.dispatch(editProject({ id: productDetail.id, form }));

    // then
    const state = store.getState();

    // detail should be kept
    expect(state.projectDetail.detail).toStrictEqual(form);

    // display error message
    expect(state.projectDetail.error).toBe(exception.message);
  });

  test('edit project success', async () => {
    // given
    const projectDetail = createRandomProjectDetail();
    apiService.editProject = jest
      .fn()
      .mockImplementationOnce((id, detail) => Promise.resolve(detail));
    const store = createStore(apiService);

    // prepare data in the list
    store.dispatch(
      loadProjects([
        createRandomProject(),
        createRandomProject(),
        projectDetail,
        createRandomProject(),
        createRandomProject(),
      ]),
    );

    // prepare data in detail screen
    store.dispatch(loadDetail(projectDetail));

    // when
    const form = fromProjectDetailToProjectForm(projectDetail);
    form.name = 'new name';
    form.domain = 'new domain';
    form.country = 'US';

    // change form
    await store.dispatch(updateDetail(form));

    // call edit project thunk
    await store.dispatch(editProject({ id: projectDetail.id, form }));

    // then
    const state = store.getState();

    // detail should be kept
    expect(state.projectDetail.detail).toStrictEqual(form);

    // item outside in the list should also be updated
    const item = state.projectList.projects.find(
      (project) => project.id === projectDetail.id,
    );
    expect(item).toStrictEqual(form);
  });
});
