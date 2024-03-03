import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MenuDetail.module.css";
import Navbar from "../components/Navbar";

const MenuDetail = () => {
  const [menu, setMenu] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getMenuDetail = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${id}`)
      .then((res) => setMenu(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`https://api.mudoapi.tech/menu/${id}`, config)
      .then(() => {
        alert(`${menu.name} deleted successfully`);
        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    navigate(`/menu/edit/${id}`);
  };

  useEffect(() => {
    getMenuDetail();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Menu Details</h1>
        <div className={styles.card}>
          <img className={styles.image} src={menu?.imageUrl} alt={menu?.name} />
          <div className={styles.cardContent}>
            <h2 className={styles.subtitle}>{menu?.name}</h2>
            <p className={styles.description}>{menu?.description}</p>
            <h3 className={styles.type}>{menu?.type}</h3>
            <h4 className={styles.price}>{menu?.priceFormatted}</h4>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleEdit}>
                Edit
              </button>
              <button className={styles.button} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDetail;
