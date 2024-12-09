import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import NewsDisplay from '../Components/NewsDisplay/NewsDisplay';
import { useState, useEffect } from 'react';

const Home = (props) => {

	const user = JSON.parse(localStorage.getItem('user'))
	const [category, setCategory] = useState('general')
	const [news, setNews] = useState([])

	useEffect(() => {
		const fetchCategory = async () => {

			const email = user?.email || null;

			fetch(`http://localhost:5555/news/category`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ category, email }),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return response.json();
				})
				.then((result) => {
					setNews(result);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}

		fetchCategory()
	}, [category])

	return (
		<>
			<Navbar setCategory={setCategory} />
			<NewsDisplay news={news} title={category}/>
			<Footer />
		</>
	)
};

export default Home;
