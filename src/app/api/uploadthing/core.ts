import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'fakeId' });

export const appFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(({ req }) => {
      // TODO: replace with next-auth
      const user = auth(req);

      if (!user) throw new UploadThingError('Unauthorized!');

      return { userId: user.id };
    })
    .onUploadComplete(({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
