import projectDetailSlice, {
  clearDetail,
  createProductDetailInitialState,
  loadDetail,
  ProductDetailSliceState,
  updateDetail,
} from '@domain/features/projectDetail/projectDetailSlice';
import { createRandomProjectDetail } from '@domain/testUtils';

describe('test product detail slice', () => {
  test('load project to detail', () => {
    // given
    const project = createRandomProjectDetail();
    const initialState: ProductDetailSliceState =
      createProductDetailInitialState();
    const expectedState: ProductDetailSliceState = {
      ...createProductDetailInitialState(),
      detail: project,
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
      detail: project,
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
      detail: project,
    };
    const expectedState: ProductDetailSliceState = {
      ...createProductDetailInitialState(),
      detail: {
        ...project,
        name: 'new name',
        description: 'new description',
        from: new Date(1996, 8, 1).getTime(),
        to: new Date(2024, 10, 23).getTime(),
        budget: 1000000,
      },
    };

    // when
    const actual = projectDetailSlice(
      initialState,
      updateDetail({
        name: 'new name',
        description: 'new description',
        from: new Date(1996, 8, 1).getTime(),
        to: new Date(2024, 10, 23).getTime(),
        budget: 1000000,
      }),
    );

    // then
    expect(actual).toStrictEqual(expectedState);
  });
});
