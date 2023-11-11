'use client';

import { Facebook } from 'lucide-react';
import Link from 'next/link';

const socialsNetworks = [
	{
		href: 'https://www.facebook.com/media/set/?set=a.104530286544846&type=3',
		icon: Facebook,
	},
];

export const Footer = () => {
	return (
		<footer className='w-full'>
			<div className='w-full bg-blue-700 text-white mt-10'>
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
