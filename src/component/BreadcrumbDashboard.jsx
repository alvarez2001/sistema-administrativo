import React from "react";

class BreadcrumbDashboard extends React.Component {
	render() {
		return (
			<h1 className="text-2xl md:text-3xl font-lobster mb-3.5 border-b pb-2 capitalize">
				{this.props.titulo}
			</h1>
		);
	}
}

export default BreadcrumbDashboard;
