import React from 'react';
import { Layout } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Hakkımızda</h3>
          <p>
            Biz, sizlere en iyi otel ve oda rezervasyon deneyimini sunmak için buradayız. 
            Misafirlerimize en uygun fiyatlarla en kaliteli konaklama hizmetini sunuyoruz.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Hızlı Linkler</h3>
          <ul>
            <li><a href="/about">Hakkımızda</a></li>
            <li><a href="/contact">İletişim</a></li>
            <li><a href="/terms">Kullanım Şartları</a></li>
            <li><a href="/privacy">Gizlilik Politikası</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Sosyal Medya</h3>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon"><FacebookOutlined /></a>
            <a href="https://twitter.com" className="social-icon"><TwitterOutlined /></a>
            <a href="https://instagram.com" className="social-icon"><InstagramOutlined /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Rezervasyon Sitesi | Tüm Hakları Saklıdır.
      </div>
    </AntFooter>
  );
};

export default Footer;