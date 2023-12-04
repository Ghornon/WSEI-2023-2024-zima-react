import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootswatch/dist/lux/bootstrap.min.css';

import './index.css';

import TodoPage from './pages/Todo/Todo';
import UsersPage from './pages/Users/Users';
import Nav from './components/Nav';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<Nav />
		<Routes>
			<Route path="/">
				<Route index element={<TodoPage />} />
				<Route path="users" element={<UsersPage />} />
				{/* <Route path="*" element={<NoPage />} /> */}
			</Route>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
