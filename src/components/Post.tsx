import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../types/Post.types';
import Loader from './Loader';
import { CommentType } from '../types/Comment.types';
import Comment from '../components/Comment';
interface Props {
	post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
	const [comments, setComments] = useState([] as CommentType[]);
	const { postId, userId } = useParams();

	useEffect(() => {
		const cache = localStorage.getItem('comments');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/comments')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('comments', JSON.stringify(res));
					const comments = res.filter(
						(comment: CommentType) => comment.postId == post.id
					);
					setComments(comments);
				});
		} else {
			const comments = JSON.parse(cache).filter(
				(comment: CommentType) => comment.postId == post.id
			);
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
						comments.map((comment: CommentType, index) => {
							if (!postId && index >= 1) return;

							return <Comment key={comment.id} comment={comment} />;
						})
					) : (
						<Loader />
					)}
				</ul>
				<div className="card-footer text-muted">
					<a href={`/users/${post.userId}`} className="card-link btn btn-outline-primary">
						Author Page
					</a>
					{postId || userId ? (
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
								<input type="text" className="form-control" />
							</div>
							<div className="form-group">
								<label>Comment</label>
								<textarea className="form-control" rows={3}></textarea>
							</div>
							<div className="form-group">
								<label>Email address</label>
								<input
									type="email"
									className="form-control"
									placeholder="name@example.com"
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
							<button type="button" className="btn btn-primary">
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
