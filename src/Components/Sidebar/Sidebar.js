import React, { useState, useEffect } from "react";
import "./sidebar.css";

const Sidebar = (props) => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(250);
	}, [props.width]);

	return (
		<div>
			<div
				id="mySidenav"
				className="sidenav"
				style={{ width: width.toString() + "px" }}
			>
				<span className="closebtn" onClick={() => setWidth(0)}>
					&times;
				</span>
				{props.ids.map((i, j) => {
					return (
						<a href={`#${i}`} key={j}>
							{props.headings[j]}
						</a>
					);
				})}
			</div>
		</div>
	);
};
export default Sidebar;
