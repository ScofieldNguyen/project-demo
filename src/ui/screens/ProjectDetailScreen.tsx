import '@ui/screens/ProjectDetailScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectDetail } from '@domain/features/projectDetail/projectDetailSlice';
import { AppDispatch } from '@ui/StoreType';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { fetchProject } from '@domain/features/thunks/fetchProject';
import { Button, Form, Input, InputNumber, notification, Skeleton } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DatePicker } from 'antd/lib';
import ProjectForm from '@domain/entities/ProjectForm';
import validateProjectForm from '@domain/validations/validateProjectForm';
import { editProject } from '@domain/features/thunks/editProject';
import { createProject } from '@domain/features/thunks/createProject';
import { removeProject } from '@domain/features/thunks/removeProject';

export const DetailMode = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

function getMode(id?: number) {
  if (id === undefined) {
    return DetailMode.CREATE;
  } else {
    return DetailMode.UPDATE;
  }
}

export function ProjectDetailScreen(props: { id?: number }) {
  const { detail, loading, error } = useSelector(selectDetail);
  const [form] = Form.useForm<ProjectForm>();
  const [noti, contextHolder] = notification.useNotification();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const mode = getMode(props.id);

  const [edit, setEdit] = useState<boolean>(mode === DetailMode.CREATE);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onClickEdit = useCallback(() => {
    setEdit(true);
  }, []);

  const onClickDelete = useCallback(() => {
    if (props.id) dispatch(removeProject(props.id));

    noti.success({
      message: `Successfully deleted project`,
    });

    navigate(-1);
  }, [props.id]);

  const onSubmit = useCallback(
    async (formValues: ProjectForm) => {
      const validationResult = await validateProjectForm(formValues);
      if (validationResult.pass) {
        const mode = getMode(props.id);
        if (mode === DetailMode.UPDATE) {
          await dispatch(editProject({ id: props.id!, form: formValues }));
          noti.success({
            message: `Successfully updated project ${formValues.name}`,
          });
        } else {
          await dispatch(createProject(formValues));
          noti.success({
            message: `Successfully created project ${formValues.name}`,
          });
          navigate(-1);
        }
      } else {
        setErrors(validationResult.errors);
      }
    },
    [dispatch, navigate, props.id],
  );

  useEffect(() => {
    if (props.id) dispatch(fetchProject(props.id));
  }, [dispatch, props.id]);

  useEffect(() => {
    // populate data to form
    form.setFieldsValue(detail);
  }, [detail, form]);

  useEffect(() => {
    if (error) noti.error({ message: error });
  }, [error]);

  return (
    <div className={'container'}>
      {contextHolder}
      <h2>Project {detail.name}</h2>
      <div className={'button-bar'} style={{ maxWidth: 600 }}>
        {!edit && mode === DetailMode.UPDATE && (
          <Fragment>
            <Button type={'default'} onClick={onClickEdit}>
              Edit
            </Button>

            <Button type={'primary'} danger={true} onClick={onClickDelete}>
              Delete
            </Button>
          </Fragment>
        )}
      </div>

      {loading ? (
        <Skeleton loading={true} style={{ maxWidth: 600 }}>
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
          <Skeleton.Input />
        </Skeleton>
      ) : (
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={!edit}
          style={{ maxWidth: 600 }}
          onFinish={onSubmit}
        >
          <Form.Item label="ID" name={'id'}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Name"
            name={'name'}
            validateStatus={errors['name'] ? 'error' : ''}
            help={errors['name']}
          >
            <Input placeholder={'Enter name'} data-testid={'name-input'} />
          </Form.Item>
          <Form.Item
            label="Description"
            name={'description'}
            validateStatus={errors['description'] ? 'error' : ''}
            help={errors['description']}
          >
            <Input placeholder={'Enter description'} />
          </Form.Item>
          <Form.Item
            label="From"
            name={'from'}
            validateStatus={errors['from'] ? 'error' : ''}
            help={errors['from']}
          >
            <DatePicker
              format="DD/MM/YYYY"
              disabled={!edit}
              data-testid={'from-picker'}
            />
          </Form.Item>
          <Form.Item
            label="To"
            name={'to'}
            validateStatus={errors['to'] ? 'error' : ''}
            help={errors['to']}
          >
            <DatePicker
              format="DD/MM/YYYY"
              disabled={!edit}
              data-testid={'to-picker'}
            />
          </Form.Item>
          <Form.Item
            label="Budget"
            name={'budget'}
            validateStatus={errors['budget'] ? 'error' : ''}
            help={errors['budget']}
          >
            <InputNumber placeholder={'Enter budget'} addonAfter="$" />
          </Form.Item>
          <Form.Item
            label="Country"
            name={'country'}
            validateStatus={errors['country'] ? 'error' : ''}
            help={errors['country']}
          >
            <Input placeholder={'Enter country'} />
          </Form.Item>
          <Form.Item
            label="Domain"
            name={'domain'}
            validateStatus={errors['domain'] ? 'error' : ''}
            help={errors['domain']}
          >
            <Input placeholder={'Enter domain'} />
          </Form.Item>
          {edit && mode === DetailMode.UPDATE && (
            <Button type={'primary'} htmlType="submit">
              Save
            </Button>
          )}
          {mode === DetailMode.CREATE && (
            <Button type={'primary'} htmlType="submit">
              Create
            </Button>
          )}
        </Form>
      )}
    </div>
  );
}

export function ProjectDetailNavigationWrapper() {
  const [searchParams] = useSearchParams();

  let id;
  if (searchParams.get('id') !== null) {
    id = parseInt(searchParams.get('id')!);
  }
  return <ProjectDetailScreen id={id} />;
}
