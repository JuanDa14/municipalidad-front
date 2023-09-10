'use client';

import { toast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetch = () => {
	const [fetchLoading, setFetchLoading] = useState(false);
	const [isMounted, setIsMounted] = useState(true);
	const { data: session } = useSession();

	const fetchWithAccessToken = async (path: string, options?: RequestInit) => {
		try {
			setFetchLoading(true);

			const res = await fetch(`${BASE_URL}${path}`, {
				...options,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.accessToken}`,
				},
			});

			const data = (await res.json()) as {
				ok: boolean;
				[key: string]: any;
			};

			if (isMounted) {
				if (!data.ok) {
					toast({
						variant: 'destructive',
						title: 'Error',
						description: 'Error al realizar la operación.',
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
			console.log(error);
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

	const fecthWithRefreshToken = async () => {
		try {
			setFetchLoading(true);
			const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.refreshToken}`,
				},
			});
			const data = (await res.json()) as {
				ok: boolean;
				[key: string]: any;
			};
			if (isMounted) {
				if (data.ok) {
					return data;
				} else {
					toast({
						variant: 'destructive',
						title: 'Error',
						description: 'Su sesión ha expirado, inicie sesión nuevamente.',
						duration: 3000,
					});
					return { ok: false };
				}
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
			console.log(error);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Error inesperado, intente nuevamente.',
				duration: 3000,
			});
		} finally {
			setFetchLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

	return { fetchLoading, fetchWithAccessToken, fecthWithRefreshToken };
};
