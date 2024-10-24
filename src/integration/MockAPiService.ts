import APIService from '@domain/services/APIService';
import Pagination from '@domain/entities/Pagination';
import { fromProjectFormToProjectDetail } from '@domain/entities/ProjectDetail';
import { MockData } from '@integration/MockData';

function waitForSeconds(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000); // Convert seconds to milliseconds
  });
}

const database = {
  projects: MockData,
  projectDetails: MockData,
};

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

    database.projectDetails = database.projectDetails.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...fromProjectFormToProjectDetail(id, form),
        };
      } else {
        return p;
      }
    });

    database.projects = database.projects.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...fromProjectFormToProjectDetail(id, form),
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
    database.projects.push(
      fromProjectFormToProjectDetail(database.projects.length, form),
    );

    const item = fromProjectFormToProjectDetail(
      database.projectDetails.length,
      form,
    );
    database.projectDetails.push(item);
    return item;
  },
  deleteProject: async (id: number) => {
    database.projectDetails = database.projectDetails.filter(
      (p) => p.id !== id,
    );
    database.projects = database.projects.filter((p) => p.id !== id);
    return id;
  },
};
