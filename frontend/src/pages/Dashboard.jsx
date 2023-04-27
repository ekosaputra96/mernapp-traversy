import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import {getAllGoals, reset} from "../features/goal/goalSlice"
import GoalItem from "../components/GoalItem";

function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const goals = useSelector((state) => state.goal.goals);
    const [userDetail, setUserDetail] = useState(null);
    const API_URL = process.env.REACT_APP_SERVER_URL + "api/v1/users/";
    const dispatch = useDispatch();

    const getUserDetail = async (user) => {
        try {
            const userDetail = await axios.get(API_URL + "me", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setUserDetail(userDetail.data.data);
        } catch (error) {
            const message =
                error.response.data.message ||
                error.message ||
                error.toString();

            toast.error(message, {
                position: "top-center",
                autoClose: 2500,
            });
        }
    };

    //

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }

        getUserDetail(user);

        dispatch(getAllGoals());
        
        return () => {
            dispatch(reset({
                all: true,
            }));
        };
    }, [user, navigate, dispatch]);

    if(!userDetail){
        return <Spinner/>
    }

    return (
        <>
            <h1>Welcome, {userDetail.name}</h1>
            <div>Dashboard</div>
            <GoalForm />

            <hr />
            <section className="content">
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <GoalItem key={goal._id} goal={goal}/>
                    ))
                ) : (
                    <div>No goals yet</div>
                )}
            </section>
        </>
    );
}

export default Dashboard;
