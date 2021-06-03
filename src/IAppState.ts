import { GENDER_, REGION_ } from "./Services/IUser";

export interface IAppState {
    rollingTotals: number[];
    monthlyTotals: any;
    cutoff: number
    filterActive: boolean;
    selectedRegion: REGION_;
    selectedGender: string;
}