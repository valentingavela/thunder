import { IAuthor } from './search.models';
import { IPathFromRoot } from './category.models';

export interface ISearchItemResponse {
  id: string;
  site_id: string;
  title: string;
  subtitle?: any;
  seller_id: number;
  category_id: string;
  official_store_id?: any;
  price: number;
  base_price: number;
  original_price?: any;
  currency_id: string;
  initial_quantity: number;
  available_quantity: number;
  sold_quantity: number;
  sale_terms: ISaleterm[];
  buying_mode: string;
  listing_type_id: string;
  start_time: string;
  stop_time: string;
  condition: string;
  permalink: string;
  thumbnail: string;
  secure_thumbnail: string;
  pictures: IPicture[];
  video_id: string;
  descriptions: IDescriptionIds[];
  accepts_mercadopago: boolean;
  non_mercado_pago_payment_methods: any[];
  shipping: IShipping;
  international_delivery_mode: string;
  seller_address: ISelleraddress;
  seller_contact: ISellercontact;
  location: Location;
  geolocation: Geolocation;
  coverage_areas: any[];
  attributes: IAttribute[];
  warnings: any[];
  listing_source: string;
  variations: any[];
  status: string;
  sub_status: any[];
  tags: string[];
  warranty?: any;
  catalog_product_id?: any;
  domain_id: string;
  parent_item_id: string;
  differential_pricing?: any;
  deal_ids: any[];
  automatic_relist: boolean;
  date_created: string;
  last_updated: string;
  health?: any;
  catalog_listing: boolean;
}

interface IAttribute {
  id: string;
  name: string;
  value_id?: string;
  value_name: string;
  value_struct?: IValuestruct;
  values: IValue2[];
  attribute_group_id: string;
  attribute_group_name: string;
}

interface IValue2 {
  id?: string;
  name: string;
  struct?: IValuestruct;
}

interface IGeolocation {
  latitude: number;
  longitude: number;
}

interface ILocation {
  address_line: string;
  zip_code: string;
  neighborhood: IState;
  city: IState;
  state: IState;
  country: IState;
  latitude: number;
  longitude: number;
}

interface ISellercontact {
  contact: string;
  other_info: string;
  country_code: string;
  area_code: string;
  phone: string;
  country_code2: string;
  area_code2: string;
  phone2: string;
  email: string;
  webpage: string;
}

interface ISelleraddress {
  city: ICity;
  state: IState;
  country: IState;
  search_location: ISearchlocation;
  latitude: number;
  longitude: number;
  id: number;
}

interface ISearchlocation {
  neighborhood: IState;
  city: IState;
  state: IState;
}

interface IState {
  id: string;
  name: string;
}

interface ICity {
  name: string;
}

interface IShipping {
  mode: string;
  methods: any[];
  tags: any[];
  dimensions?: any;
  local_pick_up: boolean;
  free_shipping: boolean;
  logistic_type?: any;
  store_pick_up: boolean;
}

interface IDescriptionIds {
  id: string;
}

interface IPicture {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}

interface ISaleterm {
  id: string;
  name: string;
  value_id?: any;
  value_name: string;
  value_struct: IValuestruct;
  values: IValue[];
}

interface IValue {
  id?: any;
  name: string;
  struct: IValuestruct;
}

interface IValuestruct {
  number: number;
  unit: string;
}

export interface ISearchItemPayload {
  author?: IAuthor;
  item: {
    id: string;
    title: string;
    categories: IPathFromRoot[];
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

export interface IGetDescriptionResponse {
  id: string;
  created: Date;
  text: string;
  plain_text: string;
  snapshot: ISnapshot;
}

export interface ISnapshot {
  url: string;
  width: number;
  height: number;
  status: string;
}
