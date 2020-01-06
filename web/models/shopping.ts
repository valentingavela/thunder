export interface IShopping {
  shopping: boolean;
}

export interface IAuthor {
  name: string;
  lastname: string;
}

export interface ISearchResponse {
  author: IAuthor;
  categories: ICategory[];
  items: IProduct[];
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  title: string;
  categories: ICategory[];
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  description?: string;
  sold_quantity: number;
}

export interface ISearchItemResponse {
  author: IAuthor;
  item: IProduct;
}
