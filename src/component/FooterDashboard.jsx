import React from "react";

class FooterDashboard extends React.Component {
	render() {
		return (
			<footer>
				<button
					onClick={this.props.toggleMenu}
					type="button"
					className="h-14 w-14 rounded-full bg-green-500 text-white fixed bottom-4 right-4 z-10 md:hidden text-lg focus:outline-none menuButton animate-pulse"
				>
					<i className="fas fa-align-justify"></i>
				</button>
			</footer>
		);
	}
}

export default FooterDashboard;
