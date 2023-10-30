'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const imagesCarousel = [
	{
		src: '/slide1.jpg',
	},
	{
		src: '/slide2.jpg',
	},

	{
		src: '/slide7.jpg',
	},
];

export const Carousel = () => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
			slidesPerView={1}
			spaceBetween={10}
			loop={true}
			autoplay={true}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
		>
			{imagesCarousel.map((image, i) => (
				<SwiperSlide key={i}>
					<Image
						src={image.src}
						className='object-cover object-center'
						alt={`Imagen carrusel ${i}`}
						fill
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
