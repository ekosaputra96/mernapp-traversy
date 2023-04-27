import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
    // state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

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
        }

        if(isSuccess){
            toast.success(message, {
                position: "top-center",
                autoClose: 2500
            });
        }

        if(user){
            navigate("/");
        }

        dispatch(reset());

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
        
        if (password !== password2) {
            return toast.error("Password does not match", {
                position: "top-center",
                autoClose: 2500,
                closeOnClick: true,
            });
        }
        
        dispatch(register({
            name,
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
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                            required
                            autoComplete="none"
                        />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Enter your confirmation password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
