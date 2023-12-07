import { useContext } from 'react';
import { Context } from '../../Store';
import { UserCard } from '../../components/UserCard';
import Loader from '../../components/Loader';

function UsersPage() {
	const users = useContext(Context);

	return (
		<div className="container py-5">
			<div className="row d-flex">
				{users.length > 0 ? (
					users.map((user) => (
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
