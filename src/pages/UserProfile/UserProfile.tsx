import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Store';
import { UserCard } from '../../components/UserCard';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { UserDataCard } from '../../components/UserDataCard';
import { UserLinksCard } from '../../components/UserLinksCard';
import { PostType } from '../../types/Post.types';
import Post from '../../components/Post';
import { AlbumType } from '../../types/Album.types';
import Album from '../../components/Album';

function UserProfile() {
	const { users } = useContext(Context);
	const { userId } = useParams();

	const currentUser = users.find((user) => user.id.toString() == userId);

	const [posts, setPosts] = useState([] as PostType[]);
	const PostsURL = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

	const [albums, setAlbums] = useState([] as PostType[]);
	const AlbumsURL = `https://jsonplaceholder.typicode.com/users/${userId}/albums`;

	useEffect(() => {
		fetch(PostsURL)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (Array.isArray(res)) setPosts(res);
				else setPosts([res]);
			});
	}, []);

	useEffect(() => {
		fetch(AlbumsURL)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (Array.isArray(res)) setAlbums(res);
				else setAlbums([res]);
			});
	}, []);

	return (
		<section>
			<div className="container py-5">
				<div className="row">
					<div className="col">
						<nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/home">Home</a>
								</li>
								<li className="breadcrumb-item">
									<a href="/users/">Users</a>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									User Profile
								</li>
							</ol>
						</nav>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-4">
						{currentUser ? (
							<UserCard key={currentUser.id} user={currentUser} />
						) : (
							<Loader />
						)}
						{currentUser ? (
							<UserLinksCard key={currentUser.id} user={currentUser} />
						) : (
							<Loader />
						)}
					</div>
					<div className="col-lg-8">
						{currentUser ? (
							<UserDataCard key={currentUser.id} user={currentUser} />
						) : (
							<Loader />
						)}

						<hr />
						<div className="list-group">
							{albums.length > 0 ? (
								albums.map((album: AlbumType) => (
									<Album key={album.id} album={album} />
								))
							) : (
								<Loader />
							)}
						</div>

						<hr />

						{posts.length > 0 ? (
							posts.map((post: PostType) => <Post key={post.id} post={post} />)
						) : (
							<Loader />
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default UserProfile;
