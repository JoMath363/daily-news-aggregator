import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import NewsDisplay from "../Components/NewsDisplay/NewsDisplay";

import { useState, useEffect } from 'react'

const Favorites = (props) => {

	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('user'));

		if (storedUser) {
			setFavorites(storedUser.favorites.reverse());
		}
	}, []);

	return (
		<>
			<Navbar setCategory={() => { }} />
			<NewsDisplay news={favorites} title='Favorites'/>
			<Footer />
		</>
	)
};

export default Favorites;
