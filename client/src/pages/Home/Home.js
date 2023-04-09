import React from 'react';
import classes from './Home.module.css';
import { Pagination } from '@mui/material';
import LeakList from '../../components/LeakList/LeakList';

function Home() {
	return (
		<div className={classes.Home}>
			<div className={classes.container}>
				<h1>Протечки</h1>
				<LeakList page={1} />
			</div>
		</div>
	);
}

export default Home;
