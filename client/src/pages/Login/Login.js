import React, { useState } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
	const navigate = useNavigate();
	const [username, setUsername] = useState({
		value: '',
	});
	const [password, setPassword] = useState({
		value: '',
	});

	const textFieldStyle = {
		width: '100%',
		marginBottom: '18px',
		'& label.Mui-focused': {
			color: '#0fbd43',
		},
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: '#0fbd43',
			},
		},
	};

	const ButtonGreen = styled(Button)({
		backgroundColor: '#0fbd43',
		'&:hover': {
			backgroundColor: '#0b8e32',
		},
	});

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const onChangePasswordHandler = (event) => {
		setPassword({
			value: event.target.value,
		});
	};

	const onChangeUsernameHandler = (event) => {
		setUsername({
			value: event.target.value,
		});
	};

	async function loginHandler() {
		const inputData = {
			password: password.value,
			username: username.value,
		};

		const response = await axios.post('/login', inputData);

		const isUsernameCorrect = response.data.checkU.isUCorrect;
		const isPasswordCorrect = response.data.checkP.isPCorrect;

		if (isUsernameCorrect && isPasswordCorrect === true) {
			navigate('/home');
			onLogin();
		} else {
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			loginHandler();
		}
	}

	return (
		<div className={classes.Login}>
			<div className={classes.container}>
				<form className={classes.authForm} onSubmit={submitHandler}>
					<h1>Вход в приложение</h1>
					<p>
						Нет аккаунта?{' '}
						<NavLink
							to='/dick'
							style={{
								color: 'blue',
								textDecoration: 'underline',
								cursor: 'pointer',
							}}
						>
							Тогда мне тебя жаль чел
						</NavLink>
					</p>
					<hr />
					<TextField
						className={classes.Input}
						sx={textFieldStyle}
						variant='outlined'
						label='Имя пользователя'
						type='text'
						value={username.value}
						onChange={onChangeUsernameHandler}
						onKeyDown={handleKeyDown}
					/>
					<TextField
						className={classes.Input}
						sx={textFieldStyle}
						variant='outlined'
						label='Пароль'
						type='password'
						value={password.value}
						onChange={onChangePasswordHandler}
						onKeyDown={handleKeyDown}
					/>
					<FormControlLabel
						sx={{ marginBottom: '15px', marginTop: '-8px' }}
						control={<Checkbox value='remember' color='primary' />}
						label='Запомнить меня'
					/>
					<ButtonGreen variant='contained' onClick={loginHandler}>
						Войти
					</ButtonGreen>
				</form>
			</div>
		</div>
	);
}

export default Login;
