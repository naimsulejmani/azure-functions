import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BlobServiceClient } from "@azure/storage-blob"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let responseStatusCode: number = 404
    let responseMessage: string = `No result found`
    let responseHeaders: object = { "Content-Type": "text/plain" }


    if (req.params.id) {
        if (context.bindings.leaveRequestBlobIn) {

            responseStatusCode = 200
            responseHeaders = { "Content-Type": "application/json" }
            responseMessage = context.bindings.leaveRequestBlobIn

        }
    } else {
        const containerName = "leave-request"  
        let files: string[] = new Array()
        console.log(process.env.AZURE_BLOB_CONNECTION_STRING)

        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING ?? "");
        const containerClient = blobServiceClient.getContainerClient(containerName);

        let i = 0
        for await (const blob of containerClient.listBlobsFlat({ prefix: `request/` })) {

            let entry = `Blob File ${i++}: ${blob.name}`
            files.push(entry)
        }
        
        responseStatusCode = 200
        responseHeaders = { "Content-Type": "application/json" }
        responseMessage = JSON.stringify({ "files": files })
    }

    context.res = {
        status: responseStatusCode,
        headers: responseHeaders,
        body: responseMessage
    }

};

export default httpTrigger;