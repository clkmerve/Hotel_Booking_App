import React from 'react'
import Header from '../components/Header'
import City from '../components/Cities/City'
import Footer from '../components/Footer/Footer';

const CityMainPage = () => {
  return (
    <div>
      <Header/>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Şehirler</h2>

      <City/>
      <Footer/>
    </div>
  )
}

export default CityMainPage
