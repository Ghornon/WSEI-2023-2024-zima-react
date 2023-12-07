import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../../types/Post.types';
import Post from '../../components/Post';
import Loader from '../../components/Loader';

function PostsPage() {
	const [posts, setPosts] = useState([] as PostType[]);
	const { postId } = useParams();
	const URL = `https://jsonplaceholder.typicode.com/posts${postId ? '/' + postId : ''}`;

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
		<section className="vh-100">
			<div className={postId ? 'container py-5 h-100' : 'container-fluid py-5 h-100'}>
				<div className="row d-flex h-100">
					{posts.length > 0 ? (
						posts.map((post: PostType) => <Post key={post.id} post={post} />)
					) : (
						<Loader />
					)}
				</div>
			</div>
		</section>
	);
}

export default PostsPage;