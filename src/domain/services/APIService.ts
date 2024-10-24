import Pagination from '@domain/entities/Pagination';
import Project from '@domain/entities/Project';
import ProjectForm from '@domain/entities/ProjectForm';
import ProjectDetail from '@domain/entities/ProjectDetail';

export default interface APIService {
  fetchProjects: (pagination: Pagination) => Promise<Project[]>;
  createProject: (form: ProjectForm) => Promise<ProjectDetail>;
  editProject: (id: number, form: ProjectForm) => Promise<ProjectDetail>;
  deleteProject: (id: number) => Promise<number>;
  fetchDetailProject: (id: number) => Promise<ProjectDetail>;
}
