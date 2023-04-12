import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Dick from '../Dick/Dick';
import LeakList from '../../pages/LeakList/LeakList';

export default function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/dick' element={<Dick />} />
			<Route path='/home' element={<LeakList page={1} />} />
			<Route path='/' element={<Navigate to='/login' />} />
		</Routes>
	);
}
