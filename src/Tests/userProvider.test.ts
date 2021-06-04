import {FetchMock} from "jest-fetch-mock";
import { UserDataProvider } from "../Services/userDataProvider";

const fetchMock = fetch as FetchMock;


describe("UserProfilesProvider", ()=> {
    let log = (window as any).console.jestlog;
    beforeEach(function() {
        fetchMock.resetMocks();
    });

    it("It should return error", function (done) {
        // mock the response to reject a fetch mock error
        fetchMock.mockReject(new Error("fetchMockError"));
         new UserDataProvider().getAllUsers().then(response => {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(response).toBe("Failed to retrieve User Profile Data. Error>>>Error: fetchMockError");
            done();
        }).catch(error =>{
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toBe("Failed to retrieve User Profile Data. Error>>>Error: fetchMockError");
            done();
        })
    });

    it("should return data", async (done) => {
        // mock the response to return our json object
        // fetchMock.mockResponse(JSON.stringify(js));

        let up = await   new UserDataProvider().getAllUsers();
        setTimeout(() => {
            expect("").toBe("Stephen Burns");
            done();
        }, 50);
    });
});
