import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import config from "../config";

class SideMenu extends Component {
	render() {
		const { nombre, apellido, image } = this.props;

		return (
			<aside
				className="bg-gradient-to-b from-green-900 to-green-600 text-white h-screen w-full z-20 md:w-72 md:block hidden fixed overflow-y-auto"
				id="sideMenu"
			>
				<h2 className="font-lobster tracking-widest text-md font-bold uppercase h-16 flex flex-col justify-around bg-green-900 text-center relative">
					Sistema administrativo
					<button
						onClick={this.props.toggleMenu}
						className="menuButton absolute text-2xl text-red-500 md:hidden right-3 focus:outline-none"
					>
						<i className="fas fa-times-circle"></i>
					</button>
				</h2>
				<div className="content-aside p-4">
					<div className="w-full">
						<img
							src={config.url + "/usuario/imagen/" + image}
							alt={nombre + " " + apellido}
							className="mx-auto w-60 h-60 rounded-full object-cover object-center"
						/>
						<h3 className="text-center mt-2 font-bold font-serif text-md">
							{`${nombre} ${apellido}`}
						</h3>
					</div>
					<nav className="font-sans mt-3">
						<div className="">
							<p className="capitalize text-xs py-2 border-green-900 border-b border-black">
								Principal
							</p>
							<ol className="text-sm">
								<li className=" ">
									<NavLink
										to="/dashboard"
										className="block outline-none py-2 px-3 hover:bg-green-900 transform hover:-translate-x-4 transition ease-in duration-300 rounded"
									>
										<span className="mr-1.5">
											<i className="fas fa-home"></i>
										</span>
										Home
									</NavLink>
								</li>
							</ol>
							<p className="capitalize text-xs py-2 border-green-900 border-b border-black">
								Estado de Cuenta
							</p>
							<ol className="text-sm">
								<li className="">
									<NavLink
										to={`${this.props.path}/estado`}
										exact
										className="block outline-none py-2 px-3 hover:bg-green-900 transform hover:-translate-x-4 transition ease-in duration-300 rounded"
										activeClassName="bg-green-900 -translate-x-4"
									>
										<span className="mr-1.5">
											<i className="fas fa-plus-square"></i>
										</span>
										Listar
									</NavLink>
								</li>
								<li className="">
									<NavLink
										to={`${this.props.path}/estado/crear`}
										exact
										className="block outline-none py-2 px-3 hover:bg-green-900 transform hover:-translate-x-4 transition ease-in duration-300 rounded"
										activeClassName="bg-green-900 -translate-x-4"
									>
										<span className="mr-1.5">
											<i className="fas fa-plus-square"></i>
										</span>
										Crear estado
									</NavLink>
								</li>
							</ol>
							<p className="capitalize  text-xs py-2 border-green-900 border-b border-black">
								Usuario
							</p>
							<ol className="text-sm">
								<li className=" ">
									<NavLink
										to={`${this.props.path}/usuario/crear`}
										className="block outline-none py-2 px-3 hover:bg-green-900 transform hover:-translate-x-4 transition ease-in duration-300 rounded"
										activeClassName="bg-green-900 -translate-x-4"
									>
										<span className="mr-1.5">
											<i className="fas fa-user-plus"></i>
										</span>
										Crear Usuario
									</NavLink>
								</li>
							</ol>
						</div>
					</nav>
				</div>
			</aside>
		);
	}
}

export default SideMenu;
