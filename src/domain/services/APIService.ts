import Pagination from '@domain/entities/Pagination';
import Project from '@domain/entities/Project';

export default interface APIService {
  fetchProjects: (pagination: Pagination) => Promise<Project[]>;
}
