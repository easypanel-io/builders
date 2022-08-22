declare module "*.ejs" {
  const template: (data?: any) => string;
  export = template;
}
