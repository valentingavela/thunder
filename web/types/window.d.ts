export {};
declare global {
  interface Window {
    __BASEURL__: string;
    __USERNAME__: string;
    __APP_DATA__: any;
    __SHOPPING_JSON: any;
  }
}
