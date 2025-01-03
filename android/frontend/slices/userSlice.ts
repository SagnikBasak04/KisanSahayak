import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    predictionData: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setPredictionData: (state, action) => {
            state.predictionData = action.payload;
        }
    }
});

export const { setUserData, setPredictionData } = userSlice.actions;

export const selectUser = (state) => state.user.userData;
export const selectPredictionData = (state) => state.user.predictionData;

export default userSlice.reducer;