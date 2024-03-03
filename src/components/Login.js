
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = ({ setIsAuthenticated }) => {
	const history = useHistory();
	const auth = getAuth();
	
	// state Variables
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidated, setIsValidated] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [isPasswordVisible, setPasswordVisibility] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const [userId, setUserId] = useState('');
	
	// Functions
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
	}));
	const classes = useStyles();

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
		setPasswordVisibility(true);
	};

	const handleMouseUpPassword = (event) => {
		event.preventDefault();
		setPasswordVisibility(false);
	};

	const postLogin = async (e) => {
		e.preventDefault();
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		// setUserId(user.email);
		if (user || isLoggedIn) {
			setIsAuthenticated(true);
			setIsLoggedIn(true);
			history.push('/home');
			console.log("Login Successful!")
		} else {
			// history.push('/home');
			setIsValidated(false);
			console.log("Login Failed!")
		}
	};
 
	const validateCreds = (e) => {
		e.preventDefault();

		// email regex
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
		// password regex
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (emailRegex.test(email) && passwordRegex.test(password)) {
			setIsValidated(true);
			postLogin(e);
		} else {
			setIsValidated(false);
		}
		setIsClicked(true);
	};

	return (
		<div className="login-container">
			<form className="login-form">
				<div className="form-header">
					<img
						className="form-logo"
						src={process.env.PUBLIC_URL + '/Static/Trove_Logo.svg'}
						alt="Trove Logo"
					/>
					<h3 className="form-title">Login</h3>
				</div>
				<TextField
					id="outlined-full-width login-email"
					label="Email"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: true } : {})}
					placeholder="Email"
					fullWidth margin="normal"
					InputLabelProps={{ shrink: true, }}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => { setEmail(e.target.value); }}
				/>
				<TextField
					id="outlined-full-width login-password"
					type={isPasswordVisible ? 'text' : 'password'}
					label="Password"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: true } : {})}
					placeholder="Password"
					fullWidth
					margin="normal"
					InputLabelProps={{ shrink: true, }}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => { setPassword(e.target.value); }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									onMouseLeave={handleMouseUpPassword}

									edge="end"
								>
									{isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<div className="links-div">
					<a href="/register" className="forgot-password">
						Don't have an Account? Register Now.
					</a>
				</div>

				<Button
					type="submit"
					variant="contained"
					size="medium"
					color="primary"
					className={classes.margin}
					onClick={validateCreds}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
