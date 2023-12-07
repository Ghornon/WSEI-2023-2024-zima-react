import React from 'react';
import { UserType } from '../types/User.types';

interface Props {
	user: UserType;
}

export const UserCard: React.FC<Props> = ({ user }) => {
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
					<a href={`/users/${user.id}`} className="btn btn-primary">
						Show profile
					</a>
					<a href={`mailto:${user.email}`} className="btn btn-outline-primary ms-1">
						Message
					</a>
				</div>
			</div>
		</div>
	);
};
