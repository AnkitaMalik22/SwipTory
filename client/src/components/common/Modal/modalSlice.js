import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modal: false,
        modalContent: null,
    },
    reducers: {
        openModal: (state, action) => {
        state.modal = true;
        state.modalContent = action.payload;
        },
        closeModal: (state) => {
        state.modal = false;
        state.modalContent = null;
        },
    },
    });

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
