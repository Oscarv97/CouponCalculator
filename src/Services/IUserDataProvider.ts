import { IUser } from "./IUser";

export interface IUserDataProvider {
    getAllUsers(): Promise<IUser[]>;
    getUser(userId:number): Promise<IUser>;
}