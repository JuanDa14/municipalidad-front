import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				email: {
					label: 'Correo electrónico',
					type: 'text',
					placeholder: 'Ingrese su correo electrónico',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: 'Ingrese su contraseña',
				},
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password)
					throw new Error('Credenciales inválidas');

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
	session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 30 },
	secret: process.env.NEXTAUTH_SECRET,
	pages: { signIn: '/login' },
	callbacks: {
		async session({ session, user, token }) {
			return session;
		},
		async jwt({ token, user, account, profile }) {
			return token;
		},
	},
};
