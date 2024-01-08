import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../Store';
import { UserType } from '../../types/User.types';

const UserProfileForm = () => {
	const { userId } = useParams();
	const { users, setUsers } = useContext(Context);

	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		phone: '',
		website: '',
	});

	const [addressData, setAddressData] = useState({
		street: '',
		suite: '',
		city: '',
		zipcode: '',
		geolat: '',
		geolng: '',
	});

	const [companyData, setCompanyData] = useState({
		name: '',
		catchPhrase: '',
		bs: '',
	});

	const handleUserChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;
		setAddressData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleCompanyChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;
		setCompanyData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleEdit = async () => {
		const updatedUser = {
			...formData,
			address: {
				...addressData,
				geo: {
					lat: addressData.geolat,
					lng: addressData.geolng,
				},
			},
			company: {
				...companyData,
			},
		};

		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedUser),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedUsers = [...users].map((user: UserType) => {
				if (user.id.toString() == userId) return result;

				return user;
			});

			localStorage.setItem('users', JSON.stringify(updatedUsers));
			window.location.replace(`/users/${userId}`);
		}
	};

	const handleAdd = async () => {
		const newUser = {
			...formData,
			address: {
				...addressData,
				geo: {
					lat: addressData.geolat,
					lng: addressData.geolng,
				},
			},
			company: {
				...companyData,
			},
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'user',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedUsers = [...users];
			updatedUsers.push(result);

			localStorage.setItem('users', JSON.stringify(updatedUsers));
			window.location.replace(`/users/${result.id}`);
		}
	};

	const handleRemove = async () => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const status = await response.ok;

		if (status) {
			const updatedUsers = [...users].filter(
				(user: UserType) => user.id.toString() != userId
			);

			localStorage.setItem('users', JSON.stringify(updatedUsers));
			window.location.replace('/users');
		}
	};

	useEffect(() => {
		const cache = localStorage.getItem('users');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/users')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('users', JSON.stringify(res));
					if (userId) {
						const user = res.find((user: UserType) => user.id.toString() == userId);

						setFormData({
							name: user.name,
							username: user.username,
							email: user.email,
							phone: user.phone,
							website: user.website,
						});
						setAddressData({
							street: user.address.street,
							suite: user.address.suite,
							city: user.address.city,
							zipcode: user.address.zipcode,
							geolat: user.address.geo.lat,
							geolng: user.address.geo.lng,
						});
						setCompanyData({
							name: user.company.name,
							catchPhrase: user.company.catchPhrase,
							bs: user.company.bs,
						});
					}
					setUsers(res);
				});
		} else {
			if (userId) {
				const user = JSON.parse(cache).find(
					(user: UserType) => user.id.toString() == userId
				);
				setFormData({
					name: user.name,
					username: user.username,
					email: user.email,
					phone: user.phone,
					website: user.website,
				});
				setAddressData({
					street: user.address.street,
					suite: user.address.suite,
					city: user.address.city,
					zipcode: user.address.zipcode,
					geolat: user.address.geo.lat,
					geolng: user.address.geo.lng,
				});
				setCompanyData({
					name: user.company.name,
					catchPhrase: user.company.catchPhrase,
					bs: user.company.bs,
				});
			}
			setUsers(JSON.parse(cache));
		}
	}, [setUsers, userId]);

	return (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row">
					<div className="col">
						<h2>User</h2>
						<div className="form-group">
							<label>Name</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={formData.name}
								onChange={handleUserChange}
							/>
						</div>
						<div className="form-group">
							<label>Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								value={formData.username}
								onChange={handleUserChange}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="email@domain.com"
								value={formData.email}
								onChange={handleUserChange}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="text"
								className="form-control"
								name="phone"
								value={formData.phone}
								onChange={handleUserChange}
							/>
						</div>
						<div className="form-group">
							<label>Website</label>
							<input
								type="text"
								className="form-control"
								name="website"
								value={formData.website}
								onChange={handleUserChange}
							/>
						</div>
					</div>
					<div className="col">
						<h2>Address</h2>
						<div className="form-group">
							<label>Street</label>
							<input
								type="text"
								className="form-control"
								name="street"
								value={addressData.street}
								onChange={handleAddressChange}
							/>
						</div>
						<div className="form-group">
							<label>Suite</label>
							<input
								type="text"
								className="form-control"
								name="suite"
								value={addressData.suite}
								onChange={handleAddressChange}
							/>
						</div>
						<div className="form-group">
							<label>City</label>
							<input
								type="text"
								className="form-control"
								name="city"
								value={addressData.city}
								onChange={handleAddressChange}
							/>
						</div>
						<div className="form-group">
							<label>Zip code</label>
							<input
								type="text"
								className="form-control"
								name="zipcode"
								value={addressData.zipcode}
								onChange={handleAddressChange}
							/>
						</div>
						<div className="form-group d-flex">
							<div className="col">
								<label>lat</label>
								<input
									type="text"
									className="form-control"
									name="geolat"
									value={addressData.geolat}
									onChange={handleAddressChange}
								/>
							</div>
							<div className="col ms-1">
								<label>lng</label>
								<input
									type="text"
									className="form-control"
									name="geolng"
									value={addressData.geolng}
									onChange={handleAddressChange}
								/>
							</div>
						</div>
					</div>
					<div className="col">
						<h2>Company</h2>
						<div className="form-group">
							<label>Name</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={companyData.name}
								onChange={handleCompanyChange}
							/>
						</div>
						<div className="form-group">
							<label>CatchPhrase</label>
							<input
								type="text"
								className="form-control"
								name="catchPhrase"
								value={companyData.catchPhrase}
								onChange={handleCompanyChange}
							/>
						</div>
						<div className="form-group">
							<label>bs</label>
							<input
								type="text"
								className="form-control"
								name="bs"
								value={companyData.bs}
								onChange={handleCompanyChange}
							/>
						</div>
					</div>
				</div>
				<div className="row pt-5">
					{userId ? (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-danger"
								onClick={handleRemove}
							>
								Remove user
							</button>
							<button
								type="button"
								className="btn btn-outline-primary ms-1"
								onClick={handleEdit}
							>
								Save changes
							</button>
						</div>
					) : (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-success"
								onClick={handleAdd}
							>
								Add new user
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default UserProfileForm;
