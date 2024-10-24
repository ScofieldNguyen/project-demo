import parseURLToBreadcrumbs from '@ui/utils/parseURLToBreadcrumbs';
import BreadcrumbInfo from '@domain/entities/BreadcrumbInfo';

describe('test parse url to breadcrumbs', () => {
  test('project list', () => {
    const infos = parseURLToBreadcrumbs('/projects');
    const expectedInfos: BreadcrumbInfo[] = [
      { title: 'Projects', href: '/projects' },
    ];
    expect(infos).toStrictEqual(expectedInfos);
  });

  test('project list > project detail', () => {
    const infos = parseURLToBreadcrumbs('/projects/some-project-name');
    const expectedInfos: BreadcrumbInfo[] = [
      { title: 'Projects', href: '/projects' },
      { title: 'Some Project Name', href: '/projects/some-project-name' },
    ];
    expect(infos).toStrictEqual(expectedInfos);
  });

  test('project list > project detail > something else', () => {
    const infos = parseURLToBreadcrumbs(
      '/projects/some-project-name/something-else-12-0',
    );
    const expectedInfos: BreadcrumbInfo[] = [
      { title: 'Projects', href: '/projects' },
      { title: 'Some Project Name', href: '/projects/some-project-name' },
      {
        title: 'Something Else 12 0',
        href: '/projects/some-project-name/something-else-12-0',
      },
    ];
    expect(infos).toStrictEqual(expectedInfos);
  });
});
