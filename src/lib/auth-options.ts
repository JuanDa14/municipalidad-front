import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/interfaces/user';

declare module 'next-auth' {
	interface Session {
		user: User;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: User;
	}
}

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
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
		jwt: async ({ token, user, trigger, session }) => {
			if (trigger === 'update' && session) {
				return {
					...token,
					user: {
						...session.user,
					},
				};
			}
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
				_id: token.user._id,
				name: token.user.name,
				role: {
					_id: token.user.role._id,
					name: token.user.role.name,
				},
				email: token.user.email,
				imageURL: token.user.imageURL,
				state: token.user.state,
				address: token.user.address,
			};

			return session;
		},
	},
	pages: { signIn: '/login', error: '/login' },
};
