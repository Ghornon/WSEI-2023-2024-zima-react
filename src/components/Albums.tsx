import { AlbumType } from '../types/Album.types';

interface Props {
	album: AlbumType;
}

const Comment: React.FC<Props> = ({ album }) => {
	return <li className="list-group-item"></li>;
};

export default Comment;
