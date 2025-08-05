import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notfication',
    initialState: '',
    reducers: {
        notify(state, action) {
            return action.payload
        },
        emptyNotification() {
            return ''
        }
    }
})

export const { notify, emptyNotification } = notificationSlice.actions
export default notificationSlice.reducer