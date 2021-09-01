import {createAsyncThunk} from "@reduxjs/toolkit";
import {Activity} from "../../infrastructure/model/UserModel";
import {resolveRepository} from "../../di/injection";

export const changeUserStatus = createAsyncThunk(
    "userStatus/changeUserStatus",
    async (activity: Activity, thunkAPI) => {
        return resolveRepository.usersStatus().updateStatus(activity);
    }
);

