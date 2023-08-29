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
  CarpetArea?: number | null;
  Address!: string | null;
  Address2!: string | null;
  FloorNo?: string | null;
  TotalFloor?: string | null;
  AOP?: number | null;
  MainEntrance?: string | null;
  Security?: number | null;
  Gated?: number
  Maintenance?: number | null;
  Possession?: string | null;
  city!: string | null;
  readyToMove!: number | null;
  image?: string | null | undefined;
  Description?: string | null;
  PostedOn!: string;
  PostedBy!: number;

}
