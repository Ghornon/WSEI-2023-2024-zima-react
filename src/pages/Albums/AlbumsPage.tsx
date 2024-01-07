import { useState, useEffect, useContext } from 'react';
import Album from '../../components/Album';
import Loader from '../../components/Loader';
import { AlbumType } from '../../types/Album.types';
import { Context } from '../../Store';

function AlbumPage() {
	const [albums, setAlbums] = useState([] as AlbumType[]);
	const { isAdmin } = useContext(Context);

	const [filter, setFilter] = useState('');

	const handleFilterOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setFilter(event.target.value);
	};

	useEffect(() => {
		const cache = localStorage.getItem('albums');
		if (cache === null) {
			fetch('https://jsonplaceholder.typicode.com/albums')
				.then((response) => response.json())
				.then((res) => {
					localStorage.setItem('albums', JSON.stringify(res));

					setAlbums(res);
				});
		} else {
			setAlbums(JSON.parse(cache));
		}
	}, []);

	return (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row">
					<div className="col">
						<nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="/">Home</a>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									Albums
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
									<a href={'/albums/new'} className="btn btn-outline-primary">
										Add new album
									</a>
								</div>
							) : (
								''
							)}
						</nav>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<table className="table mb-0">
							<thead>
								<tr>
									<th scope="col">USer</th>
									<th scope="col">Title</th>
									{isAdmin ? <th scope="col">Actions</th> : ''}
								</tr>
							</thead>
							<tbody>
								{albums.length > 0 ? (
									albums
										.filter((album) => {
											if (filter === '') {
												return album;
											} else if (
												album.title
													.toLowerCase()
													.includes(filter.toLowerCase())
											) {
												return album;
											}
										})
										.map((album: AlbumType) => (
											<Album key={album.id} album={album} />
										))
								) : (
									<Loader />
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AlbumPage;
