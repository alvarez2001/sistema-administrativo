import React from "react";
import { NavLink } from "react-router-dom";
import { config } from "../config";

const HeaderDashboard = (props) => {
	const { nombre, apellido, image } = props;
	return (
		<header className="bg-gradient-to-r from-green-900 font-sans to-green-600 text-white px-4 w-auto fixed h-16 items-center flex justify-end containerContenido w-full z-10">
			<div className="flex items-center">
				<div className="text-3xl">
					<NavLink to="/dashboard" className="mx-2">
						<i className="fab fa-whmcs"></i>
					</NavLink>
					<NavLink to="/dashboard/off/1" className="mx-2">
						<i className="fas fa-power-off"></i>
					</NavLink>
				</div>

				<div className="">
					<NavLink to="/">
						<img
							src={config.url + "/usuario/imagen/" + image}
							alt={nombre + " " + apellido}
							className="h-12 rounded-full w-12 object-cover object-center border border-white mx-2"
						/>
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default HeaderDashboard;
