import React from "react";
import "./card.css";

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.details._id,
			password: "whatsup!",
			passType: "password",
			reference: this.props.details.reference,
			title: this.props.details.title,
			description: this.props.details.description,
			isDisabled: true,
			addedOn: this.props.details.addedOn,
			edit: false,
		};
	}

	handlePassword = () => {
		if (this.state.passType === "text")
			return this.setState({ passType: "password", password: "whatsup!" });
		this.setState({ password: "loading!", passType: "text" }, () => {
			fetch(`https://flypocket-server.herokuapp.com/card/${this.state.id}`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					authorization: "Bearer " + window.localStorage.getItem("token"),
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						alert(data.error);
						return this.setState({ passType: "password" });
					}
					this.setState({ password: data.message, passType: "text" });
				});
		});
	};

	handleDelete = () => {
		const answer = window.confirm("Are You Sure You To Delete Card?");
		if (answer) {
			fetch(`https://flypocket-server.herokuapp.com/card/${this.state.id}`, {
				method: "delete",
				headers: {
					"content-type": "application/json",
					authorization: "Bearer " + window.localStorage.getItem("token"),
				},
			})
				.then((response) => response.json())
				.then((data) => {
					alert(data.error);
					window.location.reload();
				});
		}
	};

	render() {
		return (
			<div className="profilepage__form-div">
				<div className="card__buttons">
					<span onClick={this.handlePassword}>
						{this.state.passType === "password"
							? "Show Password"
							: "Hide Password"}
					</span>
					<span>
						<i style={{ fontSize: "24px" }} className="fa">
							&#xf044;
						</i>
					</span>
					<span>
						<i
							style={{ fontSize: "24px" }}
							onClick={this.handleDelete}
							className="fa"
						>
							&#xf014;
						</i>
					</span>
				</div>
				<h1 className="profile-form__heading">{this.state.title}</h1>
				<input
					disabled={this.state.isDisabled}
					className="profile-form__input"
					placeholder="Email/Website"
					type="email"
					name="email"
					onChange={this.handleChange}
					value={this.state.reference}
				/>
				<input
					disabled={this.state.isDisabled}
					className="profile-form__input"
					placeholder="Password"
					type={this.state.passType}
					name="password"
					onChange={this.handleChange}
					value={this.state.password}
				/>
				<p className="profile-form__change">{this.state.description}</p>
			</div>
		);
	}
}

export default Card;
