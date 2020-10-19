import React from "react";

class QuesCard extends React.Component {
	constructor() {
		super();
		this.state = {
			checked: false,
			checekedList: [],
		};
	}

	handleChange = () => {
		this.setState(
			{
				checked: !this.state.checked,
			},
			() => {
				let link = this.state.checked ? "check" : "uncheck";
				fetch(`https://dsa-cracker-server.herokuapp.com/${link}`, {
					method: "PATCH",
					headers: {
						"content-type": "application/json",
						authorization: window.localStorage.getItem("token"),
					},
					body: JSON.stringify({ checkedQues: this.props.ques.uid }),
				})
					.then((response) => response.json())
					.then(() => {
						return this.props.refreshCount(link);
					});
			}
		);
	};

	componentDidUpdate(prevProps) {
		if (this.props.checked !== prevProps.checked) {
			this.setState({ checekedList: this.props.checked }, () => {
				if (this.state.checekedList.includes(this.props.ques.uid.toString())) {
					this.setState({ checked: true });
				}
			});
		}
	}

	render() {
		return (
			<div>
				{this.props.ques.uid}
				<input
					type="checkbox"
					onChange={this.handleChange}
					checked={this.state.checked}
				/>
				<a
					href={this.props.ques.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					<p>{this.props.ques.title}</p>
				</a>
			</div>
		);
	}
}
export default QuesCard;
