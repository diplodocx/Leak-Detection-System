import React, { useEffect, useState } from 'react';
import classes from './LeakList.module.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';

function parseDate(date) {
	const dateString = date.split(' ')[0];
	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];

	const dateParts = dateString.split('-');
	const year = dateParts[0];
	const month = months[parseInt(dateParts[1]) - 1];
	const day = parseInt(dateParts[2]);

	return `${day} ${month} ${year}`;
}

const ButtonGreen = styled(Button)({
	backgroundColor: '#0fbd43',
	'&:hover': {
		backgroundColor: '#0b8e32',
	},
});

function LeakList({ onExit }) {
	const [leaks, setLeaks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get('/leaks').then((res) => {
			const leakData = res.data.leak_data;
			const newLeaks = leakData.map((leak, index) => {
				const leakDate = parseDate(leak.time);
				const leakTime = leak.time.replace(/\.[0-9]*/, '').split(' ')[1];

				return {
					id: leak._id,
					mac: leak.mac,
					time: `${leakTime}, ${leakDate}`,
				};
			});

			setLeaks(newLeaks);
			setLoading(false);
		});
	}, []);

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 110,
		},
		{
			field: 'mac',
			headerName: 'Мак адрес',
			width: 200,
		},
		{
			field: 'time',
			headerName: 'Время',
			width: 200,
		},
	];

	return (
		<div className={classes.LeakList}>
			<div className={classes.container}>
				<h1>Протечки</h1>
				{loading ? (
					<CircularProgress className={classes.Progress} color='success' />
				) : (
					<DataGrid
						sx={{
							'&:nth-of-type(1) .MuiDataGrid-main': {
								paddingLeft: '5%',
								paddingRight: '5%',
							},
							borderTopLeftRadius: '0px',
							borderTopRightRadius: '0px',
							borderBottomLeftRadius: '16px',
							borderBottomRightRadius: '16px',
						}}
						rows={leaks}
						columns={columns}
						autoPageSize
					/>
				)}
				<ButtonGreen variant='contained' onClick={onExit}>
					Выыыйти
				</ButtonGreen>
			</div>
		</div>
	);
}

export default LeakList;
