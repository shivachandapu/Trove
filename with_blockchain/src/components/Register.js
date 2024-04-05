import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../firebase";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
	const history = useHistory();
	const auth = getAuth();

	// State Variables
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [conformPassword, setConformPassword] = useState('');
	const [isValidated, setIsValidated] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [isPasswordVisible, setPasswordVisibility] = useState(false);
	const [isConformPasswordVisible, setConformPasswordVisibility] = useState(false);
	// Functions
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
	}));

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
		setPasswordVisibility(true);
	};

	const handleMouseUpPassword = () => {
		setPasswordVisibility(false);
	};

	const handleMouseDownConformPassword = (event) => {
		event.preventDefault();
		setConformPasswordVisibility(true);
	};

	const handleMouseUpConformPassword = () => {
		setConformPasswordVisibility(false);
	};

	const classes = useStyles();

	const postRegister = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				setIsValidated(true);
				history.push('/login');
				console.log("User Registered!")
			} else {
				setIsValidated(false);
			}
		} catch (error) {
			console.error(error);
			setIsValidated(false);
		}
	};

	const validateCreds = (e) => {
		e.preventDefault();

		// email regex
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
		// password regex
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		
		if ((password === conformPassword) && emailRegex.test(email) && passwordRegex.test(password) && passwordRegex.test(conformPassword)) {
			setIsValidated(true);
			postRegister(e);
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
						alt="Drive Logo"
					/>
					<h3 className="form-title">Register</h3>
				</div>
				{/* <TextField
					id="outlined-full-width"
					label="Name"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: true } : {})}
					placeholder="Name"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/> */}
				<TextField
					id="outlined-full-width"
					label="Email"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: true } : {})}
					placeholder="Email"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<TextField
					id="outlined-full-width"
					type={isPasswordVisible ? 'text' : 'password'} // Toggle password visibility
					label="Password"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: true } : {})}
					placeholder="Password"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									onMouseLeave={handleMouseUpPassword}
									// onClick={togglePasswordVisibility}
									edge="end"
								>
									{isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					id="outlined-full-width"
					type={isConformPasswordVisible ? 'text' : 'password'}
					label="Password"
					style={{ margin: 8 }}
					{...(!isValidated && isClicked ? { error: true } : {})}
					placeholder="Conform Password"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					autoComplete="off"
					variant="outlined"
					onChange={(e) => {
						setConformPassword(e.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onMouseDown={handleMouseDownConformPassword}
									onMouseUp={handleMouseUpConformPassword}
									onMouseLeave={handleMouseUpConformPassword}
									edge="end"
								>
									{isConformPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<div className="links-div">
					<a href="/login" className="forgot-password">
						Already Have an Account? Login.
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
					Register
				</Button>
			</form>
		</div>
	);
};

export default Register;
