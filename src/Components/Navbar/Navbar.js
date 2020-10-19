import React from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
	return (
		<nav className="navbar">
			<Link to="/">
				<img src={logo} alt="logo" className="nav__logo" />
			</Link>
			{window.location.pathname === "/" ? (
				<a href="#form">
					<button className="nav__login show-form__mobile">Enter</button>
				</a>
			) : (
				<></>			
			)}

			{window.localStorage.getItem("token") ? (
				<button
					className="nav__login"
					onClick={() => {
						window.localStorage.clear();
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
