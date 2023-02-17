import { FormData } from "./useValidatedFormDataTypes";

export const generateInitialData = <FormValues extends Object>(
  initialData: Partial<FormValues>
) => {
  const formData = {} as FormData<FormValues>;
  for (const key in initialData) {
    // @ts-ignore
    formData[key] = { value: initialData[key] };
  }
  return formData;
};
