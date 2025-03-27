import React, { Children } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Categories from "./pages/categories";
import Question_1d from "./pages/products/question-1d";
import Home from "./pages/home";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  DatabaseOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Products from "./pages/products";
import Orders from "./pages/orders";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/management/categories",
        element: <Categories />,
      },
      {
        path: "/report/products/discount",
        element: <Question_1d />,
      },
      {
        path: "/management/products",
        element: <Products />,
      },
      {
        path: "/management/orders",
        element: <Orders />,
      },
    ],
  },
]);
const items = [
  {
    key: "/",
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: "/management",
    label: "Management",
    children: [
      {
        key: "/management/categories",
        label: "Categories",
      },
      {
        key: "/management/products",
        label: "Products",
      },
      {
        key: "/management/orders",
        label: "Orders",
      },
    ],
    icon: <DatabaseOutlined />,
  },
  {
    key: "/report",
    label: "Report",
    children: [
      {
        key: "/report/products",
        label: "Products",
        children: [
          {
            key: "/report/products/discount",
            label: "Discount",
          },
          {
            key: "/report/products/stock",
            label: "Stock",
          },
        ],
      },
    ],
    icon: <FileOutlined />,
  },
];
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
function Root() {
  const navigate = useNavigate();
  let location = useLocation();
  console.log(location.pathname);

  return (
    <React.Fragment>
      <Layout>
        <Layout.Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
            onClick={(item) => {
              console.log(item);
              navigate(item.key);
            }}
          />
        </Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </React.Fragment>
  );
}

export default App;
