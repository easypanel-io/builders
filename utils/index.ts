import { AjvError, FormValidation } from "@rjsf/core";
import { FromSchema, JSONSchema7 } from "json-schema-to-ts";

export type Output = { name: string; content: string }[];

export function createBuilder<Schema extends JSONSchema7>(props: {
  name: string;
  schema: Schema;
  generate: (input: FromSchema<Schema>) => Output;
  validate?: (
    formData: FromSchema<Schema>,
    error: FormValidation
  ) => FormValidation;
  transformErrors?: (errors: AjvError[]) => AjvError[];
}) {
  return props;
}

export function joinLines(lines: (string | boolean | null)[]) {
  return lines.filter((line) => typeof line === "string").join("\n");
}
