import React from "react";
import Card from "../../Components/Card/Card";
import "./profilepage.css";
class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			cards: [],
			message: "",
		};
	}

	componentDidMount() {
		if (!window.localStorage.getItem("token"))
			return (window.location.href = "/");
		fetch("https://flypocket-server.herokuapp.com/cards", {
			method: "get",
			headers: {
				"content-type": "application/json",
				authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) return this.setState({ message: data.error });
				this.setState({ cards: data });
			});
	}

	render() {
		return (
			<div className="main-container">
				<div className="card-list">
					{this.state.message ? (
						<h1>{this.state.message}</h1>
					) : (
						this.state.cards.map((i, j) => {
							return <Card key={j} details={i} />;
						})
					)}
				</div>
			</div>
		);
	}
}

export default ProfilePage;
