import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(props) {
	const [width, setWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

	return (
		<div className="navbar-container">
			<nav className="navbar">
				{window.location.pathname === "/profile" ? (
					<span
						style={{ fontSize: "25px", cursor: "pointer" }}
						onClick={props.openSidebar}
					>
						&#9776;
					</span>
				) : null}

				<Link to="/" style={{ textDecoration: "none" }}>
					<h2 className="nav__logo">{width > 500 ? "code n coffee" : "cnc"}</h2>
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
		</div>
	);
}

export default Navbar;
