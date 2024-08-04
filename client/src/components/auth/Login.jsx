import { Button, Form, Input, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, message } from "antd";
// import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import "./Login.css"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const handleLogin = async (values) => {
    try {
    //   if (!isRecaptchaVerified) {
    //     message.error("Lütfen ReCAPTCHA doğrulamasını yapınız.");
    //     return;
    //   }

      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş Başarılı");
             // Kullanıcı adını konsola yazdırma
             console.log("Kullanıcı adı:", data.username);
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error("Giriş Başarısız");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    }
  };

  const onChange = () => {
    setIsRecaptchaVerified(true);
  };

  return (
    <div className="full-height">
      <div className="login-container">
     
        <div className="login-form-container">
          <h1 className="login-title">Giriş Yap</h1>
          <Form layout="vertical" onFinish={handleLogin} className="form">
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
              <Input
                className="input"
                onChange={handleInputChange}
                name="email"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password
                className="input"
                onChange={handleInputChange}
                name="password"
                size="large"
              />
            </Form.Item>
            {/* <ReCAPTCHA
              className="recaptcha-container"
              sitekey="6LcKOUMpAAAAAJ5A-Rj0CSQDhImD2SljAR7G9_EN"
              onChange={onChange}
            /> */}
            <Form.Item name="remember" valuePropName="checked">
              <div className="checkbox-container">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link to={"/forgotPassword"} className="password-link">
                  Şifremi Unuttum
                </Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="register-link">
            Henüz bir hesabınız yok mu?{" "}
            <Link to="/register" className="password-link">
              Şimdi kaydol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
