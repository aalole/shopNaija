import React, { useState, useEffect } from "react";
// import products from "../products";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Homescreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className='text-center py-2'> Latest products </h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm='12' md='6' lg='4'>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homescreen;