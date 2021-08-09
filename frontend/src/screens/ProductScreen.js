import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((s) => s.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(singleProductDetails(match.params.id));
  }, [dispatch, match]);

  const addtoCartHandler = () => {
    history.push(`/cart/${match.params.id}/qty?=${qty}`);
  };
  return (
    <>
      <Link to='/' className=''>
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((n) => (
                            <option key={n + 1} value={n + 1}>
                              {" "}
                              {n + 1}{" "}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addtoCartHandler}
                      className='btn btn-block'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
