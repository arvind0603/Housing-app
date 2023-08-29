export interface Ipropertybase {
  id: number | null;
  sellRent: number | null;
  name: string | null;
  propertyType: string | null;
  furnishingType: string | null;
  price: number | null;
  bhk: string | null;
  builtArea: number | null;
  city: string | null;
  readyToMove: number | null;
  image?: string | null;
  estPossessionOn?: Date | null;

}
