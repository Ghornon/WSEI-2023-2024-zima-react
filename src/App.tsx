import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './pages/Todo/Todo';
import UsersPage from './pages/Users/Users';
import PostsPage from './pages/Posts/Posts';
import Nav from './components/Nav';

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/">
					<Route index element={<PostsPage />} />
					<Route path="todos" element={<TodoPage />} />
					<Route path="users" element={<UsersPage />} />
					<Route path="/posts/:postId" element={<PostsPage />} />
					<Route path="posts" element={<PostsPage />} />
					{/* <Route path="*" element={<NoPage />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
