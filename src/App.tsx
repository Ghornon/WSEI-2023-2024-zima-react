import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './pages/Todo/Todo';
import UsersPage from './pages/Users/Users';
import PostsPage from './pages/Posts/Posts';
import Nav from './components/Nav';
import Store from './Store';
import UserProfile from './pages/UserProfile/UserProfile';
import AlbumsPage from './pages/Albums/AlbumsPage';
import PhotosPage from './pages/Photos/PhotosPage';
import PostsFormPage from './pages/Posts/PostsForm';
import AlbumsFormPage from './pages/Albums/AlbumsForm';
import PhotosFormPage from './pages/Photos/PhotosForm';

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
						<Route path="/posts/:postId/edit" element={<PostsFormPage />} />
						<Route path="/posts/new" element={<PostsFormPage />} />
						<Route path="albums" element={<AlbumsPage />} />
						<Route path="/albums/new" element={<AlbumsFormPage />} />
						<Route path="/albums/:albumId" element={<AlbumsPage />} />
						<Route path="/albums/:albumId/edit" element={<AlbumsFormPage />} />
						<Route path="/albums/:albumId/photos" element={<PhotosPage />} />
						<Route path="/albums/:albumId/photos/new" element={<PhotosFormPage />} />
						<Route
							path="/albums/:albumId/photos/:photoId/edit"
							element={<PhotosFormPage />}
						/>
						{/* <Route path="*" element={<NoPage />} /> */}
					</Route>
				</Routes>
			</Store>
		</BrowserRouter>
	);
}

export default App;
