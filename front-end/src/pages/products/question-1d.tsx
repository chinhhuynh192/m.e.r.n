import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { title } from "process";
import { render } from "@testing-library/react";
import numeral from "numeral";

type Props = {};
type FieldType = {
  discountMin: number;
  discountMax: number;
};
export default function Question_1d({}: Props) {
  const [createForm] = Form.useForm<FieldType>();
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        `/products/questions/1d?discountMin=${values.discountMin}&discountMax=${values.discountMax}`
      );
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return <div >{index + 1}</div>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (text: string, record: any, index: number) => {
        return <span>{record.category.name}</span>;
      },
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: "10%",
      render: (text: string, record: any, index: number) => {
        return <span>{record.supplier.name}</span>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return (
          <div style={{ textAlign: "right" }}>
            {numeral(text).format("$0,0")}
          </div>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        let color = '#4096ff';
        if (record.discount >= 50) {
          color = "#ff4d4f";
        }
        return (
          <div style={{ textAlign: "right", color: color }}>
            {numeral(text).format("0,0.0")}%
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return (
          <div style={{ textAlign: "right" }}>
            {numeral(text).format("$0,0.0")}
          </div>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return (
          <div style={{ textAlign: "right" }}>
            {numeral(text).format("0,0.0")}
          </div>
        );
      },
    },
    
  ];
  return (
    <div style={{ padding: 36 }}>
      <Card title="Tìm kiếm sản phẩm theo mức giảm giá">
        <Form
          form={createForm}
          name="create-category"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ discountMin: 0, discountMax: 0 }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType> label="Discount Min" name="discountMin">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item<FieldType> label="Discount Max" name="discountMax">
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <div style={{ height: 24 }}></div>
      <Card title="Kết quả tìm kiếm">
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          loading={loading}
        />
      </Card>
    </div>
  );
}
