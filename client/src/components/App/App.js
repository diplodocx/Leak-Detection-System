import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import SignIn from '../../pages/Example';
import Dick from '../Dick/Dick';

export default function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/signin' element={<SignIn />} />
			<Route path='/dick' element={<Dick />} />
			<Route path='/' element={<Navigate to='/login' />} />
		</Routes>
	);
}
