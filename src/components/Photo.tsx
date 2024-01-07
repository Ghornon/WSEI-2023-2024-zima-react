import { useContext } from 'react';
import { PhotoType } from '../types/Photo.types';
import { Context } from '../Store';
import { useParams } from 'react-router-dom';

interface Props {
	photo: PhotoType;
}

const Photo: React.FC<Props> = ({ photo }) => {
	const { isAdmin } = useContext(Context);
	const { albumId } = useParams();

	return (
		<div className="col-md-4">
			<div className="card mb-4 box-shadow">
				<img className="card-img-top" src={photo.url} alt={photo.title} />
				<div className="card-body">
					<p className="card-text">{photo.title}</p>
					<div className="d-flex justify-content-between align-items-center">
						<div className="btn-group">
							{isAdmin ? (
								<a
									href={`/albums/${albumId}/photos/${photo.id}/edit`}
									className="card-link btn btn-outline-info"
								>
									Edit
								</a>
							) : (
								''
							)}
						</div>
						<small className="text-muted">9 mins</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Photo;
