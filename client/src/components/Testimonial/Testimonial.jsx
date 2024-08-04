import React from 'react';
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]
    };

    return (
        <Slider {...settings}>
            <div className='testimonial py-4 px-3'>
                <p>"Bu otel rezervasyon sitesi sayesinde mükemmel bir tatil planladım. Kullanıcı arayüzü çok kullanışlı ve rezervasyon işlemi çok hızlıydı!"</p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava01} className='w-25 h-25 rounded-2' alt="User Avatar" />
                    <div>
                        <h6 className='mb-0 mt-3'>Ahmet Yılmaz</h6>
                        <p>Kullanıcı</p>
                    </div>
                </div>
            </div>
            <div className='testimonial py-4 px-3'>
                <p>"Otel rezervasyonlarını bu site üzerinden yapmak gerçekten çok kolay. Fiyat karşılaştırma özelliği harika!"</p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02} className='w-25 h-25 rounded-2' alt="User Avatar" />
                    <div>
                        <h6 className='mb-0 mt-3'>Ayşe Demir</h6>
                        <p>Kullanıcı</p>
                    </div>
                </div>
            </div>
            <div className='testimonial py-4 px-3'>
                <p>"Bu site üzerinden rezervasyon yapmak gerçekten çok güvenli ve hızlı. Müşteri hizmetleri de çok yardımcı oldu."</p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03} className='w-25 h-25 rounded-2' alt="User Avatar" />
                    <div>
                        <h6 className='mb-0 mt-3'>Mehmet Kaya</h6>
                        <p>Kullanıcı</p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Testimonial;
