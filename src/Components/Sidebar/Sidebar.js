import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = (props) => {
	const [width, setWidth] = useState(0);

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
			<span className="openbtn" onClick={() => setWidth(250)}>
				&#9776;
			</span>
		</div>
	);
};
export default Sidebar;
