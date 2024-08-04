
import { Button, Modal, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Otel Görselleri',
      dataIndex: 'img',
      key: 'img',
      render: (imgArray) => (
        <Space>
          {imgArray && imgArray.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index}`}
              style={{ width: "100px", height: "100px" }}
            />
          ))}
        </Space>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <b>{text}</b>
    },
    {
      title: "Şehir",
      dataIndex: "cityName",
      key: "cityName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            style={{ background: "blue" }}
            onClick={() => navigate(`/admin/hotels/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Oteli Sil"
            description="Oteli silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteHotel(record._id)}
            okButtonProps={{ style: { backgroundColor: 'blue' } }}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [citiesResponse, hotelsResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/cities`),
          fetch(`http://localhost:5000/api/hotels`),
        ]);

        if (!citiesResponse.ok || !hotelsResponse.ok) {
          message.error("Veri getirme başarısız.");
        }

        const [citiesData, hotelsData] = await Promise.all([
          citiesResponse.json(),
          hotelsResponse.json(),
        ]);

        const hotelsWithCities = hotelsData.map((hotel) => {
          const cityId = hotel.city;
          const city = citiesData.find((item) => item._id === cityId);

          return {
            ...hotel,
            cityName: city ? city.name : "",
          };
        });

        setDataSource(hotelsWithCities);
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteHotel = async (hotelId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Otel başarıyla silindi.");
        setDataSource((prevHotels) => prevHotels.filter((hotel) => hotel._id !== hotelId));
      } else {
        message.error("Otel silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Otel silme hatası:", error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ background: "blue", marginBottom: 16 }}
        onClick={() => navigate("/admin/hotels/create")}
      >
        Yeni Otel Ekle
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="_id" loading={loading} />
    </div>
  );
};

export default HotelPage;
