import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

function Header({ setIsLoggedIn }) {
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: 10,
		},
		avatar: {
			backgroundColor: 'gray',
		},
	}));

	const history = useHistory();

	const handleLogout = () => {
			setIsLoggedIn(false);
			localStorage.removeItem('isAuthenticated');
			history.push('/login');
	};

	const classes = useStyles();
	return (
		<div className="header">
			<div className="logo">
				<img
					src ={process.env.PUBLIC_URL + '/Static/Trove_Logo.svg'}
					alt="Logo"
				/>
				<h1>Trove</h1>
			</div>

			<div className="avatar">
				<Button
					type="submit"
					variant="contained"
					size="small"
					color="primary"
					className={classes.margin}
					onClick={handleLogout}
				>
					Logout
				</Button>
				<Avatar className={classes.avatar}></Avatar>
			</div>
		</div>
	);
}

export default Header;
