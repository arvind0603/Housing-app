import { Ipropertybase } from "./ipropertybase";

export class Property implements Ipropertybase {
  id!: number | null;
  sellRent!: number | null;
  name!: string | null;
  propertyType!: string | null;
  bhk!: string | null;
  furnishingType!: string | null;
  price!: number | null;
  builtArea!: number | null;
  carpetArea?: number | null;
  address!: string | null;
  address2!: string | null;
  floorNo?: string | null;
  totalFloors?: string | null;
  age?: string | null;
  mainEntrance?: string | null;
  security?: number | null;
  gated?: boolean
  maintenance?: number | null;
  estPossessionOn?: Date | null;
  city!: string | null;
  readyToMove!: number | null;
  image?: string | null | undefined;
  description?: string | null;
}
