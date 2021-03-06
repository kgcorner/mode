import React from 'react';

import UserProfilePicture from './UserProfilePicture'
import UserName from './UserName'


class UserInfoDisplay extends React.Component {
	render() {
		return (
			<div className="user-info-wrapper">
				<UserProfilePicture />
				<UserName />
			</div>
		)
	}
}

export default UserInfoDisplay