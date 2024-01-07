import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../../types/Post.types';
import Post from '../../components/Post';
import Loader from '../../components/Loader';
import { Context } from '../../Store';

function PostsPage() {
	const [posts, setPosts] = useState([] as PostType[]);
	const { postId } = useParams();
	const { isAdmin } = useContext(Context);

	const [filter, setFilter] = useState('');

	const handleFilterOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setFilter(event.target.value);
	};

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
	}, [postId]);

	return (
		<section className="vh-100">
			<div className={postId ? 'container py-5 h-100' : 'container-fluid p-5 h-100'}>
				<div className="row">
					<div className="col">
						<nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
							<input
								className="form-control me-sm-2"
								type="search"
								placeholder="Search"
								value={filter}
								onChange={handleFilterOnChange}
							/>

							{isAdmin ? (
								<div className="col pt-3">
									<a href={'/posts/new'} className="btn btn-outline-primary">
										Add new post
									</a>
								</div>
							) : (
								''
							)}
						</nav>
					</div>
				</div>
				<div className="row d-flex h-100">
					{posts.length > 0 ? (
						posts
							.filter((post) => {
								if (filter === '') {
									return post;
								} else if (
									post.title.toLowerCase().includes(filter.toLowerCase())
								) {
									return post;
								}
							})
							.map((post: PostType) => <Post key={post.id} post={post} />)
					) : (
						<Loader />
					)}
				</div>
			</div>
		</section>
	);
}

export default PostsPage;
