import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { RoomsPage } from './RoomsPage';

export const RoomPages = () => {
	return (
		<Routes>
			<Route index element={<RoomsPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
