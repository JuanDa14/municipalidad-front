import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
	interface Session {
		accessToken: string;
		user: {
			_id: string;
			name: string;
			role: { _id: string; name: string };
			email: string;
			imageURL: string;
			state: boolean;
		};
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken: string;
		user: {
			_id: string;
			name: string;
			role: { _id: string; name: string };
			email: string;
			imageURL: string;
			state: boolean;
		};
	}
}

export const options: NextAuthOptions = {
	session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const payload = {
					email: credentials.email,
					password: credentials.password,
				};

				const res = await fetch(`${process.env.API_URL}/auth/login`, {
					method: 'POST',
					body: JSON.stringify(payload),
					headers: { 'Content-Type': 'application/json' },
				});
				const user = await res.json();

				if (!res.ok) throw new Error(user.message);

				if (res.ok && user) {
					return user;
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				return {
					...token,
					...user,
				};
			}

			return token;
		},
		session: async ({ session, token }) => {
			session.user = {
				_id: token.user._id as string,
				name: token.user.name as string,
				role: {
					_id: token.user._id as string,
					name: token.user.name as string,
				},
				email: token.user.email as string,
				imageURL: token.user.imageURL as string,
				state: token.user.state as boolean,
			};
			session.accessToken = token.accessToken as string;
			return session;
		},
	},
	pages: { signIn: '/login' },
};
