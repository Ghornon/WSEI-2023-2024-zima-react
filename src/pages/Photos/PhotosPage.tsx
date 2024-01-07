import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PhotoType } from '../../types/Photo.types';
import Loader from '../../components/Loader';
import Photo from '../../components/Photo';
import { Context } from '../../Store';

function PhotosPage() {
	const [photos, setPhotos] = useState([] as PhotoType[]);
	const { albumId } = useParams();

	const { isAdmin } = useContext(Context);

	const [filter, setFilter] = useState('');

	const handleFilterOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setFilter(event.target.value);
	};
	useEffect(() => {
		const cache = localStorage.getItem('photos');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/photos')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('photos', JSON.stringify(res));

					setPhotos(res);
				});
		} else {
			setPhotos(JSON.parse(cache));
		}
	}, []);

	return (
		<section className="vh-100">
			<div className={photos ? 'container py-5 h-100' : 'container-fluid py-5 h-100'}>
				<div className="row">
					<div className="col">
						<nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="/">Home</a>
								</li>
								<li className="breadcrumb-item">
									<a href="/albums">Albums</a>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									Photos
								</li>
							</ol>
							<input
								className="form-control me-sm-2"
								type="search"
								placeholder="Search"
								value={filter}
								onChange={handleFilterOnChange}
							/>

							{isAdmin ? (
								<div className="col pt-3">
									<a
										href={`/albums/${albumId}/photos/new`}
										className="btn btn-outline-primary"
									>
										Add new photo
									</a>
								</div>
							) : (
								''
							)}
						</nav>
					</div>
				</div>
				<div className="row d-flex h-100">
					{photos.length ? (
						photos
							.filter((photo) => photo.albumId.toString() == albumId)
							.filter((photo) => {
								if (filter === '') {
									return photo;
								} else if (
									photo.title.toLowerCase().includes(filter.toLowerCase())
								) {
									return photo;
								}
							})
							.map((photo) => <Photo key={photo.id} photo={photo} />)
					) : (
						<Loader />
					)}
				</div>
			</div>
		</section>
	);
}

export default PhotosPage;
