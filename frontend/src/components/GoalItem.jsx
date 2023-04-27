import { useDispatch } from "react-redux";
import {deleteGoal} from "../features/goal/goalSlice";

function GoalItem({ goal }) {
    const dispatch = useDispatch();

    const deleteHandler = (goal) => {
        dispatch(deleteGoal(goal._id));
    }
    
    return (
        <div className="goal">
            <div>{new Date(goal.createdAt).toLocaleString("en-Us")}</div>
            <div>{goal.text}</div>
            <button className="close" onClick={() => deleteHandler(goal)}>
                X
            </button>
        </div>
    );
}

export default GoalItem;
