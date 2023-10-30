'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { MunicipalNew } from '@/data/seed';
import { TimerIcon } from 'lucide-react';
import Link from 'next/link';

interface MunicipalNewProps {
	news: MunicipalNew[];
}

export const MunicipalNews = ({ news }: MunicipalNewProps) => {
	return (
		<div id='news' className='space-y-10'>
			<div className='max-w-7xl mx-auto px-10 py-10 space-y-10'>
				<div className='flex flex-col items-center gap-2'>
					<h3 className='text-xl font-medium'>Ultimas Noticias</h3>
					<p className=' text-muted-foreground'>Gobierno Municipdal de San Jos&eacute;</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
					{news.map((n, i) => (
						<Card key={i}>
							<CardHeader>
								<CardTitle className='text-lg line-clamp-2'>{n.tittle}</CardTitle>
								<CardDescription>
									<div className='flex items-center gap-1'>
										<TimerIcon />
										{n.date}
									</div>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<CardDescription className='line-clamp-6'>{n.description}</CardDescription>
							</CardContent>
							<CardFooter>
								<Link href={n.url} target='_blank' className='w-full'>
									<Button variant={'outline'} className='flex ml-auto'>
										Leer más
									</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};
