import React, { useEffect, useState } from 'react';
import classes from './LeakList.module.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function LeakList() {
	const [leaks, setLeaks] = useState([]);

	useEffect(() => {
		axios.get('/leaks').then((res) => {
			console.log(res);
			const leakData = res.data.leak_data;
			const newLeaks = leakData.map((leak, index) => {
				return { id: leak._id, mac: leak.mac, time: leak.time };
			});

			setLeaks(newLeaks);
		});
	}, []);

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 150,
			headerClassName: classes.idHeader,
		},
		{
			field: 'mac',
			headerName: 'Мак адрес',
			width: 150,
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
			<DataGrid
				sx={{
					'& .MuiDataGrid-columnHeaders': {
						paddingLeft: '20px',
					},
					'& .MuiDataGrid-virtualScrollerRenderZone': {
						paddingLeft: '20px',
					},
					borderBottomLeftRadius: '16px',
					borderBottomRightRadius: '16px',
				}}
				rows={leaks}
				columns={columns}
				autoPageSize
			/>
		</div>
	);
}

export default LeakList;
