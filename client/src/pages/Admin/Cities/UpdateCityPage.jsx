import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCityPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const cityId = params.id;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/cities/${cityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Şehir başarıyla güncellendi.");
      } else {
        message.error("Şehir güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Şehir güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCity = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/api/cities/${cityId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            name: data.name,
            country: data.country,
            img: data.img,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCity();
  }, [`http://localhost:5000`, cityId, form]);

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
          label="Ülke İsmi"
          name="country"
          rules={[
            {
              required: true,
              message: "Lütfen şehir adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şehir İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen şehir adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şehir Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen şehir görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCityPage;