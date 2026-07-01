// export interface RoomDB {
//   id: string;
//   roomNum: number;
//   floor: number;
//   conditionId: string;
//   sumbed: number;
//   roomlocation:string []
// }

// export interface RoomLocation {
//   id: string;
//   rooms: string;
//   registeredsId: string;
// }

// export interface Registereds {
//   id: string;
//   numberId?: string;
//   name?: string;
//   sumPlace: number;
//   totalPrice: number;
//   priceListId: string;
//   event?: PricesList;
//   conditionId: string;
//   condition?: Condition;
// }

// export interface Condition {
//   id: string;
//   option?: string;
//   price?: number;
// }

// export interface PricesList {
//   idPrice: string;
//   price: number;
//   event?: string;
// }



export interface RoomDB {
    id: string;
    roomNum: number;
    floor: number;
    conditionId: string;
    condition?: Condition;
    sumbed: number;
    roomLocations: RoomLocation[];
}

export interface RoomLocation {
    id: string;
    rooms: string;         // GUID של החדר
    registeredsId: string; // GUID של הרשום
}

export interface Registereds {
    id: string;
    numberId?: string;
    name?: string;
    sumPlace: number;
    totalPrice: number;
    priceListId: string;   // GUID של PriceList
    conditionId: string;   // GUID של Condition
}

export interface PricesList {
    idPrice: string;       // GUID
    event: string;         // שם האירוע (לדוגמה "נופש_מלא")
    price: number;
}

export interface Condition {
    id: string;            // GUID
    option: string;        // שם האופציה (לדוגמה "אקסטרה")
    price: number;
}

export interface RoomLocationViewDTO {
    id: string;
    name: string;
    phone: string;
    roomNum: number;
    floor: number;
    roomCondition: string;
}