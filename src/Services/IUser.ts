export interface IUser {
    id: number;
    birthday:number;
    spend: number;
    region: REGION_,
    gender: GENDER_, 
}

export enum REGION_ {
    "United States",
    "Europe",
    "APAC",
    "Latin America",
}


export enum GENDER_ {
    Male,
    Female
}