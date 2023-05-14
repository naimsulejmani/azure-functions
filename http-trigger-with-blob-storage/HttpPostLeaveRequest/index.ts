import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction =
    async function (context: Context, req: HttpRequest): Promise<void> {

        let responseStatusCode: number = 400;
        let responseMessage: string =
            "Bad Request! Request leave data in the request were not provided!";

        if (req.body) {
            const id = Math.ceil(Math.random() * 100000000).toFixed(0);
            // there can we add more validation / destruction checking if the request is valid (I skipped this part)
            context.bindings.leaveRequestBlob = { ...req.body, id };
            responseStatusCode = 201;
            responseMessage = 
        `
        Request leave for the users: ${req.body.empId} created in Blob storage.
        The request id to follow up is ${id}
        `
        }

        context.res = {
            status: responseStatusCode,
            body: responseMessage
        };

    };

export default httpTrigger;