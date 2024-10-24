import ProjectDetail, {
  fromProjectFormToProjectDetail,
} from '@domain/entities/ProjectDetail';
import ProjectForm, {
  fromProjectDetailToProjectForm,
} from '@domain/entities/ProjectForm';
import dayjs from 'dayjs';

describe('Test all kind of convertions between entities', () => {
  test('ProjectDetail => ProjectForm', () => {
    // given
    const projectDetail: ProjectDetail = {
      id: 1,
      name: 'name',
      description: 'description',
      from: Date.now(),
      to: Date.now(),
      budget: 1000000,
      domain: 'Payment',
      country: 'VN',
    };

    const projectForm: ProjectForm = {
      id: 1,
      name: 'name',
      description: 'description',
      from: dayjs(projectDetail.from),
      to: dayjs(projectDetail.to),
      budget: 1000000,
      domain: 'Payment',
      country: 'VN',
    };

    expect(fromProjectDetailToProjectForm(projectDetail)).toEqual(projectForm);
  });

  test('ProjectForm => ProjectDetail', () => {
    // given
    const projectDetail: ProjectDetail = {
      id: 1,
      name: 'name',
      description: 'description',
      from: Date.now(),
      to: Date.now(),
      budget: 1000000,
      domain: 'Payment',
      country: 'VN',
    };

    const projectForm: ProjectForm = {
      name: 'name',
      description: 'description',
      from: dayjs(projectDetail.from),
      to: dayjs(projectDetail.to),
      budget: 1000000,
      domain: 'Payment',
      country: 'VN',
    };

    expect(fromProjectFormToProjectDetail(1, projectForm)).toEqual(
      projectDetail,
    );
  });
});
