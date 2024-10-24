import projectDetailSlice, {
  clearDetail,
  loadDetail,
  ProductDetailSliceState,
  updateDetail,
} from '@domain/features/projectDetail/projectDetailSlice';
import { createRandomProject } from '@domain/testUtils';

describe('test product detail slice', () => {
  test('load project to detail', () => {
    // given
    const project = createRandomProject();
    const initialState: ProductDetailSliceState = {
      detail: {
        name: null,
        from: null,
        to: null,
        budget: null,
        description: null,
      },
    };
    const expectedState: ProductDetailSliceState = {
      detail: project,
    };

    // when
    const actual = projectDetailSlice(initialState, loadDetail(project));

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('clear detail', () => {
    // given
    const project = createRandomProject();
    const initialState: ProductDetailSliceState = {
      detail: project,
    };
    const expectedState: ProductDetailSliceState = {
      detail: {
        name: null,
        from: null,
        to: null,
        budget: null,
        description: null,
      },
    };

    // when
    const actual = projectDetailSlice(initialState, clearDetail());

    // then
    expect(actual).toStrictEqual(expectedState);
  });

  test('update detail', () => {
    // given
    const project = createRandomProject();
    const initialState: ProductDetailSliceState = {
      detail: project,
    };
    const expectedState: ProductDetailSliceState = {
      detail: {
        ...project,
        name: 'new name',
        description: 'new description',
        from: new Date(1996, 8, 1),
        to: new Date(2024, 10, 23),
        budget: 1000000,
      },
    };

    // when
    const actual = projectDetailSlice(
      initialState,
      updateDetail({
        name: 'new name',
        description: 'new description',
        from: new Date(1996, 8, 1),
        to: new Date(2024, 10, 23),
        budget: 1000000,
      }),
    );

    // then
    expect(actual).toStrictEqual(expectedState);
  });
});
