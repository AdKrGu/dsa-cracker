import React from "react";
import "./announcement.css";

const Announcement = () => {
	return (
		<div>
			{window.location.pathname === "/profile" ? (
				<a href="/upload" style={{ color: "white", textDecoration: "none" }}>
					<p className="announcement">
						Submit video solution of any{" "}
						<span style={{ color: "yellow" }}>Golden</span> question and get
						questions from past FAANG interviews. Click Here!
					</p>
				</a>
			) : null}
		</div>
	);
};

export default Announcement;
