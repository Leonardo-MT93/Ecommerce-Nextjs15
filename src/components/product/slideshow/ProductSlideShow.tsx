"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';
import { useState } from "react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import Image from "next/image";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export default function ProductSlideShow({ images, title, className }: Props) {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
    return (
        <div className={className}>
            <div className="w-full aspect-square max-w-[600px] mx-auto">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                        width: '100%',
                        height: '100%',
                    } as React.CSSProperties}
                    spaceBetween={10}
                    navigation={true}
                    autoplay={{
                        delay: 2000,
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="mySwiper2"
                >
                    {
                        images.map(image => (
                            <SwiperSlide key={image}>
                                <ProductImage
                                    className="rounded-lg object-cover"
                                    src={image} 
                                    alt={title} 
                                    width={600} 
                                    height={600}
                                />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage
                                className="rounded-lg object-fill"
                                src={image} 
                                alt={title} 
                                width={300} 
                                height={300}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>

    )
}