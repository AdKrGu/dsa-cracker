import React from "react";
import "./uploadsolutionspage.css";
import { storage } from "../../Firebase/config";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Link } from "react-router-dom";

class UploadSolutionsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			url: "",
			loading: false,
			confirmEmail: "",
			quesId: "",
			loadingProgress: 0,
			message: "",
			loader: false,
		};
	}

	upload = (event) => {
		const file = event.target.files[0];
		const uplaodTask = storage().ref(`solutions/${file.name}`).put(file);
		uplaodTask.on(
			"state_changed",
			(snapshot) => {
				this.setState({
					loading: true,
					loadingProgress: Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					),
				});
			},
			(error) => {
				this.setState({
					message: "Error Uploading the Video!",
				});
			},
			() => {
				storage()
					.ref("solutions")
					.child(file.name)
					.getDownloadURL()
					.then((url) => {
						this.setState({ loading: false, url });
					});
			}
		);
	};

	handleChange = (event) => {
		let { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = () => {
		if (!this.state.quesId || !this.state.confirmEmail)
			return this.setState({ message: "Please Fill All the details!" });

		this.setState(
			{
				loader: true,
			},
			() => {
				fetch("https://dsa-cracker-server.herokuapp.com/upload", {
					method: "post",
					headers: {
						"content-type": "application/json",
						Authorization: window.localStorage.getItem("token"),
					},
					body: JSON.stringify({
						solution: this.state.url,
						confirmEmail: this.state.confirmEmail,
						quesId: this.state.quesId,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						return this.setState({
							message: data.message,
							url: "",
							confirmEmail: "",
							quesId: "",
							loader: false,
						});
					});
			}
		);
	};

	render() {
		if (!window.localStorage.getItem("token")) return <PageNotFound />;
		return (
			<div className="upload-page__main-container">
				<div className="upload__card">
					<label htmlFor="confirmEmail">
						Add Email on which you want us to contact you!
					</label>
					<input
						type="email"
						id="confirmEmail"
						placeholder="Email*"
						onChange={this.handleChange}
						className="upload__input"
						name="confirmEmail"
						value={this.state.confirmEmail}
					/>
					<label htmlFor="quesId">
						Enter Question Id.(You can get it by placing your pointer on the
						question)
					</label>
					<input
						type="text"
						id="quesId"
						className="upload__input"
						placeholder="Ques ID* | Example: (ARRAY_10) "
						onChange={this.handleChange}
						name="quesId"
						value={this.state.quesId}
					/>
					<label htmlFor="videoFile">Choose your video solution</label>
					<input type="file" id="videoFile" onChange={this.upload} />
					{this.state.loading ? (
						<div className="w3-light-grey w3-round-xlarge">
							<div
								className="w3-container w3-blue w3-round-xlarge"
								style={{ width: this.state.loadingProgress }}
							>
								Upload Progress: {this.state.loadingProgress}%
							</div>
						</div>
					) : null}
					{this.state.loadingProgress === 100 && this.state.loader === false ? (
						<button onClick={this.handleSubmit}>Submit</button>
					) : (
						<button disabled={true}>Submit</button>
					)}
					<p>{this.state.message}</p>
					<p>
						Click <Link to="/profile">here</Link> to go to profile page!
					</p>
				</div>
			</div>
		);
	}
}

export default UploadSolutionsPage;
