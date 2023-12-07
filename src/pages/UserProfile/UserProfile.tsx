import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Store';
import { UserCard } from '../../components/UserCard';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { UserDataCard } from '../../components/UserDataCard';
import { UserLinksCard } from '../../components/UserLinksCard';
import { PostType } from '../../types/Post.types';
import Post from '../../components/Post';

function UserProfile() {
	const users = useContext(Context);
	const { userId } = useParams();

	const currentUser = users.find((user) => user.id.toString() == userId);

	const [posts, setPosts] = useState([] as PostType[]);
	const URL = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

	useEffect(() => {
		fetch(URL)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (Array.isArray(res)) setPosts(res);
				else setPosts([res]);
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
