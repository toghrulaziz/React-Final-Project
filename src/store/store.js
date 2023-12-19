import { configureStore } from '@reduxjs/toolkit'
import slice from './reducer'

let myStore = configureStore({
    reducer:{
        goods: slice
    }
})

export default myStore;