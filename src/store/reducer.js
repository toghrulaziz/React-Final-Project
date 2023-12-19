import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'goods',
    initialState:{
        goodsArray: [],
        myBagArray: [],
        postData: null,
        deleteDataFromBag: null,
        deleteDataFromGoods: null,
        adminEdited: null,
        newGood: null,
        searchResultsAdmin: [],
        error: null,
        searchResultsGoods: [],
        updateCountData: null,
        ordersArray: [],
        postDataToOrders: null
    },
    reducers:{
        getGoods:(state, action) => {
            return { ...state, goodsArray: action.payload}
        },
        getMyBag:(state, action) => {
            return { ...state, myBagArray: action.payload}
        },
        addToBag:(state, action) => {
            return { ...state, postData: action.payload}
        },
        deletedBag:(state, action) => {
            return { ...state, deleteDataFromBag: action.payload}
        },
        deletedGoods:(state, action) => {
            return { ...state, deleteDataFromGoods: action.payload}
        },
        editData:(state, action) => {
            return { ...state, adminEdited: action.payload}
        },
        addToGoods:(state, action) => {
            return { ...state, newGood: action.payload}
        },
        searchGoodsAdmin: (state, action) => {
            return { ...state, searchResultsAdmin: action.payload}
        },
        searchGoodsFailure: (state, action) => {
            return { ...state, error: action.payload}
        },
        searchGoodsGoods: (state, action) => {
            return { ...state, searchResultsGoods: action.payload}
        },
        updateDataforCount: (state, action) => {
            return { ...state, updateCountData: action.payload}
        },
        addToOrders: (state, action) => {
            return { ...state, postDataToOrders: action.payload}
        },
        getOrders: (state, action) => {
            return { ...state, ordersArray: action.payload}
        }
    }
})


export const { getGoods, getMyBag, addToBag, deletedBag, deletedGoods, editData, addToGoods, searchGoodsAdmin, searchGoodsFailure, searchGoodsGoods, updateDataforCount, addToOrders, getOrders} = slice.actions

export default slice.reducer