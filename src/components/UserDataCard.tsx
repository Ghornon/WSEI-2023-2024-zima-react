import React from 'react';
import { UserType } from '../types/User.types';

interface Props {
	user: UserType;
}

export const UserDataCard: React.FC<Props> = ({ user }) => {
	return (
		<div className="card mb-4">
			<div className="card-body">
				<div className="row">
					<div className="col-sm-3">
						<p className="mb-0">Full Name</p>
					</div>
					<div className="col-sm-9">
						<p className="text-muted mb-0">{user.name}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<p className="mb-0">Email</p>
					</div>
					<div className="col-sm-9">
						<p className="text-muted mb-0">{user.email}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<p className="mb-0">Phone</p>
					</div>
					<div className="col-sm-9">
						<p className="text-muted mb-0">{user.phone}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<p className="mb-0">Address</p>
					</div>
					<div className="col-sm-9">
						<p className="text-muted mb-0">
							{user.address.street +
								' ' +
								user.address.suite +
								'; ' +
								user.address.zipcode +
								'; ' +
								user.address.city}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
