import React from 'react';

const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					Navbar
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarColor01">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<a className="nav-link active" href="/">
								Home
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/todos">
								Todos
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/users">
								Users
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/albums">
								Albums
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
