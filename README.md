# Easypanel Builders

In this repository, you will find the builders available in Easypanel.

[Playground URL](https://easypanel-builders.netlify.app/)

## Builder Definition Example

Here is how you define a builder.

```ts
import { createBuilder, joinLines } from "~builders-utils";

export default createBuilder({
  name: "Next.js",
  schema: {
    type: "object",
    required: ["packageManager", "disableTelemetry"],
    properties: {
      packageManager: {
        type: "string",
        title: "Package Manager",
        oneOf: [
          { enum: ["npm"], title: "NPM" },
          { enum: ["yarn"], title: "Yarn" },
        ],
        default: "npm",
      },
      disableTelemetry: {
        type: "boolean",
        title: "Disable Telemetry",
        default: false,
      },
    },
  } as const,
  generate({ packageManager, disableTelemetry }) {
    const dockerfileContent = joinLines([
      // ...
      "EXPOSE 3000",
      "ENV PORT 3000",
      `CMD ["node", "server.js"]`,
    ]);

    return [{ name: "Dockerfile", content: dockerfileContent }];
  },
});
```

## Builder Properties

- `name`
- `schema` is a JSON Schema. This is used to generate the form and validate the input. Important: do not remove the `as const` at the end of your schema in order to keep the type inference working.
- `generate` is the core of the builder. It receives the form data and returns file contents.
- `validate` (optional) is used for custom validation rules
- `transformErrors` (optional) is used for custom error messages

## Defining Builders

1. Duplicate any builder from the `/builders` directory
2. Re-export the newly created builder from `/builder/_list.ts`
3. Run `yarn dev` to open the testing playground
4. Customize your builder.
5. Test your builder.
6. Send a PR.

## Type Safety

Builders are written in Typescript. We try to infer as much as possible from the `schema`. The `createBuilder` function doesn't do anything at the runtime. It is only used to give you better type inference.

## Custom Validation Rules

```ts
{
  // ...
  validate(formData, errors) {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError("Passwords don't match");
    }
    return errors;
  }
}
```

## Custom Error Messages

```ts
{
  // ...
  transformErrors(errors) {
    return errors.map((error) => {
      if (error.name === "pattern") {
        error.message = "Only digits are allowed";
      }
      return error;
    });
  }
}
```

## Form Fields

### Select

```ts
{
  // ...
  selectField: {
    type: "string",
    title: "Select Field",
    oneOf: [
      { enum: ["first"], title: "First Option" },
      { enum: ["second"], title: "Second Option" },
      { enum: ["third"], title: "Third Option" },
    ],
  },
}
```
