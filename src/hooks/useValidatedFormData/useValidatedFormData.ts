import { useMemo, useRef, useState } from 'react';
import { generateInitialData } from './helpers';
import { FieldData, Validators } from './useValidatedFormDataTypes';

/**
 * Hook to handle the form data validations.
 */
export const useValidatedFormData = <FormValues extends Object>(
  initialData: FormValues
) => {
  // Data is an object with the same keys as initialData, but with a value and an error
  const [formData, setFormData] = useState(generateInitialData(initialData));

  // isValid is true if there are no errors in the form
  const isFormValid = useMemo(() => {
    for (const key in formData) {
      // @ts-ignore
      const { error, initialError } = formData[key]!;
      if (error || initialError) return false;
    }
    return true;
  }, [formData]);


  // validatorsRef is a ref to an object that contains the validators for each field
  const validatorsRef = useRef({} as Validators<FormValues >);

  /**
   * Create a validator for a field based on a regex expression and an error message
   * @param field The field to be validated
   * @param regex The regex expression to validate the field
   * @param error The error message to be displayed if the field is invalid
   */
  const createValidator = (
    field: keyof FormValues,
    validateValue: (value: FormValues[typeof field]) => boolean,
    error: string
  ) => {
    if(validatorsRef.current[field]) return;
    validatorsRef.current[field] = { validate: validateValue, error };
    // @ts-ignore
    const initialFormValue = formData[field]?.value as FormValues[typeof field];
    validate(field, initialFormValue, true);
  };

  /**
   * Validate a field and update the form data
   * @param field The field to be validated
   * @param value The value of the field
   * @returns True if the field is valid, false otherwise
   */
  const validate = <TypeField extends keyof FormValues>(
    field: TypeField,
    value: FormValues[TypeField],
    preventUpdate = false
  ) => {
    const validator = validatorsRef.current[field];
    const isValid = validator?.validate(value as FormValues[typeof field]);
    const error = isValid ? undefined : validator.error;

    const fieldData = { value } as FieldData;

    if (!preventUpdate)  fieldData.error  = error;
    else fieldData.initialError = error

    setFormData((prevData) => ({
      ...prevData,
      [field]: fieldData,
    }));

    return isValid;
  };

  const isValid = isFormValid;
  return [formData, { isValid, createValidator, validate }] as const;
};
