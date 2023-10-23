'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const imagesCarousel = [
	{
		href: 'https://www.google.com',
	},
	{
		href: 'https://www.google.com',
	},
	{
		href: 'https://www.google.com',
	},
	{
		href: 'https://www.google.com',
	},
	{
		href: 'https://www.google.com',
	},
];

export const Carousel = () => {
	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={0}
			loop={true}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}
			pagination={{
				clickable: true,
			}}
		>
			{imagesCarousel.map((image, i) => (
				<SwiperSlide key={i}>
					<Image
						src='/prueba.jpg'
						className='object-cover object-center'
						alt='Picture of the author'
						fill
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
