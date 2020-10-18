import React from "react";
import { courses } from "../../courses";
import "./profilepage.css";

class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			courses: courses,
		};
	}

	componentDidMount() {
		console.log(this.state.courses);
		if (!window.localStorage.getItem("token"))
			return (window.location.href = "/");

		fetch("https://dsa-cracker-server.herokuapp.com/profile", {
			method: "GET",
			headers: {
				"content-type": "application/json",
				authorization: window.localStorage.getItem("token"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					window.localStorage.removeItem("token");
					return (window.location.href = "/");
				}
			});
	}

	render() {
		return <div className="main-container">
			
		</div>;
	}
}

export default ProfilePage;
