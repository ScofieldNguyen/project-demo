import APIService from '@domain/services/APIService';
import { createMockAPIService, createRandomProject } from '@domain/testUtils';
import createStore from '@domain/features/store';
import Pagination from '@domain/entities/Pagination';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProjectListScreen from '@ui/screens/ProjectListScreen';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import parseNameToURL from '@ui/utils/parseNameToURL';

const apiService: APIService = createMockAPIService();
const store = createStore(apiService);

const firstLoad = [
  createRandomProject(),
  createRandomProject(),
  createRandomProject(),
  createRandomProject(),
  createRandomProject(),
];

const secondLoads = [
  createRandomProject(),
  createRandomProject(),
  createRandomProject(),
  createRandomProject(),
  createRandomProject(),
];

function renderComponent() {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProjectListScreen pageSize={5} />
      </Provider>
    </BrowserRouter>,
  );
}

describe('test project list screen', () => {
  beforeEach(() => {
    apiService.fetchProjects = jest
      .fn()
      .mockImplementation((pagination: Pagination) => {
        if (pagination.page === 1) {
          return Promise.resolve({ list: firstLoad, total: 10 });
        }
        if (pagination.page === 2) {
          return Promise.resolve({ list: secondLoads, total: 10 });
        }
        return [];
      });
  });

  test('should display first load on default', async () => {
    renderComponent();

    expect(await screen.findAllByTestId('row')).toHaveLength(firstLoad.length);

    // should display a link to create project page
    expect(
      screen.getByRole('link', { name: 'Create Project' }),
    ).toBeInTheDocument();

    // row should have link to detail page
    const rowLink = screen.getByRole('link', { name: firstLoad[0].name });
    expect(rowLink).toBeInTheDocument();
    expect(rowLink).toHaveAttribute(
      'href',
      `/projects/${parseNameToURL(firstLoad[0].name)}?id=${firstLoad[0].id}`,
    );

    // row should have a delete button
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(
      firstLoad.length,
    );
  });

  test('click on page 2, should load the second batch', async () => {
    renderComponent();

    expect(await screen.findAllByTestId('row')).toHaveLength(firstLoad.length);

    userEvent.click(screen.getByText('2'));

    // should display the item
    expect(await screen.findByText(secondLoads[0].name)).toBeInTheDocument();
  });

  test('click on page 2, and then click on page 1 should load the first batch', async () => {
    renderComponent();

    // wait for first batch
    expect(await screen.findAllByTestId('row')).toHaveLength(firstLoad.length);

    // click on page 2
    userEvent.click(screen.getByText('2'));

    // wait for second batch
    expect(await screen.findByText(secondLoads[0].name)).toBeInTheDocument();

    // click on page 1
    userEvent.click(screen.getByText('1'));

    // the first batch now should load
    expect(await screen.findByText(firstLoad[0].name)).toBeInTheDocument();
  });
});
