import { Ipropertybase } from "./ipropertybase";

export class Property implements Ipropertybase {
    Id!: number | null;
    SellRent!: number | null;
    Name!: string | null;
    PType!: string | null;
    BHK!: string | null;
    FType!: string | null;
    Price!: number | null;
    BuiltArea!: number | null;
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
    City!: string | null;
    RTM!: number | null;
    Image?: string | null | undefined;
    Description?: string | null;
    PostedOn!: string;
    PostedBy!: number;
    
}
