import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

const initialAxisState = {xAxis: 0, yAxis: 0, zAxis: 0}

const axisesSlice = createSlice({
    name: 'axises',
    initialState: initialAxisState,
    reducers: {
        updateX(state, action) {
            state.xAxis += action.payload
        },
        updateY(state, action) {
            state.yAxis += action.payload
        },
        updateZ(state, action) {
            state.zAxis += action.payload
        }
    }
})

const orientation = configureStore({
    reducer: axisesSlice.reducer
})


export const axisActions = axisesSlice.actions

export default orientation