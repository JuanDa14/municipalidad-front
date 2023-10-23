import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const handleAuth = async () => {
	const session = await getServerSession(authOptions);

	if (!session?.user._id) {
		throw new Error('Not authenticated');
	}

	return { userId: session.user._id };
};

export const ourFileRouter = {
	requestAttachment: f(['pdf'])
		.middleware(() => handleAuth())
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
