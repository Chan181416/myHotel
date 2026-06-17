export interface RoomDB {
  id: string;
  roomNum: number;
  floor: number;
  conditionId: string;
  sumbed: number;
}

export interface RoomLocation {
  id: string;
  rooms: string;
  registeredsId: string;
}

export interface Registereds {
  id: string;
  numberId?: string;
  name?: string;
  sumPlace: number;
  totalPrice: number;
  priceListId: string;
  event?: PricesList;
  conditionId: string;
  condition?: Condition;
}

export interface Condition {
  id: string;
  option?: string;
  price?: number;
}

export interface PricesList {
  idPrice: string;
  price: number;
  event?: string;
}