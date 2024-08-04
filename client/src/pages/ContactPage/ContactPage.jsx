import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import Header from "../../components/Header";
import { Form, Input, Button, message } from 'antd';
import './ContactPage.css';
import Footer from '../../components/Footer/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceId = 'service_48x9scm'; // EmailJS servis kimliği
      const templateId = 'template_q70l6ne'; // EmailJS şablon kimliği
      const userId = 'enzroDnaXQC-K3UZD'; // EmailJS kullanıcı kimliği

      const templateParams = {
        to_name: formData.fullName,
        from_email: formData.email,
        message: formData.message,
      };

      const response = await emailjs.send(serviceId, templateId, templateParams, userId);

      if (response.status === 200) {
        message.success('E-posta başarıyla gönderildi.');
        setFormData({
          fullName: '',
          email: '',
          message: '',
        });
      } else {
        message.error('E-posta gönderimi başarısız.');
      }
    } catch (error) {
      console.error('E-posta gönderirken hata oluştu:', error);
      message.error('E-posta gönderirken bir hata oluştu. Detaylar için konsolu kontrol edin.');
    }
  };

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-info">
        <h2>İletişim Bilgileri</h2>
        <p>
          Herhangi bir sorunuz veya geri bildiriminiz için bizimle iletişime geçmekten çekinmeyin.
        </p>
        <p><strong>Telefon:</strong> +90 123 456 7890</p>
        <p><strong>Email:</strong> info@rezervasyonsitesi.com</p>
        <img src="./img/images (1).jpg" alt="İletişim" />
      </div>
      <div className="contact-form">
        <h2>İletişim Formu</h2>
        <Form
          name="contact"
          layout="vertical"
          onSubmit={handleFormSubmit}
        >
          <Form.Item
            label="Adınız"
            name="name"
            value={formData.fullName}
            onChange={handleInputChange}
            rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            rules={[{ required: true, message: 'Lütfen email adresinizi giriniz!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mesajınız"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rules={[{ required: true, message: 'Lütfen mesajınızı giriniz!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gönder
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactPage;
