import { IUser } from "./IUser";
import { IUserDataProvider } from "./IUserDataProvider";

export class UserDataProvider implements IUserDataProvider {
    public getAllUsers(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }

    public getUser(userId: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

}