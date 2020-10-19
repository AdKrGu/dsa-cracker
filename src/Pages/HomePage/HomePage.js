import React from "react";
import "./homepage.css";

class HomePage extends React.Component {
	constructor(props) {
		super();
		this.state = {
			login: false,
			email: "",
			password: "",
			message: "",
			loading: false,
		};
	}

	componentDidMount() {
		if (window.localStorage.getItem("token")) {
			fetch("https://dsa-cracker-server.herokuapp.com/profile", {
				method: "GET",
				headers: {
					"content-type": "application/json",
					authorization: window.localStorage.getItem("token"),
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) window.localStorage.removeItem("token");
					else return (window.location.href = "/profile");
				});
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = () => {
		if (!this.state.email || !this.state.password)
			return this.setState({
				message: "Please fill all the details!",
				email: "",
				password: "",
			});

		if (this.state.password.length < 6)
			return this.setState({
				message: "Password must be atleast 6 characters long!",
				password: "",
			});
		this.setState({ loading: true }, () => {
			let link = this.state.login ? "login" : "register";
			fetch(`https://dsa-cracker-server.herokuapp.com/${link}`, {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.token) {
						this.setState({ loading: false }, () => {
							window.localStorage.setItem("token", data.token);
							window.location.href = "/profile";
						});
					} else {
						this.setState({
							message: data.error,
							email: "",
							password: "",
							loading: false,
						});
					}
				});
		});
	};

	render() {
		return (
			<div className="homepage__main">
				<section className="homepage__info">
					<h1 className="homepage__hero-title">
						Handpicked DSA questions for Interviews!
					</h1>
					<h3 className="homepage__hero-subtitle">
						Register and get 450+ Questions for Free!
					</h3>
					<ul className="homepage__benefits">
						<li>
							Handpicked, topic-wise questions by{" "}
							<span className="benefits--bold">Amazon </span>Software Engineer{" "}
							<a
								href="https://www.linkedin.com/in/love-babbar-38ab2887/"
								className="list__link"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className="benefits--bold">Love Babbar</span>
							</a>
						</li>
						<li>
							Get videos and more study material at his{" "}
							<a
								className="list__link"
								href="https://www.youtube.com/channel/UCQHLxxBFrbfdrk1jF0moTpw"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className="benefits--bold">Youtube</span>
							</a>{" "}
							Channel!
						</li>
						<li>Track your progress and compete with other programmers!</li>
						<li>Get questions of every topic with varying difficulty level!</li>
					</ul>
				</section>
				<section className="homepage__input">
					<div className="homepage__form-div">
						<h1 className="form__heading" id="form">
							{this.state.login ? "Login Here!" : "Register Now!"}
						</h1>
						<p className="form__sub-heading">
							Solve questions, Track progress & Compete
						</p>
						<input
							className="form__input"
							placeholder="Email"
							type="email"
							name="email"
							onChange={this.handleChange}
							value={this.state.email}
						/>
						<input
							className="form__input"
							placeholder="Password"
							type="password"
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
						/>
						{this.state.loading ? (
							<button
								className="form__button"
								style={{
									cursor: "not-allowed",
									color: "black",
									backgroundColor: "#fdfdfd",
									border: "1px solid #333",
								}}
								disabled={true}
							>
								Loading!
							</button>
						) : (
							<button className="form__button" onClick={this.handleSubmit}>
								{this.state.login ? "Login" : "Register"}
							</button>
						)}

						<p className="form__change">
							{this.state.login
								? "New for you? Register "
								: "Already Registered? Login "}

							<span
								className="benefits--bold--underline"
								onClick={() => this.setState({ login: !this.state.login })}
							>
								Here!
							</span>
						</p>
						{this.state.message ? (
							<p className="form__change">{this.state.message}</p>
						) : (
							""
						)}
					</div>
				</section>
			</div>
		);
	}
}
export default HomePage;
