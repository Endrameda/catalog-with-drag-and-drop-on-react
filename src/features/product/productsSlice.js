import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name : 'products',
    initialState : [],
    reducers : {
        setProducts (state, action) {
            action.payload.forEach((item) => {
                state.push(item)
            })
        }
    }
})

export const { setProducts } = productsSlice.actions

export const selectProducts = state => state.products

export default productsSlice.reducer