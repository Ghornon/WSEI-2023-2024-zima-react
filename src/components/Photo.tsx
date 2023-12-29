import { PhotoType } from '../types/Photo.types';

interface Props {
	photo: PhotoType;
}

const Photo: React.FC<Props> = ({ photo }) => {
	return (
		<div className="col-md-4">
			<div className="card mb-4 box-shadow">
				<img className="card-img-top" src={photo.url} alt={photo.title} />
				<div className="card-body">
					<p className="card-text">{photo.title}</p>
					<div className="d-flex justify-content-between align-items-center">
						<div className="btn-group">
							<button type="button" className="btn btn-sm btn-outline-primary">
								View
							</button>
							<button type="button" className="btn btn-sm btn-outline-secondary">
								Edit
							</button>
						</div>
						<small className="text-muted">9 mins</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Photo;
