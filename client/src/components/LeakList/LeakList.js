import React, { useEffect, useState } from 'react';
import classes from './LeakList.module.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function LeakList() {
	const [leaks, setLeaks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get('/leaks').then((res) => {
			console.log(res);
			const leakData = res.data.leak_data;
			const newLeaks = leakData.map((leak, index) => {
				return { id: leak._id, mac: leak.mac, time: leak.time };
			});

			setLeaks(newLeaks);
			setLoading(false);
		});
	}, []);

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 100,
			headerClassName: classes.idHeader,
		},
		{
			field: 'mac',
			headerName: 'Мак адрес',
			width: 200,
			headerClassName: 'mac-header',
		},
		{
			field: 'time',
			headerName: 'Время',
			width: 250,
			headerClassName: 'time-header',
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
							'& .MuiDataGrid-columnHeaders': {
								paddingLeft: '2.5%',
							},
							'& .MuiDataGrid-virtualScrollerRenderZone': {
								paddingLeft: '2.5%',
							},
							borderBottomLeftRadius: '16px',
							borderBottomRightRadius: '16px',
						}}
						rows={leaks}
						columns={columns}
						autoPageSize
					/>
				)}
			</div>
		</div>
	);
}

export default LeakList;
