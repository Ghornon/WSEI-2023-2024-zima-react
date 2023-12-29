import { AlbumType } from '../types/Album.types';

interface Props {
	album: AlbumType;
}

const Album: React.FC<Props> = ({ album }) => {
	return (
		<a className="list-group-item list-group-item-action" href={`/albums/${album.id}/photos`}>
			<i className="bi bi-image-fill"></i> {' ' + album.title}
		</a>
	);
};

export default Album;
