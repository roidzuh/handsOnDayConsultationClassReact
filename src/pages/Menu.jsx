import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import Layout from "../components/Layout";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [pagination, setPagination] = useState({
    perPage: 0,
    total: 0,
    currentPage: 1,
    previousPage: 0,
    nextPage: 0,
  });

  const getMenuData = () => {
    axios
      .get(`https://api.mudoapi.tech/menus?page=${pagination.currentPage}`)
      .then((res) => {
        setMenus(res.data.data.Data);
        setPagination({
          perPage: res.data.data.PerPage,
          total: res.data.data.total,
          currentPage: res.data.data.currentPage,
          previousPage: res.data.data.previousPage,
          nextPage: res.data.data.nextPage,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.previousPage,
    });
  };

  const handleNext = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.nextPage,
    });
  };

  // pertama mounting
  useEffect(() => {
    getMenuData();
  }, []);

  // ketika ada perubahan currentPage maka mengambil data
  useEffect(() => {
    getMenuData();
  }, [pagination.currentPage]);

  console.log(pagination);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Menu Page</h1>
        <div className={styles.menuList}>
          {menus.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <img
                className={styles.menuImage}
                src={item.imageUrl}
                alt={item.name}
              />
              <div style={{ display: "flex" }}>
                <Link to={`/menu/${item.id}`}>
                  <button className={styles.button}>Detail</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            disabled={pagination.currentPage === 1}
            onClick={handleBack}
            className={styles.button}
          >
            Back
          </button>
          <span>{pagination.currentPage}</span>
          <button
            disabled={!pagination.nextPage}
            onClick={handleNext}
            className={styles.button}
          >
            Next
          </button>
        </div>
        <Link to="/menu/add">
          <button className={styles.button}>Add Menu</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Menu;
