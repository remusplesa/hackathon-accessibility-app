import * as storage from '@azure/storage-blob';
import { config } from 'dotenv';

config()
const accountname = process.env.AZURE_BLOB_ACCOUNT_NAME;
const key = process.env.AZURE_BLOB_KEY;
const containerName = process.env.AZURE_BLOB_CONTAINER;
const linkTTL = Number(process.env.AZURE_BLOB_SAS_TTL);

const credentials = new storage.StorageSharedKeyCredential(accountname, key);
const blobServiceClient = new storage.BlobServiceClient(
  `https://${accountname}.blob.core.windows.net`,
  credentials
);
const client = blobServiceClient.getContainerClient(containerName);

export const AzureBlobConn = {
  containerName,
  linkTTL,
  credentials,
  client
}
