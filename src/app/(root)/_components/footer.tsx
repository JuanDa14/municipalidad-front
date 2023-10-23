'use client';

import { Facebook, HourglassIcon, Instagram, LocateIcon, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialsNetworks = [
	{
		href: 'https://www.facebook.com/MuniGuadalupe',
		icon: Facebook,
	},
	{
		href: 'https://twitter.com/muniguadalupe',
		icon: Twitter,
	},
	{
		href: 'https://www.instagram.com/muniguadalupe/',
		icon: Instagram,
	},
];

const socials = [
	{
		label: 'mesadepartes@muniguadalupe.gob.pe',
		icon: Mail,
	},
	{
		label: 'Calle Plaza de Armas 185',
		icon: LocateIcon,
	},
	{
		label: 'Horario: Lunes -Viernes  7:30 am a 3:15 pm  ',
		icon: HourglassIcon,
	},
];

export const Footer = () => {
	return (
		<footer className='mt-28 w-full'>
			<div className='w-full bg-slate-300'>
				<div className='max-w-7xl mx-auto flex items-center justify-between p-10'>
					<div className='space-y-4'>
						<h4 className='text-2xl font-bold'>Contáctenos</h4>
						<div>
							{socials.map((social) => (
								<div className='flex items-center gap-3' key={social.label}>
									<social.icon />
									<span>{social.label}</span>
								</div>
							))}
						</div>
					</div>
					<div>{/* AGregar algo */}</div>
				</div>
			</div>
			<div className='w-full bg-primary-foreground'>
				<div className='max-w-7xl mx-auto flex flex-col gap-5 md:flex-row items-center justify-between p-10'>
					<div>
						<h4>&copy; {new Date().getFullYear()} Municipalidad Distrital de Guadalupe</h4>
					</div>
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
