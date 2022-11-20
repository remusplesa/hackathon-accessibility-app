import { Resolver, Query, Arg, ObjectType, Field, Ctx } from 'type-graphql';
import * as storage from '@azure/storage-blob';
import { ServerContext } from '../types';

@ObjectType()
export class UploadURL {
  @Field()
  url: string;
}

@Resolver(UploadURL)
class UploadResolver {
  @Query((returns) => UploadURL)
  async getUploadLink(
    @Ctx() context: ServerContext,
    @Arg('fileName') fileName: string,
  ): Promise<UploadURL | null> {
    if (!context.isLoggedIn) {
      throw Error('Wrong credentials for the API')
    }

    // If you are looking to upload the Blob using the signedURL,
    // don't forget to add `x-ms-blob-type: BlockBlob` in the
    // request header, otherwise it will fail.

    const blobClient = context.client.getBlobClient(fileName);

    const blobSAS = storage
      .generateBlobSASQueryParameters(
        {
          containerName: context.containerName,
          blobName: fileName,
          permissions: storage.BlobSASPermissions.parse('cw'),
          startsOn: new Date(),
          expiresOn: new Date(new Date().valueOf() + context.linkTTL),
        },
        context.credentials
      ).toString();

    const sasUrl = blobClient.url + '?' + blobSAS;

    return { url: sasUrl };
  }
}

export default UploadResolver;
