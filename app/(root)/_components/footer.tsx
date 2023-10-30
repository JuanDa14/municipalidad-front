'use client';

import { Facebook, HourglassIcon, LocateIcon, Mail } from 'lucide-react';
import Link from 'next/link';

const socialsNetworks = [
	{
		href: 'https://www.facebook.com/media/set/?set=a.104530286544846&type=3',
		icon: Facebook,
	},
];

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

export const Footer = () => {
	return (
		<footer className='w-full'>
			<div className='w-full'>
				<div className='max-w-7xl mx-auto flex items-center justify-between p-10'>
					<div className='space-y-4 w-full'>
						<h4 className='text-xl font-medium'>Contáctenos</h4>
						<div>
							{socials.map((social) => (
								<div className='flex items-center gap-3' key={social.label}>
									<social.icon size={25} />
									<p className='text-sm'>{social.label}</p>
								</div>
							))}
						</div>
					</div>
					<div>{/* AGregar algo */}</div>
				</div>
			</div>
			<div className='w-full bg-muted-foreground/10'>
				<div className='max-w-7xl mx-auto flex flex-col gap-5 md:flex-row items-center justify-between p-10'>
					<h4 className='text-center md:text-start'>
						&copy; {new Date().getFullYear()} Municipalidad centro poblado San Mart&iacute;n
						de Porres
					</h4>
					<div className='flex flex-wrap gap-x-3'>
						{socialsNetworks.map((social) => (
							<Link
								href={social.href}
								key={social.href}
								className='hover:scale-125 transition'
							>
								<social.icon />
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};
