import projectListSlice from '@domain/features/projectList/projectListSlice';
import projectListReducer, {
  addProject,
  deleteProject,
  loadProjects,
  ProjectListSliceState,
  updateProject,
} from '@domain/features/projectList/projectListSlice';
import Project from '@domain/entities/Project';

function getRandomInt(max = 1000) {
  return Math.floor(Math.random() * max);
}

function getRandomDate(start: Date, end: Date) {
  const startTimestamp = start.getTime();
  const endTimestamp = end.getTime();
  const randomTimestamp =
    Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return new Date(randomTimestamp);
}

function createRandomProject(): Project {
  const seed = getRandomInt();
  return {
    id: seed,
    name: 'name-' + seed,
    description: 'description-' + seed,
    from: getRandomDate(new Date(2020, 0, 1), new Date(2021, 0, 1)),
    to: getRandomDate(new Date(2020, 0, 1), new Date(2021, 0, 1)),
    budget: seed * 1000,
  };
}

describe('test project list reducers', () => {
  test('add new project - empty list', () => {
    // given
    const newProject: Project = createRandomProject();
    const initialState: ProjectListSliceState = {
      projects: [],
    };
    const expectedState: ProjectListSliceState = {
      projects: [newProject],
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
    };
    const expectedState: ProjectListSliceState = {
      projects: [newProject, existingProject],
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
    };
    const expectedState: ProjectListSliceState = {
      projects: [project],
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
      from: new Date(1996, 8, 1),
      to: new Date(2024, 10, 23),
      budget: 1000000,
    };
    const initialState: ProjectListSliceState = {
      projects: [project],
    };
    const expectedState: ProjectListSliceState = {
      projects: [updatedProject],
    };

    // when
    const actual = projectListReducer(
      initialState,
      updateProject({
        id: project.id,
        updatedProject: {
          name: 'new name',
          description: 'new description',
          from: new Date(1996, 8, 1),
          to: new Date(2024, 10, 23),
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
    };
    const expectedState: ProjectListSliceState = {
      projects: [],
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
    };
    const expectedState: ProjectListSliceState = {
      projects: [],
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
    };
    const expectedState: ProjectListSliceState = {
      projects: list,
    };

    // when
    const actual = projectListReducer(initialState, loadProjects(list));

    // then
    expect(actual).toStrictEqual(expectedState);
  });
});
