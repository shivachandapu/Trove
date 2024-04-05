// import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useHistory } from 'react-router';
import { signOut } from "firebase/auth";
import { getAuth } from 'firebase/auth';


function Header({ setIsLoggedIn, userId }) {

	const history = useHistory();
	const [showUserId, setShowUserId] = useState(false);
  
	const handleAvatarClick = () => {
	  setShowUserId(!showUserId);
	};
	const handleLogout = () => {
		const auth = getAuth();
		setIsLoggedIn(false);
		signOut(auth).then(() => {
			// localStorage.removeItem('isAuthenticated');
			history.push('/login');
			alert('Signed Out!');
			console.log("Signed out successfully")
		}).catch((error) => {
			console.log(error);
		});

	};


	return (
		<div className="header">
			<div className="logo">
				<img
					src={process.env.PUBLIC_URL + '/Static/Trove_Logo.svg'}
					alt="Logo"
				/>
					<h1 style={{color:'black', fontWeight: 800, fontSize:25, fontFamily: 'Arial, sans-serif'}} >Trove</h1>
			</div>

			<div className="avatar">
				<Button
					type="submit"
					variant="contained"
					size="small"
					color="primary"
					onClick={handleLogout}
					style={{ marginRight: '10px' }}
				>
					Logout
				</Button>
				{showUserId && <p style={{color:'black', fontWeight: 80, fontSize:15, fontFamily: 'Arial, sans-serif'}} >{userId}</p>}
				<Button className="avatar" onClick={handleAvatarClick}>

					<Avatar sx={{ bgcolor: deepOrange[500] }} alt={userId[0]} src="https://avatars.githubusercontent.com/u/71482277?s=400&u=7b4cab646d2c1fa86e7cfc1e855d8d8ded26707e&v=4" >{userId[0]}</Avatar>
				</Button>
				
			</div>
		</div>
	);
}

export default Header;
