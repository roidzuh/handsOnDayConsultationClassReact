import styled from "styled-components";
import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const AddMenu = () => {
  const [menu, setMenu] = useState({
    name: "",
    description: "",
    type: "",
    imageUrl: "",
    price: "",
  });
  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
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
      type: menu.type,
      imageUrl: menu.imageUrl,
      price: parseInt(menu.price),
    };

    axios
      .post("https://api.mudoapi.tech/menu", payload, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <h1>Add Menu</h1>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input onChange={handleChange} type="text" name="name" />
        <Label htmlFor="description">Description</Label>
        <Input onChange={handleChange} type="text" name="description" />
        <Label htmlFor="type">Type</Label>
        <Select onChange={handleChange} name="type" id="">
          <option>Select Type </option>
          <option value="main-dish">Main-Dish</option>
          <option value="beverage">Beverage</option>
        </Select>
        <Label htmlFor="imageUrl">ImageUrl</Label>
        <Input onChange={handleChange} type="text" name="imageUrl" />
        <Label htmlFor="price">Price</Label>
        <Input onChange={handleChange} type="number" name="price" />
        <Button type="submit">Add Menu</Button>
      </FormContainer>
    </Layout>
  );
};

export default AddMenu;
