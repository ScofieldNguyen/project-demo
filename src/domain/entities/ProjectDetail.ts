import Project from '@domain/entities/Project';

export default interface ProjectDetail extends Project {
  country: string;
  domain: string;
}
