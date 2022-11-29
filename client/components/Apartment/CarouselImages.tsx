import { Swiper, SwiperSlide } from 'swiper/react';
import { FC } from 'react';
import Image from 'next/image';
import { BaseURL } from '../../config/BaseURL';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper';

interface CarouselImagesProps {
  images: string[];
}


const CarouselImages: FC<CarouselImagesProps> = ({ images }) => {
  return (
    <div
      className = 'h-full w-full'
    >
      <Swiper
        slidesPerView = {1}
        //spaceBetween={40}

        loop
        modules = {[Autoplay, A11y, Pagination, Navigation]}
        navigation
        /*pagination = {{ clickable: true }}*/
      >
        {
          images.map(image =>
            <SwiperSlide
              key = {image}
            >
              <div
                className = 'relative h-60 w-full'
              >
                <Image
                  src = {BaseURL + image}
                  layout = {'fill'}
                  objectFit = {'contain'}
                />
              </div>
            </SwiperSlide>,
          )
        }
      </Swiper>
    </div>
  );
};

export default CarouselImages;
