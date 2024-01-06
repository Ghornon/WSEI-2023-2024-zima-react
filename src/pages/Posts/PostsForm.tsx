import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../../types/Post.types';
import Post from '../../components/Post';
import Loader from '../../components/Loader';

function PostsFormPage() {
	const [posts, setPosts] = useState([] as PostType[]);
	const { postId } = useParams();

	useEffect(() => {
		const cache = localStorage.getItem('posts');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/posts')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('posts', JSON.stringify(res));

					if (postId) {
						const post = res.find((post: PostType) => post.id.toString() == postId);
						setPosts([post]);
					} else {
						setPosts(res);
					}
				});
		} else {
			if (postId) {
				const post = JSON.parse(cache).find(
					(post: PostType) => post.id.toString() == postId
				);
				setPosts([post]);
			} else {
				setPosts(JSON.parse(cache));
			}
		}
	}, []);

	return (
		<section className="vh-100">
			<div className={postId ? 'container py-5 h-100' : 'container-fluid p-5 h-100'}>
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

export default PostsFormPage;
