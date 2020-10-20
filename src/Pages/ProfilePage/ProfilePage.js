import React from "react";
import QuesContainer from "../../Components/QuesContainer/QuesContainer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { courses } from "../../courses";
import "./profilepage.css";

class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			courses: courses,
			checked: [],
		};
	}

	componentDidMount() {
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
				} else {
					this.setState({ checked: data.checked }, () => {
						window.localStorage.setItem("checked", data.checked);
					});
				}
			});
	}

	render() {
		let array = this.state.courses.filter((i, j) => {
			return i.type === "array" || i.type === "matrix";
		});
		let string = this.state.courses.filter((i, j) => {
			return i.type === "string";
		});
		let ss = this.state.courses.filter((i, j) => {
			return i.type === "searching & sorting";
		});
		let linkedlist = this.state.courses.filter((i, j) => {
			return i.type === "linkedlist";
		});
		let bt = this.state.courses.filter((i, j) => {
			return i.type === "binary trees" || i.type === "binary search trees";
		});
		let greedy = this.state.courses.filter((i, j) => {
			return i.type === "greedy";
		});
		let backtracking = this.state.courses.filter((i, j) => {
			return i.type === "backtracking";
		});
		let sq = this.state.courses.filter((i, j) => {
			return i.type === "stacks & queues";
		});
		let heap = this.state.courses.filter((i, j) => {
			return i.type === "heap";
		});
		let graphtrie = this.state.courses.filter((i, j) => {
			return i.type === "graph" || i.type === "trie";
		});
		let dp = this.state.courses.filter((i, j) => {
			return i.type === "dynamic programming";
		});
		let bm = this.state.courses.filter((i, j) => {
			return i.type === "bit manipulation";
		});

		let quesArr = [
			array,
			string,
			ss,
			linkedlist,
			bt,
			greedy,
			backtracking,
			sq,
			heap,
			graphtrie,
			dp,
			bm,
		];
		let ids = [
			"array",
			"string",
			"ss",
			"linkedlist",
			"bt",
			"greedy",
			"backtracking",
			"sq",
			"heap",
			"graphtrie",
			"dp",
			"bm",
		];
		let typeFullForms = [
			"Arrays",
			"Strings",
			"Searching & Sorting",
			"Linked List",
			"Binary Trees",
			"Greedy",
			"Backtracking",
			"Stacks and Queues",
			"Heap",
			"Graphs and Tries",
			"Dynamic Programming",
			"Bit Manipulation",
		];

		return (
			<div className="main-container">
				<Sidebar ids={ids} headings={typeFullForms} />
				{quesArr.map((i, j) => {
					return (
						<QuesContainer
							id={ids[j]}
							key={(j + 1) * 1000}
							type={typeFullForms[j]}
							questions={i}
							checked={this.state.checked}
						/>
					);
				})}
			</div>
		);
	}
}

export default ProfilePage;
