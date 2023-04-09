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
		{ field: 'id', headerName: 'ID', width: 90 },
		{ field: 'mac', headerName: 'Мак адрес', width: 150 },
		{ field: 'time', headerName: 'Время', width: 250 },
	];

	return (
		<div className={classes.LeakList}>
			<DataGrid
				sx={{
					borderRadius: 0,
				}}
				rows={leaks}
				columns={columns}
				autoPageSize
			/>
		</div>
	);
}

export default LeakList;
