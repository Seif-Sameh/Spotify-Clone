import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk('getCategories', async (access_token) => {
    const url = `https://api.spotify.com/v1/browse/categories?limit=50`
    const header = `Bearer ${access_token}`
    const categories = await fetch(url, {
        headers: {
            Authorization: header
        }
    }).then(
        res => (res.json())
    )
    return categories
},)


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            const categories = {...action.payload.categories}
            const items = categories && categories.items
            return items
        })
    }
})

export default categoriesSlice.reducer