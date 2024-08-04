import React from "react";
import Header from "../components/Header";
import Campaigns from "../components/Campaigns/Campaigns";
import HomeCity from "../components/Cities/HomeCity";
import Sliders from "../components/Slider/Sliders";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Video from "../components/videopage/Video";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from '../components/Footer/Footer';


const HomePage = () => {
  return (
    <div>
      <Header /> 
      <Video/>
      {/* <Sliders/> */}
      <CampaignSingle/>
      <HomeCity />
     
      <Campaigns/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default HomePage;
