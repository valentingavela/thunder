export interface IShopping {
  shopping: boolean;
}

export interface IAuthor {
  name: string;
  lastname: string;
}

export interface ISearchResponse {
  author: IAuthor;
  categories: string[];
  items: IProduct[];
}

export interface IProduct {
  id: string;
  title: string;
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
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  };
}
