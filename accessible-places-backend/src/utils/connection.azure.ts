import * as storage from '@azure/storage-blob';

const accountname = 'accessibilityphotos';
const key = 'vgYdqi1HKnTbBJz5MYFwiGeurhkHexewNe4qwYDluZIjFKbl9zKkkoi4BbtwJ1ES8kgbiBTqgCKD';
const containerName = 'photos-container'
const linkTTL = 86400

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
