export default interface ValidationResult {
  pass: boolean;
  errors: { [key: string]: string };
}
