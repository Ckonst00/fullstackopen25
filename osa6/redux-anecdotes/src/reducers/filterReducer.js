import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterOnChange(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      return action.payload
    }
  }
})


export const { filterOnChange } = filterSlice.actions
export default filterSlice.reducer