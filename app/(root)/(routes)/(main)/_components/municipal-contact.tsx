'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Clock, HourglassIcon, LocateIcon, Mail } from 'lucide-react';

const socials = [
	{
		label: 'mesadepartes@muniCPSMP.gob.pe',
		icon: Mail,
	},
	{
		label: 'Jiron Puno Mz. 145 Lt. 30',
		icon: LocateIcon,
	},
	{
		label: 'Horario: Lunes -Viernes  7:30 am a 3:15 pm  ',
		icon: HourglassIcon,
	},
];

export const MunicipalContact = () => {
	return (
		<section id='contacto' className='w-full mt-10'>
			<div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-10 gap-y-10'>
				<div className='space-y-4 w-full'>
					<h4 className='text-xl font-medium'>Contáctenos</h4>
					<div className='flex flex-col gap-2'>
						{socials.map((social) => (
							<div className='flex items-center gap-3' key={social.label}>
								<div className='bg-blue-700 rounded-full p-1'>
									<social.icon size={25} className='text-white' />
								</div>
								<p className='text-sm capitalize'>{social.label}</p>
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<div>
						<h4 className='font-medium'>CONVOCATORIA Nª 03-2023-MDG</h4>
						<Badge className='bg-blue-700'>
							<Clock className='h-4 w-4' />
							<span className='ml-2'>{format(new Date(), 'dd/MM/yyyy')}</span>
						</Badge>
					</div>
					<Separator />
					<div>
						<h4 className='font-medium'>CONVOCATORIA Nª 02-2023-MDG</h4>
						<Badge className='bg-blue-700'>
							<Clock className='h-4 w-4' />
							<span className='ml-2'>{format(new Date(), 'dd/MM/yyyy')}</span>
						</Badge>
					</div>
					<Separator />
					<div>
						<h4 className='font-medium'>Mesa de partes digital</h4>
						<Badge className='bg-blue-700'>
							<Clock className='h-4 w-4' />
							<span className='ml-2'>{format(new Date(), 'dd/MM/yyyy')}</span>
						</Badge>
					</div>
				</div>
			</div>
		</section>
	);
};
