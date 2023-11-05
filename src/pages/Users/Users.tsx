import { useState, useEffect } from 'react';
import { UserType } from '../../types/User.types';

function UsersPage() {
	const [users, setUsers] = useState([] as UserType[]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((res) => setUsers(res));
	}, []);

	return (
		<div className="UsersPage">
			{users.map((user) => (
				<div>{user.name}</div>
			))}
		</div>
	);
}

export default UsersPage;
