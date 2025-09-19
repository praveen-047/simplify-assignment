import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Modal, Form, Input } from "antd";
import "antd/dist/reset.css"; 
import UserCard from "./component/UserCard";
import "./App.css";

function App() {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        
        setUserDetails(response.data.map((u) => ({ ...u, liked: false })));
      } catch (e) {
        console.error("error fetching users:", e);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  
  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    setIsModalOpen(true);
  };

  
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUserDetails((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u))
      );
      setIsModalOpen(false);
      setEditingUser(null);
      form.resetFields();
    } catch (err) {
      // validation failed — do nothing
    }
  };

  
  const handleDelete = (id) => {
    setUserDetails((prev) => prev.filter((u) => u.id !== id));
  };

  
  const handleToggleLike = (id) => {
    setUserDetails((prev) =>
      prev.map((u) => (u.id === id ? { ...u, liked: !u.liked } : u))
    );
  };

  return (
    <div className="app-container">
      {loading ? (
        <div class="spinner loader">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="start" align="top">
          {userDetails.map((user) => (
            <Col xs={24} sm={12} md={8} xl={6} key={user.id}>
              <UserCard
                details={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user.id)}
                onToggleLike={() => handleToggleLike(user.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="Save"
      >
        <hr style={{ border: "1px solid #f0f0f0", padding: "0" }} />
        <Form form={form} layout="horizontal" className="custom-modal-form">
          <Form.Item name="username" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>

        <hr style={{ border: "1px solid #f0f0f0", padding: "0" }} />
      </Modal>
    </div>
  );
}

export default App;
