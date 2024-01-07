import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../../types/Post.types';
import { Context } from '../../Store';

function PostsFormPage() {
	const [posts, setPosts] = useState([] as PostType[]);
	const { postId } = useParams();
	const { users } = useContext(Context);

	const [formData, setFormData] = useState({
		title: '',
		body: '',
		userId: '',
	});

	const handlePostChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	> = (event) => {
		const { name, value } = event.target;
		console.log(name, value);
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleEdit = async () => {
		const updatedPost = {
			...formData,
			postId: postId,
		};

		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedPost),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedPosts = [...posts].map((post: PostType) => {
				if (post.id.toString() == postId) return result;

				return post;
			});

			localStorage.setItem('posts', JSON.stringify(updatedPosts));
			window.location.replace(`/posts/${postId}`);
		}
	};

	const handleAdd = async () => {
		const newPost = {
			...formData,
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newPost),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedPosts = [...posts];
			updatedPosts.push(result);

			localStorage.setItem('posts', JSON.stringify(updatedPosts));
			window.location.replace(`/posts/${result.id}`);
		}
	};

	const handleRemove = async () => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const status = await response.ok;

		if (status) {
			const updatedPosts = [...posts].filter(
				(post: PostType) => post.id.toString() != postId
			);

			localStorage.setItem('posts', JSON.stringify(updatedPosts));
			window.location.replace('/posts');
		}
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

						setFormData({
							title: post.title,
							body: post.body,
							userId: post.userId,
						});
					}
					setPosts(res);
				});
		} else {
			if (postId) {
				const post = JSON.parse(cache).find(
					(post: PostType) => post.id.toString() == postId
				);
				setFormData({
					title: post.title,
					body: post.body,
					userId: post.userId,
				});
			}
			setPosts(JSON.parse(cache));
		}
	}, []);

	return (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row d-flex h-100">
					<div className="body">
						<div className="form-group">
							<label>Title</label>
							<input
								type="text"
								className="form-control"
								name="title"
								value={formData.title}
								onChange={handlePostChange}
							/>
						</div>
						<div className="form-group">
							<label>Body</label>
							<textarea
								className="form-control"
								rows={6}
								name="body"
								value={formData.body}
								onChange={handlePostChange}
							></textarea>
						</div>
						<div className="form-group">
							<label>User</label>
							<select
								className="form-select"
								value={formData.userId}
								name="userId"
								onChange={handlePostChange}
							>
								{users.length
									? users.map((user) => (
											<option key={user.id} value={user.id}>
												{user.name}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>
					{postId ? (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-danger"
								onClick={handleRemove}
							>
								Remove post
							</button>
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={handleEdit}
							>
								Save changes
							</button>
						</div>
					) : (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-success"
								onClick={handleAdd}
							>
								Add post
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default PostsFormPage;
