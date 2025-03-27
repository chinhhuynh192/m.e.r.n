import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import "@ant-design/v5-patch-for-react-19";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import numeral from "numeral";

type Props = {};
type FieldType = {
  customerId: string;
  employeeId: string;
  status: string;
  paymentType: string;
  shippedDate?: string;
  shippingCity?: string;
  shippingAddress?: string;
  description?: string;
};

export default function Orders({}: Props) {
  const [createForm] = Form.useForm<FieldType>();
  const [updateForm] = Form.useForm<FieldType>();
  const [orders, setOrders] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  const [selectedOrderToAddOrderDetails, setSelectedOrderToAddOrderDetails] =
    React.useState<any>(null);
  const [products, setProducts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState<any>([]);
  const [customers, setCustomer] = React.useState([]);
  const [employees, setEmployee] = React.useState([]);
  const getOrders = async () => {
    try {
      const response = await axiosClient.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getCustomer = async () => {
    try {
      const response = await axiosClient.get("/customers");
      setCustomer(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getEmployee = async () => {
    try {
      const response = await axiosClient.get("/employees");
      setEmployee(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  React.useEffect(() => {
    getCustomer();
    getEmployee();
    getOrders();
  }, []);
  const onFinish = async (values: FieldType) => {
    try {
      console.log("success", values);
      await axiosClient.post("/orders", values);
      getOrders();
      createForm.resetFields();
      message.success("Orders successfully");
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const onFinishSearchProducts = async (values: any) => {
    try {
      let name = values.name;
      const response = await axiosClient.get(`/products/search?name=${name}`);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {}
  };
  const onDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/orders/${id}`);
      getOrders();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onUpdate = async (values: any) => {
    try {
      console.log("Success:", values);
      await axiosClient.patch(`/orders/${selectedOrder._id}`, values);
      getOrders();
      setSelectedOrder(null);
      message.success("Order updated successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const columns: TableColumnsType<any> = [
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
      title: "Customer",
      dataIndex: "customer",
      key: "category",
      width: "1%",
      children: [
        {
          title: " Name",
          dataIndex: "customer-name",
          key: "customer-name",
          width: "1%",
          render: (text: string, record: any, index: number) => {
            return (
              <div style={{ whiteSpace: "nowrap" }}>
                <Space>
                  <UserOutlined />
                  {record.customer.firstName +
                    " " +
                    record.customer.lastName}{" "}
                </Space>
              </div>
            );
          },
        },
        {
          title: "Phone",
          dataIndex: "customer-phone",
          key: "customer-phone",
          width: "1%",
          render: (text: string, record: any, index: number) => {
            return (
              <div style={{ whiteSpace: "nowrap" }}>
                <Space>
                  <PhoneOutlined />
                  {record.customer.phoneNumber}
                </Space>
              </div>
            );
          },
        },
        {
          title: "Email",
          dataIndex: "customer-email",
          key: "customer-email",
          width: "1%",
          render: (text: string, record: any, index: number) => {
            return (
              <div style={{ whiteSpace: "nowrap" }}>
                <Space>
                  <MailOutlined />
                  {record.customer.email}
                </Space>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: "1%",
      children: [
        {
          title: "Name",
          dataIndex: "employee-name",
          key: "employee-name",
          width: "1%",
          render: (text: string, record: any, index: number) => {
            return (
              <div style={{ whiteSpace: "nowrap" }}>
                <Space>
                  <UserOutlined />
                  {record.employee.firstName +
                    " " +
                    record.employee.lastName}{" "}
                </Space>
              </div>
            );
          },
        },
        {
          title: "Phone",
          dataIndex: "employee-phone",
          key: "employee-phone",
          width: "1%",
          render: (text: string, record: any, index: number) => {
            return (
              <div style={{ whiteSpace: "nowrap" }}>
                <Space>
                  <PhoneOutlined />
                  {record.employee.phoneNumber}
                </Space>
              </div>
            );
          },
        },
        {
          title: "Email",
          dataIndex: "employee-email",
          key: "employee-email",
          width: "1%",
          render: (text: string, record: any, index: number) => {
            return (
              <div style={{ whiteSpace: "nowrap" }}>
                <Space>
                  <MailOutlined />
                  {record.employee.email}
                </Space>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Payment",
      dataIndex: "paymentType",
      key: "paymentType",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return <span>{text}</span>;
      },
    },
    {
      title: () => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            <Space>
              <CalendarOutlined /> Date
            </Space>
          </div>
        );
      },
      dataIndex: "createdDate",
      key: "createdDate",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            {dayjs(text).format("YY MMM DD HH:MM")}
          </div>
        );
      },
    },
    {
      title: "Shipped Date",
      dataIndex: "shippedDate",
      key: "shippedDate",
      width: "1%",
      render: (text: string, record: any, index: number) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            {text ? dayjs(text).format("YY MMM DD HH:MM") : ""}
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
              icon={<FileAddOutlined />}
              onClick={() => {
                setSelectedOrderToAddOrderDetails(record);
              }}
            />
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedOrder(record);
                updateForm.setFieldsValue(record);
              }}
            />

            <Popconfirm
              title="Delete the order"
              description="Are you sure to delete this order?"
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
  const columns_products: TableColumnsType<any> = [
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
      width: "10%",
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
  ];
  return (
    <div style={{ padding: 36 }}>
      <Card title="Create new order" style={{ width: "100%" }}>
        <Form
          name="create-order"
          form={createForm}
          initialValues={{
            status: "WAITING",
            paymentType: "CASH",
            shippedDate: "",
            shippingCity: "",
            shippingAddress: "",
            description: "",
          }}
          onFinish={onFinish}
        >
          {/* CUSTOMER */}
          <Form.Item<FieldType> name="customerId" label="Customer" 
            rules={[{ required: true, message: "Please select Customer!" }]}
            >
            <Select
              placeholder="Select a customer"
              options={customers.map((item: any) => {
                return {
                  value: item._id,
                  label:
                    item.firstName + " " + item.lastName + " - " + item.email,
                };
              })}
            />

            {/* EMPLOYEE */}
          </Form.Item>
          <Form.Item<FieldType> name="employeeId" label="Employee"
            rules={[{ required: true, message: "Please select Employee!" }]}>
            <Select
              placeholder="Select a employee"
              options={employees.map((item: any) => {
                return {
                  value: item._id,
                  label:
                    item.firstName + " " + item.lastName + " - " + item.email,
                };
              })}
            />
          </Form.Item>

          {/* PAYMENT */}
          <Form.Item<FieldType> name="paymentType" label="Payment Type">
            <Select
              placeholder="Select a payment type"
              options={[
                { value: "CASH", label: "Cash" },
                { value: "CREDIT CARD", label: "Credit Card" },
              ]}
            />
          </Form.Item>

          {/* description */}
          <Form.Item<FieldType> name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          {/* SUBMIT */}
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              CREATE ORDER
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="List of orders" style={{ width: "100%", marginTop: 36 }}>
        <Table
          dataSource={orders}
          columns={columns}
          bordered
          scroll={{ x: "100%" }}
        />
      </Card>
      {/* ADD ORDER DETAILS*/}
      <Modal
        title="Add products to order"
        open={selectedOrderToAddOrderDetails}
        onOk={async () => {
          // 1. selectedOrderToAddOrderDetails
          // 2. selectedProducts (quantity = 1)
          try {
            let orderDetails = selectedProducts.map((p: any) => {
              return {
                productId: p._id,
                quantity: 1,
                price: p.price,
                discount: p.discount,
              };
            });

            console.log("orderDetails", orderDetails);

            const result = await axiosClient.patch(
              `/orders/${selectedOrderToAddOrderDetails._id}`,
              {
                orderDetails: orderDetails,
              }
            );

            setSelectedOrderToAddOrderDetails(null);
            setSelectedProducts([]);
            message.success("Add products to order successfully!");
          } catch (error) {
            console.log("Error:", error);
          }
        }}
        okText="Add to order"
        onCancel={() => {
          setSelectedOrderToAddOrderDetails(null);
        }}
        width={800}
      >
        <Form
          name="search-product"
          layout="inline"
          onFinish={onFinishSearchProducts}
        >
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowKey="_id"
          dataSource={products}
          columns={columns_products}
          scroll={{ x: "100%" }}
          rowSelection={{
            type: "checkbox",

            onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
              console.log(selectedRowKeys)
              setSelectedProducts(selectedRows);
            },
          }}
        />
      </Modal>

      {/* EDIT ORDER */}
      <Modal
        title="Edit order"
        open={selectedOrder}
        onOk={() => {
          updateForm.submit();
        }}
        okText="Update"
        onCancel={() => {
          setSelectedOrder(null);
        }}
      >
        <Form
          form={updateForm}
          name="update-order"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onUpdate}
        >
          {/* CUSTOMER */}
          <Form.Item<FieldType> name="customerId" label="Customer">
            <Select
              disabled
              placeholder="Select a customer"
              options={customers.map((item: any) => {
                return {
                  value: item._id,
                  label:
                    item.firstName + " " + item.lastName + " - " + item.email,
                };
              })}
            />

            {/* EMPLOYEE */}
          </Form.Item>
          <Form.Item<FieldType> name="employeeId" label="Employee">
            <Select
              placeholder="Select a employee"
              options={employees.map((item: any) => {
                return {
                  value: item._id,
                  label:
                    item.firstName + " " + item.lastName + " - " + item.email,
                };
              })}
            />
          </Form.Item>
          {/* STATUS */}
          <Form.Item<FieldType> name="status" label="Status">
            <Select
              placeholder="Select a status"
              options={[
                { value: "WAITING", label: "Waiting" },
                { value: "SHIPPING", label: "Shipping" },
                { value: "COMPLETED", label: "Completed" },
              ]}
            />
          </Form.Item>
          {/* PAYMENT */}
          <Form.Item<FieldType> name="paymentType" label="Payment Type">
            <Select
              placeholder="Select a payment type"
              options={[
                { value: "CASH", label: "Cash" },
                { value: "CREDIT CARD", label: "Credit Card" },
              ]}
            />
          </Form.Item>
          {/* shippingAddress */}
          <Form.Item<FieldType> name="shippingAddress" label="Shipping Address">
            <Input.TextArea rows={2} />
          </Form.Item>
          {/* shippingDate */}
          <Form.Item<FieldType> name="shippedDate" label="Shipped Date">
            <DatePicker />
          </Form.Item>
          {/* description */}
          <Form.Item<FieldType> name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
