import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Props = {};
type FieldType = {
  name: string;
  description?: string;
};

export default function Categories({}: Props) {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
  const [createForm] = Form.useForm<FieldType>();
  const [updateForm] = Form.useForm<FieldType>();
  const getCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      setCategories(response.data);
      // Update the state with fetched categories
    } catch (err) {
      console.error("Error:", err);
      // Handle error accordingly
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  const onFinish = async (values: any) => {
    try {
      console.log("success", values);
      // Send request to save category to the server
      const response = await axiosClient.post("/categories", values);
      // Update the state with the new category after saving
      getCategories();
      // Reset form after successful save
      createForm.resetFields();
    } catch (err) {
      console.error("Error:", err);
      // Handle error accordingly
    }
  };
  const onDelete = async (id: number) => {
    try {
      await axiosClient.delete(`/categories/${id}`);
      getCategories();
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onUpdate = async (id: number) => {
    try {
      const values = updateForm.getFieldsValue();
      await axiosClient.patch(`/categories/${id}`, values);
      getCategories();
      setSelectedCategory(null);
      message.success("Updated category");
    } catch (err) {
      console.error("Error:", err);
      // Handle error accordingly
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: '1%',
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
                setSelectedCategory(record);
                updateForm.setFieldsValue(record);
              }}
            />

            <Popconfirm
              title="Delete the category"
              description="Are you sure to delete this category?"
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
          initialValues={{ name: "", description: "" }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="List of categories" style={{ width: "100%", marginTop: 36 }}>
        {/* Display list of categories */}
        <Table dataSource={categories} columns={columns} />
      </Card>
      <Modal
        title="edit category"
        open={selectedCategory}
        onOk={() => {
          onUpdate(selectedCategory._id);
        }}
        onCancel={() => {
          setSelectedCategory(null);
        }}
      >
        <Form
          form={updateForm}
          name="update-category"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: "", description: "" }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
