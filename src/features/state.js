import { createSlice } from '@reduxjs/toolkit'

export const previewSlice = createSlice({
  name: 'mainState',
  initialState: {
    value: {
        expend: 0,
        income: 0,
        categoryExpendTop5: [],
        recentRecords: [],
    }
  },
  reducers: {
    setExpend: (state, action) => {
        state.value.expend = action.payload
        },
    setIncome: (state, action) => {
        state.value.income = action.payload
        },
    setCategoryExpendTop5: (state, action) => {
        state.value.categoryExpendTop5 = action.payload
        },
    setRecentRecords: (state, action) => {
        state.value.recentRecords = action.payload
        }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { setExpend, setIncome, setRecentRecords, setCategoryExpendTop5 } = previewSlice.actions

export default previewSlice.reducer