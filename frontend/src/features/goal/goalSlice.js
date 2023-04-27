import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

// create new goal
export const createGoal = createAsyncThunk(
    "goal/createGoal",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.createGoal(goalData, token);
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

// get all goals
export const getAllGoals = createAsyncThunk(
    "goal/getAllGoals",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.getAllGoals(token);
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

// delete goal
export const deleteGoal = createAsyncThunk(
    "goal/deleteGoal",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.deleteGoal(id, token);
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

const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state, actions) => {
            state.goals = actions.payload.all ? [] : state.goals;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, actions) => {
                state.goals.push(actions.payload.data);
                state.isLoading = false;
                state.isSuccess = true;
                state.message = actions.payload.message;
            })
            .addCase(createGoal.rejected, (state, actions) => {
                state.isError = true;
                state.isLoading = false;
                state.message = actions.payload
            })
            .addCase(getAllGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllGoals.fulfilled, (state, actions) => {
                state.goals = actions.payload.data;
                state.isLoading = false;
            })
            .addCase(getAllGoals.rejected, (state, actions) => {
                state.isError = true;
                state.isLoading = false;
                state.message = actions.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, actions) => {
                state.goals = state.goals.filter(goal => goal._id !== actions.payload.data._id);
                state.isLoading = false;
                state.isSuccess = true;
                state.message = actions.payload.message;
            })
            .addCase(deleteGoal.rejected, (state, actions) => {
                state.isError = true;
                state.isLoading = false;
                state.message = actions.payload
            });
    },
});

export const {reset} = goalSlice.actions;

export default goalSlice.reducer;
