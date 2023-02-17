export interface FieldData {
  value: string;
  error?: string;
  initialError?: string;
}
export type FormData<FormValues extends Object> = Record<
  keyof FormValues,
  FieldData
>;

export type Validators<FormValues extends Object> = Record<
  keyof FormValues,
  { validate: (value: FormValues[keyof FormValues]) => boolean; error: string }
>;
