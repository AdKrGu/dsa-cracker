import React from "react";
import { Link } from "react-router-dom";
import "./announcement.css";

const Announcement = () => {
	return (
		<Link to="/upload" style={{ color: "white", textDecoration: "none" }}>
			<p className="announcement">
				Submit video solution of any{" "}
				<span style={{ color: "yellow" }}>Golden</span> question and get
				questions from past FAANG interviews. Click Here!
			</p>
		</Link>
	);
};

export default Announcement;
