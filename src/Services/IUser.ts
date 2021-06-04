export interface IUser {
    id: number;
    birthday:number;
    spend: number;
    region: REGION_,
    gender: string, 
}

export enum REGION_ {
    none = "None",
    US = "United States",
    EU = "Europe",
    APAC= "APAC",
    LATINAMERICA ="Latin America",
}
