import React from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();

	const ButtonGreen = styled(Button)({
		backgroundColor: '#0fbd43',
		'&:hover': {
			backgroundColor: '#0b8e32',
		},
	});

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const useGoHome = () => {
		navigate('/home');
	};

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
						sx={{
							width: '100%',
							'& label.Mui-focused': {
								color: '#0fbd43',
							},
							'& .MuiOutlinedInput-root': {
								'&.Mui-focused fieldset': {
									borderColor: '#0fbd43',
								},
							},
						}}
						variant='outlined'
						label='Пароль'
						type='password'
					/>
					<FormControlLabel
						sx={{ marginBottom: '15px', marginTop: '8px' }}
						control={<Checkbox value='remember' color='primary' />}
						label='Запомнить меня'
					/>
					<ButtonGreen variant='contained' onClick={useGoHome}>
						Войти
					</ButtonGreen>
				</form>
			</div>
		</div>
	);
}

export default Login;
