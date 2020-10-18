import React from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
	return (
		<nav className="navbar">
			<Link to="/">
				<img src={logo} className="nav__logo" />
			</Link>	

			{window.localStorage.getItem("token") ? (
				<button
					className="nav__login"
					onClick={() => {
						window.localStorage.removeItem("token");
						window.location.href = "/";
					}}
				>
					Log Out
				</button>
			) : (
				""
			)}
		</nav>
	);
}

export default Navbar;
