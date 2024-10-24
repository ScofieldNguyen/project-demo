import Project from '@domain/entities/Project';
import ProjectForm from '@domain/entities/ProjectForm';

export default interface ProjectDetail extends Project {
  country: string;
  domain: string;
}

export function fromProjectFormToProjectDetail(
  id: number,
  form: ProjectForm,
): ProjectDetail {
  return {
    id,
    name: form.name || '',
    description: form.description || '',
    budget: form.budget || 0,
    domain: form.domain || '',
    country: form.country || '',
    from: form.from ? form.from.valueOf() : 0,
    to: form.to ? form.to.valueOf() : 0,
  };
}
