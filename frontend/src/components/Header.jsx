import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());

        toast.success("Logout successfully", {
            position: "top-center",
            autoClose: 2500
        });

        navigate("/login");
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">GoalSetter</Link>
            </div>
            {user ? (
                <ul>
                    <li>
                        <button
                            type="button"
                            className="btn"
                            onClick={onLogout}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to="/login">
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <FaSignOutAlt /> Register
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
}

export default Header;
