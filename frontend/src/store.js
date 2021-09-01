import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import {
  userLoginReducer,
  registerUserReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  listUsersReducer,
  deleteUserReducer,
  adminUpdateUserReducer
} from './reducers/userReducer'
import cartReducer from "./reducers/cartReducer";
import { createOrderReducer, orderDetailsReducer, orderPayReducer, listMyOrdersReducer } from './reducers/orderReducer'

const itemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userAddressInLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  loginUser: userLoginReducer,
  registerUser: registerUserReducer,
  user: userDetailsReducer,
  userProfileUpdate: userUpdateProfileReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: listMyOrdersReducer,
  userList: listUsersReducer,
  userDelete: deleteUserReducer,
  adminUpdateUser: adminUpdateUserReducer
});

const initialState = {
  cart: { cartItems: itemsFromStorage, shippingAddress: userAddressInLocalStorage },
  loginUser: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
