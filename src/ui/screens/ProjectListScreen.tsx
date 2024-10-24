import '@ui/screens/ProjectListScreen.css';
import { Button, Table, TablePaginationConfig } from 'antd';
import { selectProjectListInfo } from '@domain/features/projectList/projectListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '@domain/features/thunks/fetchProjects';
import { ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import Project from '@domain/entities/Project';
import { AppDispatch } from '@ui/StoreType';
import parseNameToURL from '@ui/utils/parseNameToURL';
import { parseMsToDateString } from '@ui/utils/parseDate';
import { formatToCurrency } from '@ui/utils/formatCurrency';

const columns: ColumnType<Project>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => {
      return <div data-testid={'row'}>{text}</div>;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link to={`/projects/${parseNameToURL(record.name)}?id=${record.id}`}>
        {record.name}
      </Link>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: (text) => parseMsToDateString(text),
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: (text) => parseMsToDateString(text),
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    render: (text) => formatToCurrency(text),
  },
];

export default function ProjectListScreen() {
  const projectListData = useSelector(selectProjectListInfo);
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProjects({ page, itemsPerPage: 10 }));
  }, [dispatch, page]);

  const handlePagination = useCallback((page: number) => {
    setPage(page);
  }, []);

  const paginationOption: TablePaginationConfig = useMemo(
    () => ({
      pageSize: 10,
      total: 100,
      onChange: handlePagination,
      showSizeChanger: false,
    }),
    [handlePagination],
  );

  return (
    <div className="project-list-container">
      <h1>Project List</h1>
      <div className={'buttons-bar'}>
        <Button type={'primary'} href={'/projects/create'}>
          Create Project
        </Button>
      </div>
      <Table
        dataSource={projectListData.list}
        columns={columns}
        loading={projectListData.loading}
        pagination={paginationOption}
      />
    </div>
  );
}
