import { useContext, useState } from 'react';
import { Context } from '../../Store';
import { UserCard } from '../../components/UserCard';
import Loader from '../../components/Loader';

function UsersPage() {
	const users = useContext(Context);

	const [filter, setFilter] = useState('');

	const handleFilterOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setFilter(event.target.value);
	};

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col">
					<nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="/home">Home</a>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Users
							</li>
						</ol>
						<input
							className="form-control me-sm-2"
							type="search"
							placeholder="Search"
							value={filter}
							onChange={handleFilterOnChange}
						/>
					</nav>
				</div>
			</div>
			<div className="row d-flex">
				{users.length > 0 ? (
					users
						.filter((user) => {
							if (filter === '') {
								return user;
							} else if (user.name.toLowerCase().includes(filter.toLowerCase())) {
								return user;
							}
						})
						.map((user) => (
							<div className="col-lg-4">
								<UserCard key={user.id} user={user} />
							</div>
						))
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
}

export default UsersPage;
