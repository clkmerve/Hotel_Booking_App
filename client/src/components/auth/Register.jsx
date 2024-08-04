import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));

        if (data.message === "E-posta adresinize doğrulama linki gönderildi. Doğrulama yaptıktan sonra giriş yapabilirsiniz.") {
          navigate("/login");
        } else {
          message.success("Aktivasyon maili hesabınıza gönderildi. Lütfen mailinizi kontrol edin.");
        }
      } else {
        message.error("Kayıt Başarısız");
      }
    } catch (error) {
      console.log("Kayıt hatası:", error);
    }
  };

  return (
    <div className="full-height">
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-title">Kayıt Ol</h1>
          <Form layout="vertical" onFinish={handleRegister} className="form">
            <Form.Item
              label="Kullanıcı Adı"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input onChange={handleInputChange} name="username" size="large" />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input onChange={handleInputChange} name="email" size="large" />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
                {
                  min: 6,
                  message: "Şifre en az 6 karakter olmalıdır.",
                },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]+$/,
                  message: "Şifre en az bir büyük harf, bir rakam ve bir özel karakter içermelidir.",
                },
              ]}
            >
              <Input.Password onChange={handleInputChange} name="password" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="register-link">
            Bir hesabınız var mı?&nbsp;
            <Link to="/login" className="password-link">
              Şimdi giriş yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
