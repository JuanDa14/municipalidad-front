'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { toast } from '@/components/ui/use-toast';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetch = () => {
	const [fetchLoading, setFetchLoading] = useState(false);
	const [isMounted, setIsMounted] = useState(true);
	const { data: session } = useSession();

	const fetchWithToken = async (path: string, options?: RequestInit) => {
		try {
			setFetchLoading(true);

			const res = await fetch(`${BASE_URL}${path}`, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						path === '/auth/refresh-token' ? session?.refreshToken : session?.accessToken
					}`,
				},
			});

			const data = (await res.json()) as {
				ok: boolean;
				[key: string]: any;
			};

			if (isMounted) {
				if (!data.ok) {
					const message = data.errors[0].msg || 'Error inesperado, intente nuevamente.';
					toast({
						variant: 'destructive',
						title: 'Error',
						description: message,
						duration: 3000,
					});
				} else {
					if (
						options?.method?.toLocaleUpperCase() === 'DELETE' ||
						options?.method?.toLocaleLowerCase() === 'POST' ||
						options?.method?.toLocaleUpperCase() === 'PUT'
					) {
						toast({
							title: 'Éxito',
							description: 'Operación realizada con éxito.',
							duration: 3000,
						});
					}
				}
				return data;
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Error inesperado, intente nuevamente.',
					duration: 3000,
				});
				return { ok: false };
			}
		} catch (error) {
			console.log('[ERROR USEFETCH]', error);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Error inesperado, intente nuevamente.',
				duration: 3000,
			});
			return { ok: false };
		} finally {
			setFetchLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

	return { fetchLoading, fetchWithToken };
};
