import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Album from '../../components/Album';
import Loader from '../../components/Loader';
import { AlbumType } from '../../types/Album.types';

function AlbumPage() {
	const [albums, setAlbums] = useState([] as AlbumType[]);
	const { albumId } = useParams();
	const AlbumURL = `https://jsonplaceholder.typicode.com/albums${albumId ? '/' + albumId : ''}`;

	useEffect(() => {
		fetch(AlbumURL)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (Array.isArray(res)) setAlbums(res);
				else setAlbums([res]);
			});
	}, []);

	return (
		<section className="vh-100">
			<div className={albums ? 'container py-5 h-100' : 'container-fluid py-5 h-100'}>
				<div className="row d-flex h-100">
					<div className="list-group">
						{albums.length > 0 ? (
							albums.map((album: AlbumType) => <Album key={album.id} album={album} />)
						) : (
							<Loader />
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default AlbumPage;
