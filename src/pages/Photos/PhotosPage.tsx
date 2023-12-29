import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PhotoType } from '../../types/Photo.types';
import Loader from '../../components/Loader';
import Photo from '../../components/Photo';

function PhotosPage() {
	const [photos, setPhotos] = useState([] as PhotoType[]);
	const { albumId } = useParams();
	const PhotosURL = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;

	useEffect(() => {
		fetch(PhotosURL)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (Array.isArray(res)) setPhotos(res);
				else setPhotos([res]);
			});
	}, []);

	return (
		<section className="vh-100">
			<div className={photos ? 'container py-5 h-100' : 'container-fluid py-5 h-100'}>
				<div className="row d-flex h-100">
					{photos.length ? (
						photos.map((photo) => <Photo key={photo.id} photo={photo} />)
					) : (
						<Loader />
					)}
				</div>
			</div>
		</section>
	);
}

export default PhotosPage;
