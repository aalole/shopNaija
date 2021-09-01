import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL,
    MY_ORDER_LIST_RESET
} from '../constants/orderConstant'

const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                isSuccessful: true,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload.data
            }

        default:
            return state
    }
}

const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload.data
            }

        default:
            return state
    }
}

const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                isSuccessful: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

const listMyOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case MY_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload.data
            }
        case MY_ORDER_LIST_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}

export { createOrderReducer, orderDetailsReducer, orderPayReducer, listMyOrdersReducer }