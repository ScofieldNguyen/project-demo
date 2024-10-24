import { Dayjs } from 'dayjs';
import validateProjectForm from '@domain/validations/validateProjectForm';

describe('test validation project form', () => {
  it('should pass validation for a valid form', async () => {
    const validForm = {
      id: 1,
      name: 'Project A',
      description: 'A great project',
      from: new Date() as unknown as Dayjs,
      to: new Date() as unknown as Dayjs,
      budget: 1000,
      country: 'USA',
      domain: 'Technology',
    };

    const result = await validateProjectForm(validForm);
    expect(result.pass).toBeTruthy();
  });

  it('should failed when required fields are missing', async () => {
    const invalidForm = {
      name: null,
      description: null,
      from: null,
      to: null,
      budget: null,
      country: null,
      domain: null,
    };

    const result = await validateProjectForm(invalidForm);
    expect(result.pass).toBeFalsy();

    expect(result.errors['name']).toBe('Name is required');
    expect(result.errors['description']).toBe('Description is required');
    expect(result.errors['from']).toBe('Start date is required');
    expect(result.errors['to']).toBe('End date is required');
    expect(result.errors['budget']).toBe('Budget is required');
    expect(result.errors['country']).toBe('Country is required');
    expect(result.errors['domain']).toBe('Domain is required');
  });

  it('should failed when budget is negative', async () => {
    const invalidForm = {
      id: 1,
      name: 'Project B',
      description: 'Another project',
      from: new Date() as unknown as Dayjs,
      to: new Date() as unknown as Dayjs,
      budget: -500,
      country: 'UK',
      domain: 'Finance',
    };

    const result = await validateProjectForm(invalidForm);
    expect(result.pass).toBeFalsy();

    expect(result.errors['budget']).toBe('Budget cannot be negative');
  });

  it('should fail when dates are invalid', async () => {
    const invalidForm = {
      id: 2,
      name: 'Invalid Dates Project',
      description: 'This project has invalid dates',
      from: 'invalid-date' as unknown as Dayjs,
      to: 'invalid-date' as unknown as Dayjs,
      budget: 500,
      country: 'Germany',
      domain: 'Healthcare',
    };

    const result = await validateProjectForm(invalidForm);
    expect(result.pass).toBeFalsy();

    expect(result.errors['from']).toBe('Invalid date format');
    expect(result.errors['to']).toBe('Invalid date format');
  });
});
