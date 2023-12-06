import { CommentType } from '../types/Comment.types';

interface Props {
	comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
	return (
		<li className="list-group-item">
			<h5 className="card-subtitle mt-2 text-muted">{comment.name}</h5>
			<p className="card-text">{comment.body}</p>
			<h6 className="card-text text-muted">Author: {comment.email}</h6>
		</li>
	);
};

export default Comment;
