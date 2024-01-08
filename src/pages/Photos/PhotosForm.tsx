import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PhotoType } from '../../types/Photo.types';

function PhotosFormPage() {
	const [photos, setPhotos] = useState([] as PhotoType[]);
	const { albumId, photoId } = useParams();

	const [formData, setFormData] = useState({
		title: '',
		url: '',
		thumbnailUrl: '',
	});

	const handleAlbumsChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	> = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleEdit = async () => {
		const updatedPhoto = {
			...formData,
			albumId: albumId,
		};

		const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedPhoto),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedPhotos = [...photos].map((photo: PhotoType) => {
				if (photo.id.toString() == photoId) return result;

				return photo;
			});

			localStorage.setItem('photos', JSON.stringify(updatedPhotos));
			window.location.replace(`/albums/${albumId}/photos`);
		}
	};

	const handleAdd = async () => {
		const newPhoto = {
			...formData,
			albumId: albumId,
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newPhoto),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			console.log(result);

			const updatedPhotos = [...photos];
			updatedPhotos.push(result);

			localStorage.setItem('photos', JSON.stringify(updatedPhotos));
			window.location.replace(`/albums/${albumId}/photos`);
		}
	};

	const handleRemove = async () => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const status = await response.ok;

		if (status) {
			const updatedPhotos = [...photos].filter(
				(photo: PhotoType) => photo.id.toString() != photoId
			);

			localStorage.setItem('photos', JSON.stringify(updatedPhotos));
			window.location.replace(`/albums/${albumId}/photos`);
		}
	};

	useEffect(() => {
		const cache = localStorage.getItem('photos');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/photos')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('photos', JSON.stringify(res));
					if (photoId) {
						const photo = res.find(
							(photo: PhotoType) => photo.id.toString() == photoId
						);

						setFormData({
							title: photo.title,
							url: photo.url,
							thumbnailUrl: photo.thumbnailUrl,
						});
					}
					setPhotos(res);
				});
		} else {
			if (photoId) {
				const photo = JSON.parse(cache).find(
					(photo: PhotoType) => photo.id.toString() == photoId
				);
				setFormData({
					title: photo.title,
					url: photo.url,
					thumbnailUrl: photo.thumbnailUrl,
				});
			}
			setPhotos(JSON.parse(cache));
		}
	}, [photoId]);

	return (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row d-flex h-100">
					<div className="body">
						<div className="form-group">
							<label>Title</label>
							<input
								type="text"
								className="form-control"
								name="title"
								value={formData.title}
								onChange={handleAlbumsChange}
							/>
						</div>
						<div className="form-group">
							<label>URL</label>
							<input
								type="text"
								className="form-control"
								name="url"
								value={formData.url}
								onChange={handleAlbumsChange}
							/>
						</div>
						<div className="form-group">
							<label>Thumbnail URL</label>
							<input
								type="text"
								className="form-control"
								name="thumbnailUrl"
								value={formData.thumbnailUrl}
								onChange={handleAlbumsChange}
							/>
						</div>
					</div>
					{photoId ? (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-danger"
								onClick={handleRemove}
							>
								Remove photo
							</button>
							<button
								type="button"
								className="btn btn-outline-primary ms-1"
								onClick={handleEdit}
							>
								Save changes
							</button>
						</div>
					) : (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-success"
								onClick={handleAdd}
							>
								Add new photo
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default PhotosFormPage;
