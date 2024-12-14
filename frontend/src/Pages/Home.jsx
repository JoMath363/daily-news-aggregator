import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import NewsDisplay from '../Components/NewsDisplay/NewsDisplay';
import { useState, useEffect } from 'react';
import { useGlobalRequest } from '../Contexts/RequestContext';

const Home = (props) => {

	const user = JSON.parse(localStorage.getItem('user'))
	const apiUrl = import.meta.env.VITE_API_URL;

	const { request, setRequest } = useGlobalRequest();
	const [news, setNews] = useState([])

	useEffect(() => {
		function fetchNews() {
			const requestType = request[1];

			requestType == 'category' ? fetchCategory() : fetchSearch()
		}

		const fetchCategory = async () => {
			try {
				const email = user?.email ?? null;
				const category = request[0]; 

				const response = await fetch(`${apiUrl}/news/category`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ category, email }),
				});

				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

				const result = await response.json();
				setNews(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		const fetchSearch = async () => {
			try {
				const email = user?.email ?? null;
				const search = request[0]; 

				const response = await fetch(`${apiUrl}/news/search`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ search, email }),
				});

				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

				const result = await response.json();
				setNews(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchNews();
	}, [request])

	return (
		<>
			<Navbar setRequest={setRequest} />
			<NewsDisplay news={news} title={request[0]} />
			<Footer />
		</>
	)
};

export default Home;

