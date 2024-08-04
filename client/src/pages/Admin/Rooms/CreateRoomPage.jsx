import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/hotels`);
        if (!response.ok) {
          message.error("Otelleri getirme başarısız.");
          return;
        }
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const onFinish = async (values) => {
    const imgValue = values.img ? values.img.split("\n").map((link) => link.trim()).join(",") : '';

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/rooms`, {
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
        message.success("Oda başarıyla oluşturuldu.");
        form.resetFields();
        navigate("/admin/rooms");
      } else {
        message.error("Oda oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Oda oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Oda İsmi"
          name="roomName"
          rules={[
            {
              required: true,
              message: "Lütfen oda adını girin!",
            },
          ]}
        >
          <Input placeholder="Oda ismini girin" />
        </Form.Item>
        <Form.Item
          label="Oda Tipi"
          name="type"
          rules={[
            {
              required: true,
              message: "Lütfen oda tipini girin!",
            },
          ]}
        >
          <Input placeholder="Oda tipini girin" />
        </Form.Item>
        <Form.Item
          label="Oda Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen oda açıklaması girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Açıklama giriniz..."
            autoSize={{ minRows: 4 }}
          />
          
        </Form.Item>
        <Form.Item
          label="Otel Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 görsel linki girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="price"
          rules={[
            {
              required: true,
              message: "Lütfen oda fiyatını girin!",
            },
          ]}
        >
          <InputNumber placeholder="Fiyatı girin" min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Otel"
          name="hotel"
          rules={[
            {
              required: true,
              message: "Lütfen bir otel seçin!",
            },
          ]}
        >
          <Select placeholder="Bir otel seçin">
            {hotels.map((hotel) => (
              <Select.Option value={hotel._id} key={hotel._id}>
                {hotel.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateRoomPage;
