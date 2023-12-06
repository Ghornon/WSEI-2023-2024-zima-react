import { useState, useEffect } from 'react';
import { PostType } from '../../types/Post.types';
import Post from '../../components/Post';
import Loader from '../../components/Loader';

function PostsPage() {
	const [posts, setPosts] = useState([] as PostType[]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json())
			.then((res) => setPosts(res));
	}, []);

	return (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col">
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

export default PostsPage;
