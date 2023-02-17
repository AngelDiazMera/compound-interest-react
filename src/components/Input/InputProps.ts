import { OutlinedInputProps } from "@mui/material";

export interface InputProps extends Omit<OutlinedInputProps, 'error'> {
    label: string;
    id: string;
    error?: string;
}

export type RefType = ((instance: unknown) => void) | React.RefObject<unknown> | null | undefined;
