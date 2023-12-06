import { CommentType } from '../types/Comment.types';

interface Props {
	comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
	return (
		<li className="list-group-item">
			<h6 className="card-subtitle mt-2 text-muted">{comment.name}</h6>
			<p className="card-text">{comment.body}</p>
			<p className="card-text text-muted">
				<small>Author: {comment.email}</small>
			</p>
		</li>
	);
};

export default Comment;
