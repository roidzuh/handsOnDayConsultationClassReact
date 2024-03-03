import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MenuEdit = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState({});
  const navigate = useNavigate();

  const getMenuDetail = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${id}`)
      .then((res) => setMenu(res?.data?.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMenuDetail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      name: menu.name,
      description: menu.description,
      imageUrl: menu.imageUrl,
      type: menu.type,
      price: parseInt(menu.price),
    };

    axios
      .put(`https://api.mudoapi.tech/menu/${id}`, payload, config)
      .then(() => {
        alert(`Menu ${menu.name} updated successfully`);
        navigate(`/menu/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Edit Menu</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={menu.name || ""}
            onChange={handleChange}
            required
          />
          <Label>Description:</Label>
          <TextArea
            name="description"
            value={menu.description || ""}
            onChange={handleChange}
            required
          />
          <Label>Image URL:</Label>
          <Input
            type="text"
            name="imageUrl"
            value={menu.imageUrl || ""}
            onChange={handleChange}
            required
          />
          <Label>Type:</Label>
          <Input
            type="text"
            name="type"
            value={menu.type || ""}
            onChange={handleChange}
            required
          />
          <Label>Price:</Label>
          <Input
            type="number"
            name="price"
            value={menu.price || ""}
            onChange={handleChange}
            required
          />
          <Button type="submit">Update</Button>
        </Form>
      </Container>
    </>
  );
};

export default MenuEdit;
