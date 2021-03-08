import React, { Component } from "react";
import SideMenu from "../../component/SideMenu";
import HeaderDashboard from "../../component/HeaderDashboard";
import FooterDashboard from "../../component/FooterDashboard";
import BreadcrumbDashboard from "../../component/BreadcrumbDashboard";
import RouterDashboard from "./RouterDashboard";

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			usuarioLogeado: {
				apellido: "",
				nombre: "",
				email: "",
				id: 0,
				username: "",
				image: "",
			},
			titulo: "Dashboard",
		};
	}

	componentDidMount() {
		if (!sessionStorage.getItem("user-token")) {
			this.props.history.push("/");
		}
		const json = sessionStorage.getItem("usuario");
		const usuario = JSON.parse(json);
		this.setState({
			usuarioLogeado: usuario,
		});
	}

	toggleMenu() {
		const sideMenu = document.querySelector("#sideMenu");
		sideMenu.classList.toggle("hidden");
	}

	render() {
		return (
			<div className="flex relative">
				<SideMenu
					{...this.state.usuarioLogeado}
					toggleMenu={this.toggleMenu}
					path={this.props.match.url}
				/>
				<div className="md:ml-auto containerContenido w-full">
					<HeaderDashboard {...this.state.usuarioLogeado} />
					<div className="px-4 py-2 mt-16">
						<BreadcrumbDashboard titulo={this.state.titulo} />

						<div className="mt-4">
							<RouterDashboard estado={this.props} />
						</div>
					</div>
					<FooterDashboard toggleMenu={this.toggleMenu} />
				</div>
			</div>
		);
	}
}

export default Dashboard;
