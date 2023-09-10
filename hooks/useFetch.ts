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
						options?.method === 'DELETE' ||
						options?.method === 'POST' ||
						options?.method === 'PUT'
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

	useEffect(() => {
		return () => {
			setIsMounted(false);
		};
	}, []);

	return { fetchLoading, fetchWithAccessToken };
};
