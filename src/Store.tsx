import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { UserType } from './types/User.types';

type ContextType = {
	users: UserType[];
	isAdmin: boolean;
	handleAdminMode: () => void;
	/* 	saveTodo: (todo: ITodo) => void;
	updateTodo: (id: number) => void; */
};

export const Context = createContext({} as ContextType);

interface Props {
	children?: ReactNode;
}

const Store = ({ children }: Props) => {
	const [users, setUsers] = useState([] as UserType[]);
	const [isAdmin, setAdmin] = useState(false as boolean);

	const handleAdminMode = () => {
		const isAdmin = sessionStorage.getItem('isAdmin');
		if (isAdmin == 'true') {
			setAdmin(false);
			sessionStorage.setItem('isAdmin', 'false');
		} else {
			setAdmin(true);
			sessionStorage.setItem('isAdmin', 'true');
		}
	};

	useEffect(() => {
		const isAdmin = sessionStorage.getItem('isAdmin');
		if (isAdmin == 'true') setAdmin(true);

		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((res) => setUsers(res));
	}, []);

	return (
		<Context.Provider value={{ users, isAdmin, handleAdminMode }}>{children}</Context.Provider>
	);
};

export default Store;
