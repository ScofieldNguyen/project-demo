import projectListSlice from '@domain/features/projectList/projectListSlice';
import projectListReducer, {
  addProject,
  deleteProject,
  loadProjects,
  ProjectListSliceState,
  updateProject,
} from '@domain/features/projectList/projectListSlice';
import Project from '@domain/entities/Project';
import { createRandomProject } from '@domain/testUtils';

describe('test project list reducers', () => {
  test('add new project - empty list', () => {
    // given
    const newProject: Project = createRandomProject();
    const initialState: ProjectListSliceState = {
      projects: [],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: [newProject],
      loading: false,
      error: null,
    };

    // when
    const actual = projectListSlice(initialState, addProject(newProject));

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('add new project - non-empty list - should appear on top of the list', () => {
    // given
    const newProject: Project = createRandomProject();
    const existingProject: Project = createRandomProject();
    const initialState: ProjectListSliceState = {
      projects: [existingProject],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: [newProject, existingProject],
      loading: false,
      error: null,
    };

    // when
    const actual = projectListSlice(initialState, addProject(newProject));

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('edit project - not found', () => {
    // given
    const project: Project = createRandomProject();
    const initialState: ProjectListSliceState = {
      projects: [project],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: [project],
      loading: false,
      error: null,
    };

    // when
    const actual = projectListReducer(
      initialState,
      updateProject({
        id: project.id + 1,
        updatedProject: { name: 'new name' },
      }),
    );

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('edit project success', () => {
    // given
    const project: Project = createRandomProject();
    const updatedProject: Project = {
      ...project,
      name: 'new name',
      description: 'new description',
      from: new Date(1996, 8, 1).getTime(),
      to: new Date(2024, 10, 23).getTime(),
      budget: 1000000,
    };
    const initialState: ProjectListSliceState = {
      projects: [project],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: [updatedProject],
      loading: false,
      error: null,
    };

    // when
    const actual = projectListReducer(
      initialState,
      updateProject({
        id: project.id,
        updatedProject: {
          name: 'new name',
          description: 'new description',
          from: new Date(1996, 8, 1).getTime(),
          to: new Date(2024, 10, 23).getTime(),
          budget: 1000000,
        },
      }),
    );

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('delete project - not found', () => {
    // given
    const initialState: ProjectListSliceState = {
      projects: [],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: [],
      loading: false,
      error: null,
    };

    // when
    const actual = projectListReducer(initialState, deleteProject(1));

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('delete project - success', () => {
    // given
    const project: Project = createRandomProject();
    const initialState: ProjectListSliceState = {
      projects: [project],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: [],
      loading: false,
      error: null,
    };

    // when
    const actual = projectListReducer(initialState, deleteProject(project.id));

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('load multiple projects at once', () => {
    // given
    const list = [
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
      createRandomProject(),
    ];
    const initialState: ProjectListSliceState = {
      projects: [],
      loading: false,
      error: null,
    };
    const expectedState: ProjectListSliceState = {
      projects: list,
      loading: false,
      error: null,
    };

    // when
    const actual = projectListReducer(initialState, loadProjects(list));

    // then
    expect(actual).toStrictEqual(expectedState);
  });
});
