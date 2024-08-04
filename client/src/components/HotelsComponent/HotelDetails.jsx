
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Tabs from "./Tabs/Tabs";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import "./HotelDetails.css"
import RoomSelect from "./RoomSelect/RoomSelect";
import Review from "./Review/Review";
import { useParams } from 'react-router-dom';

const HotelDetails = () => {
  const { hotelId } = useParams();
  return (
    <section className="single-product">
    <div className="container">
      <div className="single-product-wrapper">
        {/* <Breadcrumb /> */}
        <div className="single-content">
          <main className="site-main">
            <Gallery />
            <Info />
          </main>
        </div>
        <RoomSelect/>
        <Tabs />
        {/* <Review hotelId={hotelId} username="currentUsername" /> username'yi uygun bir şekilde geçmelisiniz */}
 
      </div>
    </div>
  </section>
   
);
}

export default HotelDetails
