import React from "react";
import "./uploadsolutionspage.css";
import { storage } from "../../Firebase/config";

class UploadSolutionsPage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	upload = (event) => {
		const file = event.target.files[0];
		const uplaodTask = storage().ref(`solutions/${file.name}`).put(file);
		uplaodTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				console.log(error);
			},
			() => {
				storage()
					.ref("solutions")
					.child(file.name)
					.getDownloadURL()
					.then((url) => {
						console.log(url);
					});
			}
		);
	};

	render() {
		return (
			<div>
				<input type="file" onChange={this.upload} />
			</div>
		);
	}
}

export default UploadSolutionsPage;
