import projectDetailSlice, {
  clearDetail,
  createProductDetailInitialState,
  loadDetail,
  ProductDetailSliceState,
  updateDetail,
} from '@domain/features/projectDetail/projectDetailSlice';
import { createRandomProjectDetail } from '@domain/testUtils';
import { fromProjectDetailToProjectForm } from '@domain/entities/ProjectForm';
import dayjs from 'dayjs';

describe('test product detail slice', () => {
  test('load project to detail', () => {
    // given
    const project = createRandomProjectDetail();
    const initialState: ProductDetailSliceState =
      createProductDetailInitialState();
    const expectedState: ProductDetailSliceState = {
      ...createProductDetailInitialState(),
      detail: fromProjectDetailToProjectForm(project),
    };

    // when
    const actual = projectDetailSlice(initialState, loadDetail(project));

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('clear detail', () => {
    // given
    const project = createRandomProjectDetail();
    const initialState: ProductDetailSliceState = {
      ...createProductDetailInitialState(),
      detail: fromProjectDetailToProjectForm(project),
    };
    const expectedState: ProductDetailSliceState =
      createProductDetailInitialState();

    // when
    const actual = projectDetailSlice(initialState, clearDetail());

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('update detail', () => {
    // given
    const project = createRandomProjectDetail();
    const initialState: ProductDetailSliceState = {
      ...createProductDetailInitialState(),
      detail: fromProjectDetailToProjectForm(project),
    };
    const expectedState: ProductDetailSliceState = {
      ...createProductDetailInitialState(),
      detail: {
        ...project,
        name: 'new name',
        description: 'new description',
        from: dayjs(new Date(1996, 8, 1)),
        to: dayjs(new Date(2024, 10, 23)),
        budget: 1000000,
      },
    };

    // when
    const actual = projectDetailSlice(
      initialState,
      updateDetail({
        name: 'new name',
        description: 'new description',
        from: dayjs(new Date(1996, 8, 1)),
        to: dayjs(new Date(2024, 10, 23)),
        budget: 1000000,
      }),
    );

    // then
    expect(actual).toStrictEqual(expectedState);
  });
});
