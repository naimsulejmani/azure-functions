import { AzureFunction, Context, HttpRequest } from "@azure/functions"

interface ResponseMessage {
    message: string, 
    result: any
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Total Cost HTTP trigger function processed a request.');
    
    const { quantity, unitPrice } = req.body;

    let responseStatusCode = 200;
    let responseMessageBody: ResponseMessage = {message: 'OK', result: null}

    if (!quantity || !unitPrice) {
        responseStatusCode = 400;
        responseMessageBody.message = 'Bad request! The quantity & unitPrice not provided!'

    } else {
        const totalCost = quantity * unitPrice;
        responseMessageBody.result = { totalCost };
    }
        


    context.res = {
        status: responseStatusCode,
        body: responseMessageBody
    };

};

export default httpTrigger;