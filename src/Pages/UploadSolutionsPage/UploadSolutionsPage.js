import React from "react";
import "./uploadsolutionspage.css";
import { storage } from "../../Firebase/config";

class UploadSolutionsPage extends React.Component {
	constructor() {
		super();
		this.state = {
			url: "",
			loading: false,
		};
	}

	upload = (event) => {
		const file = event.target.files[0];
		const uplaodTask = storage().ref(`solutions/${file.name}`).put(file);
		uplaodTask.on(
			"state_changed",
			(snapshot) => {
				this.setState({ loading: true }, () =>
					console.log(
						"Loading: " +
							Math.round(
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100
							)
					)
				);
			},
			(error) => {
				console.log(error);
			},
			() => {
				storage()
					.ref("solutions")
					.child(file.name)
					.getDownloadURL()
					.then((url) => {
						this.setState({ url }, () => console.log(url));
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
