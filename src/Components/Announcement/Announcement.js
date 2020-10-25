import React from "react";
import "./announcement.css";
import { Link } from "react-router-dom";

const Announcement = () => {
	return (
		<div>
			{window.location.pathname === "/profile" ? (
				<Link to="/upload" style={{ color: "white", textDecoration: "none" }}>
					<p className="announcement">
						Submit video solution of any{" "}
						<span style={{ color: "yellow" }}>Golden</span> question and get
						questions from past FAANG interviews. Click Here!
					</p>
				</Link>
			) : null}
		</div>
	);
};

export default Announcement;
