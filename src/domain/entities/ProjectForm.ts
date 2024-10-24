export default interface ProjectForm {
  name: string | null;
  description: string | null;
  from: Date | null;
  to: Date | null;
  budget: number | null;
}
