import { useContext } from 'react';
import { Context } from '../../Store';

function UsersPage() {
	const users = useContext(Context);

	return (
		<div className="UsersPage">
			{users.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}
		</div>
	);
}

export default UsersPage;
