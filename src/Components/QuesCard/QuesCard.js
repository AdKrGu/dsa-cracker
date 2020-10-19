import React from "react";
import "./quescard.css";

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
			<div className="ques-card">
				<div className="box">
					<label htmlFor={this.props.ques.uid.toString()} className="noSelect">
						{this.props.ques.link ? (
							<a
								className="ques-link"
								href={this.props.ques.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<p className="ques-title">{this.props.ques.title}</p>
							</a>
						) : (
							<p className="ques-title" title="No Link">
								{this.props.ques.title}
							</p>
						)}
					</label>
					<input
						type="checkbox"
						id={this.props.ques.uid.toString()}
						onChange={this.handleChange}
						checked={this.state.checked}
					/>
					<span className="check"></span>
				</div>
			</div>
		);
	}
}
export default QuesCard;
