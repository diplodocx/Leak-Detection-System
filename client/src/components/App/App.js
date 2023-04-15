import React, { createContext, useState, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Dick from '../Dick/Dick';
import LeakList from '../../pages/Home/Home';

export default function App() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem('isLoggedIn') === 'false' ? false : true
	);

	const appLogin = () => {
		localStorage.setItem('isLoggedIn', 'true');
		setIsLoggedIn(true);
	};

	const appQuit = () => {
		localStorage.setItem('isLoggedIn', 'false');
		setIsLoggedIn(false);
		navigate('/login');
	};

	return (
		<Routes>
			<Route path='/dick' element={<Dick />} />
			{isLoggedIn ? (
				<>
					<Route
						path='/home'
						element={<LeakList page={1} onExit={appQuit} />}
					/>
				</>
			) : null}
			<Route path='/login' element={<Login onLogin={appLogin} />} />
			<Route path='/' element={<Navigate to='/login' />} />
		</Routes>
	);
}
