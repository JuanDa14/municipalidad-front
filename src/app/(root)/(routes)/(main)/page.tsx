import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/app/(root)/_components/carousel';

const RootPage = async () => {
	return (
		<div className='h-full w-full'>
			<Carousel />
			<div className='max-w-7xl mt-28 mx-auto space-y-28 px-10'>
				{/* Noticias */}
				<div className='space-y-10'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold'>Noticias</h3>
						<p className='text-xl font-medium'>Gobierno Municipdal</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i}>
								<h4>Titulo de la noticia</h4>
								<span>Fecha</span>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quibusdam,
									voluptatum, voluptas, quia quod quos voluptatem ratione quae nesciunt
									quas fugiat. Quisquam, voluptas aspernatur. Quisquam, voluptas
									aspernatur. Quisquam, voluptas aspernatur.
								</p>
								<Link href={'/noticia'}>
									<Button>Leer más</Button>
								</Link>
							</div>
						))}
					</div>
				</div>
				{/* Servicios */}
				<div className='space-y-10'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold'>Servicios</h3>
						<p className='text-xl font-medium'>Te atenderemos de la mejor manera</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
						{Array.from({ length: 6 }).map((_, i) => (
							<div className='flex items-center gap-5' key={i}>
								<Image
									className='object-cover object-center'
									src={'/placeholder.svg'}
									alt='Picture of the author'
									height={150}
									width={150}
								/>
								<div>
									<h4>Titulo de la noticia</h4>
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
										quibusdam, voluptatum, voluptas, quia quod quos voluptatem ratione
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Mision y Vision */}
				<div className='space-y-10 border'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold'>Mision y Vision</h3>
						<p className='text-xl font-medium'>Nuestro compromiso es con la ciudadania</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						{Array.from({ length: 2 }).map((_, i) => (
							<div className='flex flex-col justify-center items-center gap-5' key={i}>
								<Image
									className='object-cover object-center'
									src={'/placeholder.svg'}
									alt='Picture of the author'
									height={150}
									width={150}
								/>
								<div>
									<h4>Titulo de la noticia</h4>
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
										quibusdam, voluptatum, voluptas, quia quod quos voluptatem ratione
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RootPage;
