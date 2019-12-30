export interface ISearch {
  site_id: string;
  query: string;
  paging: IPaging;
  results: IResult[];
  secondary_results: any[];
  related_results: any[];
  sort: ICountry;
  available_sorts: ICountry[];
  filters: IFilter[];
  available_filters: IAvailablefilter[];
}

export interface IAvailablefilter {
  id: string;
  name: string;
  type: string;
  values: IAvailableFilterValue[];
}

interface IAvailableFilterValue {
  id: string;
  name: string;
  results: number;
}

export interface IFilter {
  id: string;
  name: string;
  type: string;
  values: IFilterValues[];
}

export interface IFilterValues {
  id: string;
  name: string;
  path_from_root: IPathFromRoot[];
}

export interface IPathFromRoot {
  id: string;
  name: string;
}

export interface IResult {
  id: string;
  site_id: string;
  title: string;
  seller: ISeller;
  price: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  stop_time: string;
  condition: string;
  permalink: string;
  thumbnail: string;
  accepts_mercadopago: boolean;
  installments: IInstallments;
  address: IAddress;
  shipping: IShipping;
  seller_address: ISelleraddress;
  attributes: IAttribute[];
  original_price?: number;
  category_id: string;
  official_store_id?: number;
  catalog_product_id?: string;
  tags: string[];
  differential_pricing?: IDifferentialpricing;
}

interface IDifferentialpricing {
  id: number;
}

interface IAttribute {
  id: string;
  name: string;
  values: IValue[];
  value_id?: string | string;
  value_name?: string | string;
  value_struct?: any;
  attribute_group_id: string;
  attribute_group_name: string;
  source: number;
}

interface IValue {
  id?: string | string;
  name?: string | string;
  struct?: any;
  source: number;
}

interface ISelleraddress {
  id: string;
  comment: string;
  address_line: string;
  zip_code: string;
  country: ICountry;
  state: ICountry;
  city: ICity;
  latitude: string;
  longitude: string;
}

interface ICity {
  id?: string;
  name: string;
}

interface ICountry {
  id: string;
  name: string;
}

interface IShipping {
  free_shipping: boolean;
  mode: string;
  tags: string[];
  logistic_type: string;
  store_pick_up: boolean;
}

interface IAddress {
  state_id: string;
  state_name: string;
  city_id?: string;
  city_name: string;
}

interface IInstallments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

interface ISeller {
  id: number;
  permalink?: any;
  power_seller_status?: string;
  car_dealer: boolean;
  real_estate_agency: boolean;
  tags: any[];
}

interface IPaging {
  total: number;
  offset: number;
  limit: number;
  primary_results: number;
}

export interface ISearchPayload {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: Array<{
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
  }>;
}
