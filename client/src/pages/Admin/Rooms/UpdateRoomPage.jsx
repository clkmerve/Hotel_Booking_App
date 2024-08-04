import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";

const UpdateRoomPage = () => {
  const { id: roomId } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // Seçilen oteli tutacak state

  useEffect(() => {
    const fetchSingleRoom = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          const imgValue = Array.isArray(data.img) ? data.img.join("\n") : data.img;

          form.setFieldsValue({
            roomName: data.roomName,
            type: data.type,
            description: data.description,
            price: data.price !== undefined ? data.price.toString() : '', // price'ın undefined olup olmadığını kontrol et
            isAvailable: data.isAvailable,
            img: imgValue,
            hotel: data.hotel._id // Oda için ilişkili otel seçimi
          });

          setSelectedHotel(data.hotel._id); // Seçilen oteli state'e ata
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleRoom();
  }, [roomId]);

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
      const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          img: imgValue
        }),
      });

      if (response.ok) {
        message.success("Oda başarıyla güncellendi.");
      } else {
        message.error("Oda güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Oda güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Oda Adı"
          name="roomName"
          rules={[
            {
              required: true,
              message: "Lütfen oda adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Oda Türü"
          name="type"
          rules={[
            {
              required: true,
              message: "Lütfen oda türünü girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Açıklama"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen oda açıklamasını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Otel Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 görsel linki girin!"
            }
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
              message: "Lütfen fiyatı girin!",
            },
          ]}
        >
          <Input type="number" />
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
          <Select
            placeholder="Bir otel seçin"
            value={selectedHotel} // Seçili oteli state'den al
            onChange={(value) => setSelectedHotel(value)} // Oteli seçildiğinde state'e ata
          >
            {hotels.map((hotel) => (
              <Select.Option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateRoomPage;
