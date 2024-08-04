const SliderItem = () => {
    return (
      <div className="slider-item fade">
        <div className="slider-image">
          <img src="img/slider/slider1.jpg" className="img-fluid" alt="" />
        </div>
        <div className="container">
          <p className="slider-title">Yaz Fırsatları</p>
          <h2 className="slider-heading">%60 Varan İndirimlerle </h2>
          <a href="#" className="btn btn-lg btn-primary">
            Rezervasyon Yap!
          </a>
        </div>
      </div>
    );
  };
  
  export default SliderItem; 