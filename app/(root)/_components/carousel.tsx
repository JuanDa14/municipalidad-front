'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

const imagesCarousel = [
  {
    src: "/slide1.jpg",
  },
  {
    src: "/slide2.jpg",
  },

  {
    src: "/slide7.jpg",
  },
];

export const Carousel = () => {
	const [Loading, setLoading] = useState(true)
	return (
    <>
      {Loading && <Spinner/>}
      <Swiper
        className="shadow-lg"
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          disableOnInteraction: true,
        }}
      >
        {imagesCarousel.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={image.src}
              className="object-cover object-center"
              alt="Picture of the author"
              fill
			  onLoad={()=>{setLoading(false)}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
