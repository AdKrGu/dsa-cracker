import React from "react";
import "./navbar.css";

function Navbar() {
	return (
		<nav className="navbar">
			<h1 className="nav__logo">Fly Pocket</h1>
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
