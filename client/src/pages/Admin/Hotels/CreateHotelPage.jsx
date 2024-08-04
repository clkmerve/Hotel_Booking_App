
import { Button, Form, Input, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateHotelPage = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const citiesResponse = await fetch(`http://localhost:5000/api/cities`);
        if (!citiesResponse.ok) {
          message.error("Veri getirme başarısız.");
          return;
        }

        const citiesData = await citiesResponse.json();
        setCities(citiesData);
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const onFinish = async (values) => {
    const imgValue = values.img ? values.img.split("\n").map((link) => link.trim()).join(",") : '';
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/hotels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          img: imgValue,
        }),
      });
  
      if (response.ok) {
        message.success("Otel başarıyla oluşturuldu.");
        form.resetFields();
        navigate("/admin/hotels");
      } else {
        message.error("Otel oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Otel oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Otel İsmi"
          name="name"
          rules={[{ required: true, message: "Lütfen otel adını girin!" }]}
        >
          <Input placeholder="Otel ismini girin" />
        </Form.Item>
        <Form.Item
          label="Adres"
          name="address"
          rules={[{ required: true, message: "Lütfen adresi girin!" }]}
        >
          <Input placeholder="Adres girin" />
        </Form.Item>
        <Form.Item
          label="Otelin Şehri"
          name="city"
          rules={[{ required: true, message: "Lütfen bir şehir seçin!" }]}
        >
          <Select placeholder="Bir şehir seçin">
            {cities.map((city) => (
              <Select.Option value={city._id} key={city._id}>
                {city.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Otel Açıklaması"
          name="description"
          rules={[{ required: true, message: "Lütfen otel açıklaması girin!" }]}
        >
          <Input.TextArea placeholder="Açıklama giriniz..." autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Form.Item
          label="Otel Görselleri (Linkler)"
          name="img"
          rules={[{ required: true, message: "Lütfen en az 1 görsel linki girin!" }]}
        >
          <Input.TextArea placeholder="Her bir görsel linkini yeni bir satıra yazın." autoSize={{ minRows: 4 }} />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateHotelPage;
