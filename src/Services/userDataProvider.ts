import { IUser } from "./IUser";
import { IUserDataProvider } from "./IUserDataProvider";

export class UserDataProvider implements IUserDataProvider {

    private sessionKey: string = "com.couponCal.users"

    public async getAllUsers(): Promise<IUser[]> {
        let cachedValuesResolved: boolean = false;
        let cachedValue = window.sessionStorage.getItem(this.sessionKey);
        let cachedUsers: IUser[] = [];
        if (cachedValue) {
            cachedUsers = (JSON.parse(cachedValue) as IUser[]);
        }

        if (cachedUsers.length > 0) {
            cachedValuesResolved = true;
            return Promise.resolve(cachedUsers);
        }

        let userJson = await fetch('testUserData.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        let results = await userJson.json();

        window.sessionStorage.setItem(this.sessionKey, JSON.stringify(results.users));

        if (!cachedValuesResolved) {
            return Promise.resolve(results.users);
        } else {
            return Promise.reject("Failed to get User data");
        }
    }

    public getUser(userId: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

}