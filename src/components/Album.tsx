import { useContext } from 'react';
import { AlbumType } from '../types/Album.types';
import { Context } from '../Store';

interface Props {
	album: AlbumType;
}

const Album: React.FC<Props> = ({ album }) => {
	const { users, isAdmin } = useContext(Context);

	return (
		<tr className="fw-normal">
			<th>
				<span className="ms-2">{users.find((user) => user.id == album.userId)?.name}</span>
			</th>
			<td className="align-middle">
				<a href={`/albums/${album.id}/photos`}>{album.title}</a>
			</td>
			{isAdmin ? (
				<td className="align-middle">
					<a
						href={`/albums/${album.id}/edit`}
						data-mdb-toggle="tooltip"
						title="edit"
						className="btn btn-outline-info"
					>
						Edit
					</a>
				</td>
			) : (
				''
			)}
		</tr>
	);
};

export default Album;
