import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { userLoginReducer, registerUserReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer'
import cartReducer from "./reducers/cartReducer";
import { updateUserProfile } from "./actions/userActions";

const itemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  loginUser: userLoginReducer,
  registerUser: registerUserReducer,
  user: userDetailsReducer,
  userProfileUpdate: updateUserProfile
});

const initialState = {
  cart: { cartItems: itemsFromStorage },
  loginUser: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
