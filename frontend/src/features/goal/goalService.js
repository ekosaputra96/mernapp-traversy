import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL + "api/v1/goals/"

// create a new goal
const createGoal = async (goalData, token) => {
    const response = await axios.post(API_URL, goalData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

// get alls goals
const getAllGoals = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

// delete goal
const deleteGoal = async (id, token) => {
    const response = await axios.delete(API_URL + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}

const goalService = {
    createGoal,
    getAllGoals,
    deleteGoal
}

export default goalService;