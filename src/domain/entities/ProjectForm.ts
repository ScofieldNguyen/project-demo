import dayjs, { Dayjs } from 'dayjs';
import ProjectDetail from '@domain/entities/ProjectDetail';

export default interface ProjectForm {
  id?: number;
  name: string | null;
  description: string | null;
  from: Dayjs | null;
  to: Dayjs | null;
  budget: number | null;
  country: string | null;
  domain: string | null;
}

export function fromProjectDetailToProjectForm(
  projectDetail: ProjectDetail,
): ProjectForm {
  return {
    ...projectDetail,
    from: dayjs(projectDetail.from),
    to: dayjs(projectDetail.to),
  };
}
