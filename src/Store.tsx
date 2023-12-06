import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { UserType } from './types/User.types';

export const Context = createContext([] as UserType[]);

interface Props {
	children?: ReactNode;
}

const Store = ({ children }: Props) => {
	const [users, setUsers] = useState([] as UserType[]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((res) => setUsers(res));
	}, []);

	return <Context.Provider value={users}>{children}</Context.Provider>;
};

export default Store;
