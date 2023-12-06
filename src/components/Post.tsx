import { useState, useEffect } from 'react';
import { PostType } from '../types/Post.types';
import Loader from './Loader';
import { CommentType } from '../types/Comment.types';
import Comment from '../components/Comment';
interface Props {
	post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
	const [comments, setComments] = useState([] as CommentType[]);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
			.then((response) => response.json())
			.then((res) => setComments(res));
	}, []);

	return (
		<div className="card mb-3">
			<div className="card-body text-white bg-dark pt-5 pb-5">
				<h4 className="card-title">{post.title}</h4>
				<p className="card-text">{post.body}</p>
			</div>
			<ul className="list-group list-group-flush p-4">
				{comments.length > 0 ? (
					comments.map((comment: CommentType) => (
						<Comment key={comment.id} comment={comment} />
					))
				) : (
					<Loader />
				)}
			</ul>
			<div className="card-footer text-muted">
				<a href={`/users/${post.userId}`} className="card-link">
					UserPage
				</a>
				<a href={`/posts/${post.id}/comments`} className="card-link">
					Comments
				</a>
			</div>
		</div>
	);
};

export default Post;
