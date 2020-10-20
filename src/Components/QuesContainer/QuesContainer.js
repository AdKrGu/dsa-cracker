import React from "react";
import QuesCard from "../QuesCard/QuesCard";
import "./quescontainer.css";

class QuesContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: "Loading",
		};
	}

	subsetQuestionChecked = (type) => {
		if (type === "check") this.setState({ count: this.state.count + 1 });
		else if (type === "uncheck") this.setState({ count: this.state.count - 1 });
	};

	start = this.props.questions[0].uid;
	end = this.props.questions[this.props.questions.length - 1].uid;

	componentDidUpdate(prevProps) {
		if (prevProps.checked !== this.props.checked) {
			let particularCheckedArr = this.props.checked.filter((i) => {
				return parseInt(i) <= this.end && parseInt(i) >= this.start;
			});

			this.setState({ count: particularCheckedArr.length });
		}
	}

	render() {
		return (
			<div className="ques-container" id={this.props.id}>
				<h2 className="ques-container__type-heading">
					{this.props.type} ({this.state.count}/{this.end - this.start + 1})
				</h2>
				<div className="ques-container__ques-section">
					{this.props.questions.map((i, j) => {
						return (
							<QuesCard
								ques={i}
								key={j}
								id={j * 1000}
								refreshCount={this.subsetQuestionChecked}
								checked={this.props.checked}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default QuesContainer;
