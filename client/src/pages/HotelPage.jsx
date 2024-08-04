import React, { useState } from 'react';
import Filters from '../components/Hotel/Filters';
import HotelList from '../components/Hotel/HotelList';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';

const HotelsPage = () => {
  const [filters, setFilters] = useState({
    city: '',
    priceRange: null,
  });

  return (<div>
   <Header/>
    <div className="hotels-page-container">
     
      {/* <Filters filters={filters} setFilters={setFilters} /> */}
      <HotelList filters={filters} />
<Footer/>
    </div></div>
  );
};

export default HotelsPage;
