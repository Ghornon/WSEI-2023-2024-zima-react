import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../Store';
import { AlbumType } from '../../types/Album.types';

function AlbumsFormPage() {
	const [albums, setAlbums] = useState([] as AlbumType[]);
	const { albumId } = useParams();
	const { users } = useContext(Context);

	const [formData, setFormData] = useState({
		title: '',
		userId: '',
	});

	const handleAlbumChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	> = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleEdit = async () => {
		const updatedAlbum = {
			...formData,
			albumId: albumId,
		};

		const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedAlbum),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedAlbums = [...albums].map((album: AlbumType) => {
				if (album.id.toString() == albumId) return result;

				return album;
			});

			localStorage.setItem('albums', JSON.stringify(updatedAlbums));
			window.location.replace(`/albums/${albumId}`);
		}
	};

	const handleAdd = async () => {
		const newAlbum = {
			...formData,
		};

		const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
			method: 'album',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newAlbum),
		});

		const status = await response.ok;

		if (status) {
			const result = await response.json();

			const updatedAlbums = [...albums];
			updatedAlbums.push(result);

			localStorage.setItem('albums', JSON.stringify(updatedAlbums));
			window.location.replace(`/albums/${result.id}`);
		}
	};

	const handleRemove = async () => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const status = await response.ok;

		if (status) {
			const updatedAlbums = [...albums].filter(
				(album: AlbumType) => album.id.toString() != albumId
			);

			localStorage.setItem('albums', JSON.stringify(updatedAlbums));
			window.location.replace('/albums');
		}
	};

	useEffect(() => {
		const cache = localStorage.getItem('albums');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/albums')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('albums', JSON.stringify(res));
					if (albumId) {
						const album = res.find(
							(album: AlbumType) => album.id.toString() == albumId
						);

						setFormData({
							title: album.title,
							userId: album.userId,
						});
					}
					setAlbums(res);
				});
		} else {
			if (albumId) {
				const album = JSON.parse(cache).find(
					(album: AlbumType) => album.id.toString() == albumId
				);
				setFormData({
					title: album.title,
					userId: album.userId,
				});
			}
			setAlbums(JSON.parse(cache));
		}
	}, [albumId]);

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
								onChange={handleAlbumChange}
							/>
						</div>
						<div className="form-group">
							<label>User</label>
							<select
								className="form-select"
								value={formData.userId}
								name="userId"
								onChange={handleAlbumChange}
							>
								{users.length
									? users.map((user) => (
											<option key={user.id} value={user.id}>
												{user.name}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>
					{albumId ? (
						<div className="col">
							<button
								type="button"
								className="btn btn-outline-danger"
								onClick={handleRemove}
							>
								Remove album
							</button>
							<button
								type="button"
								className="btn btn-outline-primary"
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
								Add new album
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default AlbumsFormPage;
