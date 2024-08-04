import { Button, Form, Input, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateHotelPage = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const hotelId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [citiesResponse, singleHotelResponse] = await Promise.all([
          fetch("http://localhost:5000/api/cities"),
          fetch(`http://localhost:5000/api/hotels/${hotelId}`)
        ]);

        if (!citiesResponse.ok || !singleHotelResponse.ok) {
          message.error("Veri getirme başarısız.");
          return;
        }

        const [citiesData, singleHotelData] = await Promise.all([
          citiesResponse.json(),
          singleHotelResponse.json()
        ]);

        // console.log("Fetched single hotel data:", singleHotelData);

        setCities(citiesData);

        if (singleHotelData) {
          const imgValue = Array.isArray(singleHotelData.img) ? singleHotelData.img.join("\n") : singleHotelData.img;
          form.setFieldsValue({
            name: singleHotelData.name,
            address: singleHotelData.address,
            description: singleHotelData.description,
            img: imgValue,
            city: singleHotelData.city
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId, form]);

  const onFinish = async (values) => {
    const imgValue = values.img ? values.img.split("\n").map((link) => link.trim()).join(",") : '';
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          img: imgValue
        })
      });
      if (response.ok) {
        message.success("Otel başarıyla güncellendi.");
        navigate("/admin/hotels");
      } else {
        message.error("Otel güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Otel güncelleme hatası:", error);
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
          rules={[
            {
              required: true,
              message: "Lütfen otel adını girin!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Adres"
          name="address"
          rules={[
            {
              required: true,
              message: "Lütfen adresi girin!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Otelin Şehri"
          name="city"
          rules={[
            {
              required: true,
              message: "Lütfen bir şehir seçin!"
            }
          ]}
        >
          <Select>
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
          rules={[
            {
              required: true,
              message: "Lütfen otel açıklaması girin!"
            }
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
              message: "Lütfen en az 1 görsel linki girin!"
            }
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" danger>
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateHotelPage;
