import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ?? null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// register a new user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = actions.payload.data;
                state.message = actions.payload.message;
            })
            .addCase(register.rejected, (state, actions) => {
                state.isLoading = false;
                state.isError = true;
                state.message = actions.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = actions.payload.data;
                state.message = actions.payload.message;
            })
            .addCase(login.rejected, (state, actions) => {
                state.isLoading = false;
                state.isError = true;
                state.message = actions.payload;
                state.user = null;
            });
    },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
