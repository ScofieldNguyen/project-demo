import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import APIService from '@domain/services/APIService';
import {
  createMockAPIService,
  createRandomProjectDetail,
} from '@domain/testUtils';
import createStore from '@domain/features/store';
import { ProjectDetailScreen } from '@ui/screens/ProjectDetailScreen';
import userEvent from '@testing-library/user-event';
import { fromProjectDetailToProjectForm } from '@domain/entities/ProjectForm';

const apiService: APIService = createMockAPIService();
const projectDetail = createRandomProjectDetail();

function renderComponent(id?: number) {
  const store = createStore(apiService);
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProjectDetailScreen id={id} />
      </Provider>
    </BrowserRouter>,
  );
}

describe('Test Project Detail Screen', () => {
  describe('test update mode', () => {
    beforeEach(() => {
      apiService.fetchDetailProject = jest
        .fn()
        .mockResolvedValue(projectDetail);
    });
    test('should render update mode when specify id', async () => {
      renderComponent(projectDetail.id);

      // wait for the API calling
      await waitFor(() =>
        expect(apiService.fetchDetailProject).toHaveBeenCalled(),
      );

      // there should be edit button
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    });

    test('display error when submit empty data', async () => {
      renderComponent(projectDetail.id);

      // wait for the API calling
      await waitFor(() =>
        expect(apiService.fetchDetailProject).toHaveBeenCalled(),
      );
      // press edit button
      userEvent.click(screen.getByRole('button', { name: 'Edit' }));

      // clear name field
      userEvent.clear(screen.getByLabelText('Name'));

      // clear description field
      userEvent.clear(screen.getByLabelText('Description'));

      // clear budget field
      userEvent.clear(screen.getByLabelText('Budget'));

      // clear country field
      userEvent.clear(screen.getByLabelText('Country'));

      // clear domain field
      userEvent.clear(screen.getByLabelText('Domain'));

      // submit
      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      // should display error message
      expect(await screen.findByText('Name is required')).toBeInTheDocument();
      expect(
        await screen.findByText('Description is required'),
      ).toBeInTheDocument();
      expect(await screen.findByText('Budget is required')).toBeInTheDocument();
      expect(
        await screen.findByText('Country is required'),
      ).toBeInTheDocument();
      expect(await screen.findByText('Domain is required')).toBeInTheDocument();
    });

    test('Change name and submit data', async () => {
      apiService.editProject = jest.fn().mockResolvedValue({
        detail: projectDetail,
      });
      renderComponent(projectDetail.id);

      // wait for the API calling
      await waitFor(() =>
        expect(apiService.fetchDetailProject).toHaveBeenCalled(),
      );
      // press edit button
      userEvent.click(screen.getByRole('button', { name: 'Edit' }));

      // change name
      userEvent.type(screen.getByLabelText('Name'), 'new');

      // submit
      userEvent.click(screen.getByRole('button', { name: 'Save' }));

      // should call update project API
      await waitFor(() =>
        expect(apiService.editProject).toHaveBeenCalledWith(projectDetail.id, {
          ...fromProjectDetailToProjectForm(projectDetail),
          name: projectDetail.name + 'new',
        }),
      );
    });
  });

  describe('test create mode', () => {
    beforeEach(() => {
      apiService.fetchDetailProject = jest
        .fn()
        .mockResolvedValue(projectDetail);
    });
    test('should render create mode when not specify id', async () => {
      renderComponent();

      // there should be create button
      expect(
        screen.getByRole('button', { name: 'Create' }),
      ).toBeInTheDocument();
    });
  });
});
