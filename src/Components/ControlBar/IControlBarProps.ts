export interface IControlBarProps {
    liftUpState(key: string, value:string): void;
    liftUpCutoff(value: number): void;
    cutoff:number;
    region:string;
    gender:string;
}