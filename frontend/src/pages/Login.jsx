import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
    // state formdata
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, isSuccess, user, message } = useSelector(
        (state) => {
            return state.auth;
        }
    );

    useEffect(() => {
        if(isError){
            toast.error(message, {
                position: "top-center",
                autoClose: 2500
            });

            dispatch(reset());
        }

        if(isSuccess){
            toast.success(message, {
                position: "top-center",
                autoClose: 2500
            });

            dispatch(reset());
        }

        if(user){
            navigate("/");
        }

    }, [user, message, isError, isSuccess, navigate, dispatch])

    // onchange callback
    const onChange = (event) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    // onsubmit callback
    const onSubmit = (event) => {
        event.preventDefault();
        
        dispatch(login({
            email,
            password,
        }));
    };

    if(isLoading){
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block" disabled={isLoading}>
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
