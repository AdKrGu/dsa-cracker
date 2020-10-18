import React from "react";
import "./homepage.css";

class HomePage extends React.Component {
	constructor() {
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
		if (window.localStorage.getItem("token")) window.location.href = "/profile";
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
			fetch(`https://flypocket-server.herokuapp.com/${link}`, {
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
						Save Passwords and Notes on the Fly!
					</h1>
					<h3 className="homepage__hero-subtitle">
						Join us today to avail these benefits!
					</h3>
					<ul className="homepage__benefits">
						<li>Never use same password on every website, again!</li>
						<li>
							We use industry standard Hash Algorithms (
							<span className="benefits--bold">AES256</span>) to keep your
							information, <span className="benefits--bold">Secure!</span>
						</li>
						<li>
							Secure your accounts by using different passwords at every
							website.
						</li>
						<li>
							Use our{" "}
							<span className="benefits--bold--underline">
								chrome extension
							</span>{" "}
							to save passwords and information on the fly!
						</li>
					</ul>
				</section>
				<section className="homepage__input">
					<div className="homepage__form-div">
						<h1 className="form__heading">
							{this.state.login ? "Login Here!" : "Register Now!"}
						</h1>
						<p className="form__sub-heading">
							Save Passwords, notes and info on the fly!
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
								style={{ cursor: "notAllowed" }}
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
