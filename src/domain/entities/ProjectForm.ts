export default interface ProjectForm {
  id?: number;
  name: string | null;
  description: string | null;
  from: number | null;
  to: number | null;
  budget: number | null;
  country: string | null;
  domain: string | null;
}
