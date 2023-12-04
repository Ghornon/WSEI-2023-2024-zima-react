import { createContext } from 'react';

function App() {
	return (
		<div className="UsersPage">
			{users.map((user) => (
				<div>{user.name}</div>
			))}
		</div>
	);
}

export default App;
