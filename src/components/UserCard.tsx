import React, { useContext } from 'react';
import { UserType } from '../types/User.types';
import { useParams } from 'react-router-dom';
import { Context } from '../Store';

interface Props {
	user: UserType;
}

export const UserCard: React.FC<Props> = ({ user }) => {
	const { userId } = useParams();
	const { isAdmin } = useContext(Context);
	return (
		<div className="card mb-4">
			<div className="card-body text-center">
				<img
					src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
					alt="avatar"
					className="rounded-circle img-fluid"
				/>
				<h5 className="my-3">{user.name}</h5>
				<p className="text-muted mb-1">{user.company.bs}</p>
				<p className="text-muted mb-4">{user.company.name}</p>
				<div className="d-flex justify-content-center mb-2">
					{userId ? (
						''
					) : (
						<a href={`/users/${user.id}`} className="btn btn-primary">
							Show profile
						</a>
					)}
					<a href={`mailto:${user.email}`} className="btn btn-outline-primary ms-1">
						Message
					</a>
					{isAdmin ? (
						<a href={`/users/${user.id}/edit`} className="btn btn-outline-info ms-1">
							Edit
						</a>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};
