'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { MunicipalVisianAndMission } from '@/data/seed';
import Image from 'next/image';

interface MunicipalVisionMissionProps {
	municipalVisianAndMissions: MunicipalVisianAndMission[];
}

export const MunicipalVisionMission = ({
	municipalVisianAndMissions,
}: MunicipalVisionMissionProps) => {
	return (
		<section className='space-y-10 p-10 rounded-lg'>
			<div className='text-center flex flex-col gap-2'>
				<h3 className='text-xl font-medium'>Mision y Vision</h3>
				<p className='font-medium text-muted-foreground'>
					Nuestro compromiso es con la ciudadania
				</p>
			</div>
			<div className=''>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					{municipalVisianAndMissions.map((municipal, i) => (
						<Card className='flex flex-col justify-start items-center gap-5' key={i}>
							<CardHeader>
								<Image
									className='object-cover object-center w-40 h-40'
									src={municipal.image}
									alt={`Imagen ${i}`}
									width={160}
									height={160}
								/>
							</CardHeader>
							<div>
								<p className=' text-sm'>{municipal.description}</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
