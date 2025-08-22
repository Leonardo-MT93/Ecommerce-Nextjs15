"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import './slideshow.css';
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export default function ProductSlideShow({ images, title, className }: Props) {

    return (
        <div className={className}>
            <div className="w-full aspect-square max-w-[500px] mx-auto">
                <Swiper
                    style={{
                        width: "100%",
                        height: "100%",
                    } as React.CSSProperties}
                    pagination={true}
                    autoplay={{
                        delay: 3000,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper2"
                >
                    {
                        images.map(image => (
                            <SwiperSlide key={image}>
                                <Image
                                    className="object-cover"
                                    src={`/products/${image}`} 
                                    alt={title} 
                                    width={500} 
                                    height={500}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>

    )
}