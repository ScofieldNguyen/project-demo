import APIService from '@domain/services/APIService';
import Pagination from '@domain/entities/Pagination';
import { createRandomProject } from '@domain/testUtils';
import ProjectDetail from '@domain/entities/ProjectDetail';
import Project from '@domain/entities/Project';

function waitForSeconds(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000); // Convert seconds to milliseconds
  });
}

const database: {
  projects: Project[];
  projectDetails: ProjectDetail[];
} = (() => {
  const projects: Project[] = [];
  const projectDetails: ProjectDetail[] = [];

  for (let i = 0; i <= 99; i++) {
    const project = createRandomProject();
    projects.push(project);
    projectDetails.push({ ...project, country: 'VN', domain: 'Payment' });
  }

  return {
    projects,
    projectDetails,
  };
})();

function getItemsByPage(items: any[], pageNumber: number) {
  const itemsPerPage = 10;

  // Calculate the starting index
  const startIndex = (pageNumber - 1) * itemsPerPage;

  // Check if the page number is valid
  if (pageNumber < 1 || pageNumber > 10) {
    return []; // Return an empty array for invalid page numbers
  }

  // Use slice to get the items for the specified page
  return items.slice(startIndex, startIndex + itemsPerPage);
}

export const mockAPiService: APIService = {
  fetchProjects: async (pagination: Pagination) => {
    await waitForSeconds(1);
    return getItemsByPage(database.projects, pagination.page);
  },
  fetchDetailProject: async (id: number) => {
    await waitForSeconds(1);
    const project = database.projectDetails.find((p) => p.id === id);
    if (!project) {
      throw new Error('No project with id ' + id);
    }

    return project;
  },
  editProject: async (id: number, form) => {
    await waitForSeconds(1);

    database.projectDetails.filter((p) => {
      if (p.id === id) {
        return {
          ...p,
          form,
        };
      } else {
        return p;
      }
    });

    database.projects.filter((p) => {
      if (p.id === id) {
        return {
          ...p,
          form,
        };
      } else {
        return p;
      }
    });

    const project = database.projectDetails.find((p) => p.id === id);
    if (!project) {
      throw new Error('No project with id ' + id);
    }

    return project;
  },
  createProject: async (form) => {
    await waitForSeconds(1);
    database.projects.push({
      id: database.projects.length,
      name: form.name || '',
      budget: form.budget || 0,
      from: form.from ? form.from.millisecond() : 0,
      to: form.to ? form.to.millisecond() : 0,
      description: form.description || '',
    });

    const item = {
      id: database.projectDetails.length,
      name: form.name || '',
      budget: form.budget || 0,
      from: form.from ? form.from.millisecond() : 0,
      to: form.to ? form.to.millisecond() : 0,
      description: form.description || '',
      domain: form.domain || '',
      country: form.country || '',
    };
    database.projectDetails.push(item);
    return item;
  },
  deleteProject: async (id: number) => {
    database.projectDetails.filter((p) => p.id !== id);
    database.projects.filter((p) => p.id !== id);
    return id;
  },
};
