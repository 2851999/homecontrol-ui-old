import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AirConUnit } from './AirConUnit';
import { AirConHomePage } from './AirConHomePage';
import { PageNotFound } from './PageNotFound';

export const AirConPages = () => {
	return (
		<Routes>
			<Route index={true} element={<AirConHomePage />} />
			<Route path="/unit" element={<AirConUnit />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
