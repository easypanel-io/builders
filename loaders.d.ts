declare module "*.ejs" {
  const template: (data?: any) => string;
  export = template;
}

declare module "*.hbs" {
  const template: (data?: any) => string;
  export = template;
}
