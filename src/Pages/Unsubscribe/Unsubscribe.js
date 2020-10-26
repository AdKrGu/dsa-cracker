import React from "react";

class Unsubscribe extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			message: "Please Wait while we are confirming",
		};
	}

	componentDidMount() {
		const id = window.location.pathname.split("/")[2];

		fetch("http://localhost:8090/unsubscribe", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message)
					return this.setState({ isLoading: false, message: data.message });
			});
	}

	subscribe = () => {
		this.setState(
			{
				isLoading: true,
			},
			() => {
				const id = window.location.pathname.split("/")[2];
				fetch("http://localhost:8090/subscribe", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ id }),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.message)
							return this.setState({ isLoading: false, message: data.message });
					});
			}
		);
	};

	render() {
		return this.state.isLoading ? (
			<p>Please wait while we are checking!</p>
		) : (
			<div>
				<p>{this.state.message}</p>
				<p>
					You can click{" "}
					<span
						style={{ color: "red", cursor: "pointer" }}
						onClick={this.subscribe}
					>
						here
					</span>{" "}
					to subscribe back to the new releases and announcements!
				</p>
			</div>
		);
	}
}

export default Unsubscribe;
