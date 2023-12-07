import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './pages/Todo/Todo';
import UsersPage from './pages/Users/Users';
import PostsPage from './pages/Posts/Posts';
import Nav from './components/Nav';
import Store from './Store';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
	return (
		<BrowserRouter>
			<Store>
				<Nav />
				<Routes>
					<Route path="/">
						<Route index element={<PostsPage />} />
						<Route path="todos" element={<TodoPage />} />
						<Route path="users" element={<UsersPage />} />
						<Route path="/users/:userId" element={<UserProfile />} />
						<Route path="posts" element={<PostsPage />} />
						<Route path="/posts/:postId" element={<PostsPage />} />
						{/* <Route path="*" element={<NoPage />} /> */}
					</Route>
				</Routes>
			</Store>
		</BrowserRouter>
	);
}

export default App;
