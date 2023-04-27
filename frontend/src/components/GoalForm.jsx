import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createGoal, reset } from "../features/goal/goalSlice";
import Spinner from "./Spinner";

function GoalForm() {
    const [text, setText] = useState("");

    const {isSuccess, isError, message, isLoading} = useSelector(state => state.goal);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast.success(message, {
                position: 'top-center',
                autoClose: 2000,
            });

            dispatch(reset({
                all: false
            }));
        }

        if(isError) {
            toast.error(message, {
                position: 'top-center',
                autoClose: 2000,
            });

            dispatch(reset({
                all: false
            }));
        }

    }, [isSuccess, message, dispatch, isError]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (text === "") {
            return toast.error("Goal cannot be empty", {
                position: "top-center",
                autoClose: 2500,
            });
        }

        dispatch(createGoal({text: text}));
        setText("");
    };

    if(isLoading){
        return <Spinner />
    }
    
    return (
        <section className="form">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="text">Goal : </label>
                    <textarea
                        name="text"
                        id="text"
                        cols="30"
                        rows="3"
                        required
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    ></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
