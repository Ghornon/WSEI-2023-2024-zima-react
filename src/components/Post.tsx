import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../types/Post.types';
import Loader from './Loader';
import { CommentType } from '../types/Comment.types';
import Comment from '../components/Comment';
import { Context } from '../Store';
interface Props {
	post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
	const [comments, setComments] = useState([] as CommentType[]);
	const { postId, userId } = useParams();
	const { isAdmin } = useContext(Context);

	const [formData, setFormData] = useState({
		name: '',
		body: '',
		email: '',
	});

	const handleCommentChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
		event
	) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const addComment = async () => {
		const updatedComments = [...comments];

		const newComment = {
			...formData,
			postId: postId,
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newComment),
		});

		const result = await response.json();
		updatedComments.push(result);

		setComments(updatedComments);
		localStorage.setItem('comments', JSON.stringify(updatedComments));
	};

	useEffect(() => {
		const cache = localStorage.getItem('comments');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/comments')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('comments', JSON.stringify(res));
					setComments(res);
				});
		} else {
			const comments = JSON.parse(cache);
			setComments(comments);
		}
	}, []);

	return (
		<div className={postId || userId ? 'col' : 'col-xs-12 col-sm-6 col-lg-4'}>
			<div className="card mb-3">
				<div className="card-body bg-custom pt-3 pb-3">
					<h3 className="card-title">{post.title}</h3>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="d-block user-select-none post-image"
						width="100%"
						height="200"
						aria-label="Placeholder: Poster"
						focusable="false"
						role="img"
						preserveAspectRatio="xMidYMid slice"
						viewBox="0 0 318 180"
					>
						<rect width="100%" height="100%" fill="#868e96"></rect>
						<text x="50%" y="50%" fill="#dee2e6" dy=".3em">
							Poster
						</text>
					</svg>
					<p className="card-text pt-2">{post.body}</p>
					<div className="row">
						<div className="col">
							<span className="badge rounded-pill bg-secondary">
								Posted: {new Date().toDateString()}
							</span>
						</div>
						<div className="col d-flex justify-content-end">
							<span className="badge bg-info">tag1</span>
							<span className="badge bg-success">tag2</span>
							<span className="badge bg-danger">tag3</span>
						</div>
					</div>
				</div>
				<ul className="list-group list-group-flush p-4">
					{comments.length > 0 ? (
						comments
							.filter((comment: CommentType) => comment.postId == post.id)
							.map((comment: CommentType, index) => {
								if (!postId && index >= 1) return;

								return <Comment key={comment.id} comment={comment} />;
							})
					) : (
						<Loader />
					)}
				</ul>
				<div className="card-footer text-muted">
					{userId ? (
						''
					) : (
						<a
							href={`/users/${post.userId}`}
							className="card-link btn btn-outline-primary"
						>
							Author Page
						</a>
					)}
					{postId ? (
						<button
							className="card-link btn btn-outline-secondary"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#addComment"
						>
							Add comment
						</button>
					) : (
						<a
							href={`/posts/${post.id}`}
							className="card-link btn btn-outline-secondary"
						>
							Comments
						</a>
					)}
					{isAdmin ? (
						<a
							href={`/posts/${post.id}/edit`}
							className="card-link btn btn-outline-info"
						>
							Edit
						</a>
					) : (
						''
					)}
				</div>
			</div>
			<div className="modal fade" id="addComment" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add comment</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label>Title</label>
								<input
									type="text"
									className="form-control"
									name="name"
									value={formData.name}
									onChange={handleCommentChange}
								/>
							</div>
							<div className="form-group">
								<label>Comment</label>
								<textarea
									className="form-control"
									rows={3}
									name="body"
									value={formData.body}
									onChange={handleCommentChange}
								></textarea>
							</div>
							<div className="form-group">
								<label>Email address</label>
								<input
									type="email"
									className="form-control"
									placeholder="name@example.com"
									name="email"
									value={formData.email}
									onChange={handleCommentChange}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={addComment}>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
