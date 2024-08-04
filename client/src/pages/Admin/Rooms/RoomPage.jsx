import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Otel Görseli',
            dataIndex: 'img',
            key: 'img',
            render: (imgSrc) => (
                <img
                    src={imgSrc}
                    alt="Image"
                    style={{
                        width: "100px",
                        height: "100px",
                    }}
                />
            )
        },
        {
            title: 'Oda İsmi',
            dataIndex: 'roomName',
            key: 'roomName',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Oda Tipi',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Oda Açıklaması',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Fiyat',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text.toFixed(2)} TL</span>,
        },
        {
            title: 'Otel',
            dataIndex: 'hotelName',
            key: 'hotelName',
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => navigate(`/admin/rooms/update/${record._id}`)}>
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Odayı Sil"
                        description="Odayı silmek istediğinizden emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteRoom(record._id)}
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
                const [roomsResponse, hotelsResponse] = await Promise.all([
                    fetch(`http://localhost:5000/api/rooms`),
                    fetch(`http://localhost:5000/api/hotels`),
                ]);

                if (!roomsResponse.ok || !hotelsResponse.ok) {
                    message.error("Veri getirme başarısız.");
                    return;
                }

                const [roomsData, hotelsData] = await Promise.all([
                    roomsResponse.json(),
                    hotelsResponse.json(),
                ]);

                const roomsWithHotelNames = roomsData.map((room) => {
                    const hotel = hotelsData.find((hotel) => hotel._id === room.hotel);
                    return {
                        ...room,
                        hotelName: hotel ? hotel.name : "Bilinmiyor",
                    };
                });

                setDataSource(roomsWithHotelNames);
            } catch (error) {
                console.log("Veri hatası:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteRoom = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                message.success("Oda başarıyla silindi.");
                setDataSource((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.log("Silme hatası:", error);
        }
    };

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
        />
    );
};

export default RoomPage;
