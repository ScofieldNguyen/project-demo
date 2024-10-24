import ValidationResult from '@domain/entities/ValidationResult';
import ProjectForm from '@domain/entities/ProjectForm';
import { date, number, object, string, ValidationError } from 'yup';

const projectFormSchema = object().shape({
  id: number().optional(),
  name: string().nullable().required('Name is required'),
  description: string().nullable().required('Description is required'),
  from: date()
    .nullable()
    .required('Start date is required')
    .typeError('Invalid date format'),
  to: date()
    .nullable()
    .required('End date is required')
    .typeError('Invalid date format'),
  budget: number()
    .nullable()
    .required('Budget is required')
    .min(0, 'Budget cannot be negative'),
  country: string().nullable().required('Country is required'),
  domain: string().nullable().required('Domain is required'),
});

export default async function validateProjectForm(
  form: ProjectForm,
): Promise<ValidationResult> {
  try {
    await projectFormSchema.validate(form, { abortEarly: false });
    return {
      pass: true,
      errors: {},
    };
  } catch (error) {
    let inners = (error as ValidationError).inner;
    const errors: { [key: string]: string } = {};
    for (let i = 0; i <= inners.length - 1; i++) {
      const inner = inners[i];
      errors[inner.path || 'general'] = inner.message;
    }
    return {
      pass: false,
      errors,
    };
  }
}
