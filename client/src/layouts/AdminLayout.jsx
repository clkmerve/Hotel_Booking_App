import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  LaptopOutlined,
  RollbackOutlined,
  BarcodeOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider, Header, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Yönetici Paneli",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Şehirler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Şehir Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/cities`);
          },
        },
        {
          key: "4",
          label: "Yeni Şehir Oluştur",
          path: "/admin/cities/create",
          onClick: () => {
            navigate("/admin/cities/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Oteller",
      path: "/",
      children: [
        {
          key: "6",
          label: "Otel Listesi",
          path: "/admin/hotels",
          onClick: () => {
            navigate(`/admin/hotels`);
          },
        },
        {
          key: "7",
          label: "Yeni Otel Oluştur",
          path: "/admin/hotels/create",
          onClick: () => {
            navigate("/admin/hotels/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <LaptopOutlined />,
      label: "Odalar",
      path: "/",
      children: [
        {
          key: "9",
          label: "Oda Listesi",
          path: "/admin/rooms",
          onClick: () => {
            navigate(`/admin/rooms`);
          },
        },
        {
          key: "10",
          label: "Yeni Oda Oluştur",
          path: "/admin/rooms/create",
          onClick: () => {
            navigate("/admin/rooms/create");
          },
        },
      ],
    },
    //
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    // {
    //   key: "12",
    //   icon: <ShoppingCartOutlined />,
    //   label: "Siparişler",
    //   onClick: () => {
    //     navigate(`/admin/orders`);
    //   },
    // },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        navigate(`/`);
      },
    },
  ];

  const getActiveKey = () => {
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  return (
    <div className="admin-layout">
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider width={200} theme="dark">
          <Menu
            mode="vertical"
            style={{
              height: "100%",
            }}
            items={menuItems}
            defaultSelectedKeys={[getActiveKey()]}
          />
        </Sider>
        <Layout>
          {/* <Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <h2></h2>
            </div>
          </Header> */}
          <Content>
            <div
              className="site-layout-background"
              style={{
                padding: "24px 50px",
                minHeight: 360,
              }}
            >
              {children}
             
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.node,
};