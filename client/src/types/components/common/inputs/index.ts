interface TextFieldType {
  placeHolder: string;
  type: string;
  name: string;
  register?: any;
  required?: boolean | string;
  isCenter?: boolean;
  error?: string | null;
  defaultValue?: string;
}

export type { TextFieldType };
