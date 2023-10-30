import { Separator } from '@/components/ui/separator';
import { MunicipalService } from '@/data/seed';
import Image from 'next/image';

interface MunicipalServiceProps {
	services: MunicipalService[];
}

export const MunicipalServices = ({ services }: MunicipalServiceProps) => {
	return (
		<div id='services' className='space-y-10 bg-muted-foreground/10'>
			<div className='max-w-7xl mx-auto px-10 py-10 space-y-10'>
				<div className='flex flex-col items-center gap-2'>
					<h3 className='text-xl font-medium text-blue-700'>Servicios</h3>
					<p>Te atenderemos de la mejor manera</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
					{services.map((s, i) => (
						<div
							className='flex flex-col items-center bg-white justify-start gap-5 shadow hover:shadow-md hover:cursor-pointer transition'
							key={i}
						>
							<Image
								className='object-cover object-center w-full h-52'
								src={s.image}
								alt={`Imagen de ${s.title}`}
								height={150}
								width={150}
							/>
							<div className='px-4 pb-4'>
								<h4 className='font-medium text-blue-600'>{s.title}</h4>
								<Separator className='mb-3 mt-1' />
								<p className='text-sm'>{s.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
