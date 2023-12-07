import React from 'react';
import { UserType } from '../types/User.types';

interface Props {
	user: UserType;
}

export const UserLinksCard: React.FC<Props> = ({ user }) => {
	return (
		<div className="card mb-4 mb-lg-0">
			<div className="card-body p-0">
				<ul className="list-group list-group-flush rounded-3">
					<li className="list-group-item d-flex justify-content-between align-items-center p-3">
						<i className="bi bi-globe"></i>
						<p className="mb-0">{user.website}</p>
					</li>
					<li className="list-group-item d-flex justify-content-between align-items-center p-3">
						<i className="bi bi-envelope"></i>
						<p className="mb-0">{user.email}</p>
					</li>
				</ul>
			</div>
		</div>
	);
};
