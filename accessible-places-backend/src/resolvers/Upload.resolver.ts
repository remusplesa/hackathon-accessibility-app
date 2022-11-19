import { Resolver, Query, Arg, ObjectType, Field } from 'type-graphql';
import * as storage from '@azure/storage-blob';

const accountname = process.env.AZURE_BLOB_ACCOUNT_NAME;
const key = process.env.AZURE_BLOB_KEY;
const containerName = process.env.AZURE_BLOB_CONTAINER;

const credentials = new storage.StorageSharedKeyCredential(accountname, key);
const blobServiceClient = new storage.BlobServiceClient(
  `https://${accountname}.blob.core.windows.net`,
  credentials
);
const client = blobServiceClient.getContainerClient(containerName);

@ObjectType()
export class UploadURL {
  @Field()
  url: string;
}

@Resolver(UploadURL)
class UploadResolver {
  @Query((returns) => UploadURL)
  async getUploadLink(
    @Arg('fileName') fileName: string
  ): Promise<UploadURL | null> {
    // TODO verify the login status (?)

    // If you are looking to upload the Blob using the signedURL,
    // don't forget to add `x-ms-blob-type: BlockBlob` in the
    // request header, otherwise it will fail.

    const blobClient = client.getBlobClient(fileName);

    const blobSAS = storage
      .generateBlobSASQueryParameters(
        {
          containerName,
          blobName: fileName,
          permissions: storage.BlobSASPermissions.parse('c'),
          startsOn: new Date(),
          expiresOn: new Date(new Date().valueOf() + 3600),
        },
        credentials
      )
      .toString();

    const sasUrl = blobClient.url + '?' + blobSAS;

    return { url: sasUrl };
  }
}

export default UploadResolver;
