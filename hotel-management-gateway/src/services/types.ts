// טיפוסים עבור RoomDB
export interface RoomDB {
  id: string;                // Guid של החדר
  roomNum: number;           // מספר החדר
  floor: number;             // קומה
  conditionId: string;       // Guid ל־Condition
  sumbed: number;            // מספר מיטות בחדר
}

// טיפוסים עבור RoomLocation
export interface RoomLocation {
  id: string;                // Guid
  rooms: string;             // Guid של חדר
  registeredsId: string;     // Guid של מתארח
}

// טיפוסים עבור Registereds
export interface Registereds {
  id: string;                // Guid
  numberId?: string;         // NumberId של הנרשם
  name?: string;             // שם הנרשם
  sumPlace: number;          // מספר מקומות
  totalPrice: number;        // מחיר כולל
  priceListId: string;       // Guid ל־PricesList
  event?: PricesList;        // הקשר ל־Event
  conditionId: string;       // Guid ל־Condition
  condition?: Condition;     // קשר ל־Condition
  rooms?: RoomLocation[];    // רשימת חדרים שמוקצים למתארח
}

// טיפוסים עבור Condition
export interface Condition {
  id: string;
  option?: string;           // אפשרות בחירה מהטבלה
  price?: number;            // מחיר
}

// טיפוסים עבור PricesList (Event)
export interface PricesList {
  idPrice: string;
  price: number;
  event?: string;
}

// טיפוס בקשה ל־bookingService
export interface BookingRequest {
  guests: number;
  //   startDate: string;
  //   endDate: string;
  enent?: string;
  preferredFloor?: number | null;
  accessibility?: boolean;
  event: string;             // Event Name
}