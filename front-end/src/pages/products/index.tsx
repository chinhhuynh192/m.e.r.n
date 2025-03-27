import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import numeral from "numeral";

type Props = {};
type FieldType = {
  name: string;
  categoryId: string;
  supplierId: string;
  price: number;
  discount: number;
  stock: number;
  description?: string;
};

export default function Products({}: Props) {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [createForm] = Form.useForm<FieldType>();
  const [updateForm] = Form.useForm<FieldType>();
  const getProducts = async () => {
    try {
      const response = await axiosClient.get("/products");
      setProducts(response.data);
      console.log(response.data);
      // Update the state with fetched categories
    } catch (err) {
      console.error("Error:", err);
      // Handle error accordingly
    }
  };
  const getCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getSuppliers = async () => {
    try {
      const response = await axiosClient.get("/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  React.useEffect(() => {
    getProducts();
    getCategories();
    getSuppliers();
  }, []);
  const onFinish = async (values: any) => {
    try {
      console.log("success", values);
      // Send request to save category to the server
      await axiosClient.post("/products", values);
      // Update the state with the new category after saving
      getProducts();
      // Reset form after successful save
      createForm.resetFields();
    } catch (err) {
      console.error("Error:", err);
      // Handle error accordingly
    }
  };
  const onDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      getProducts();
      message.success("Product deleted successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onUpdate = async (id: number) => {
    try {
      const values = updateForm.getFieldsValue();
      await axiosClient.patch(`/products/${id}`, values);
      getProducts();
      setSelectedProduct(null);
      message.success("Updated products successfully");
    } catch (err) {
      console.error("Error:", err);
      // Handle error accordingly
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return <div>{index + 1}</div>;
      },
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
      title: "Name",
      dataIndex: "name",
      key: "name",
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
        let color = "#4096ff";
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
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "1%",
      render: (text: any, record: any) => {
        return (
          <Space size="small">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedProduct(record);
                updateForm.setFieldsValue(record);
              }}
            />

            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this product?"
              onConfirm={() => {
                onDelete(record._id);
              }}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div style={{ padding: 36 }}>
      <Card title="Create category" style={{ width: "100%" }}>
        <Form
          form={createForm}
          name="create-category"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            name: "",
            description: "",
            price: 0,
            stock: 0,
            discount: 0,
          }}
          onFinish={onFinish}
        >
          {/* CATEGORY */}
          <Form.Item<FieldType>
            label="Category"
            name="categoryId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a category"
              options={categories.map((item: any) => {
                return {
                  value: item._id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>

          {/* SUPPLIER */}
          <Form.Item<FieldType>
            label="Suppliers"
            name="supplierId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a supplier"
              options={suppliers.map((item: any) => {
                return {
                  value: item._id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>

          {/* NAME */}
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input NAME of product!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PRICE */}
          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          {/* DISCOUNT */}
          <Form.Item<FieldType>
            label="Discount"
            name="discount"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>

          {/* STOCK */}
          <Form.Item<FieldType>
            label="Stock"
            name="stock"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          {/* DESCRIPTION */}
          <Form.Item<FieldType> label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          
          {/* SUBMIT */}
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              CREATE PRODUCT
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="List of categories" style={{ width: "100%", marginTop: 36 }}>
        {/* Display list of categories */}
        <Table dataSource={products} columns={columns} />
      </Card>
      <Modal
        centered
        title="Edit product"
        open={selectedProduct}
        onOk={() => {
          onUpdate(selectedProduct._id);
        }}
        onCancel={() => {
          setSelectedProduct(null);
        }}
      >
        <Form
          form={updateForm}
          name="update-product"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: "", description: "" }}
          onFinish={onFinish}
        >
          {/* CATEGORY */}
          <Form.Item<FieldType>
            label="Category"
            name="categoryId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a category"
              options={categories.map((item: any) => {
                return {
                  value: item._id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          {/* SUPPLIER */}
          <Form.Item<FieldType>
            label="Suppliers"
            name="supplierId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a supplier"
              options={suppliers.map((item: any) => {
                return {
                  value: item._id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          {/* NAME */}
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input NAME of product!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PRICE */}
          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          {/* DISCOUNT */}
          <Form.Item<FieldType>
            label="Discount"
            name="discount"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          {/* STOCK */}
          <Form.Item<FieldType>
            label="Stock"
            name="stock"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          {/* DESCRIPTION */}
          <Form.Item<FieldType> label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
