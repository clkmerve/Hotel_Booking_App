import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';

const Success = () => {
  return (
    <div className="success-page"> <Header/>
      <div className="container">
       
        <Result
          status="success"
          title="Rezervasyonunuz Başarılı!"
          subTitle="Rezervasyonunuz başarıyla tamamlandı"
          extra={[
            <Link to="/" key="home">
              <Button type="primary" style={{ background: 'blue' }}>
                Ana Sayfa
              </Button>
            </Link>,
          ]}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Success;
