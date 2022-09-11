import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { HomeHomePage } from './HomeHomePage';

export const HomePages = () => {
	return (
		<Routes>
			<Route index element={<HomeHomePage />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
