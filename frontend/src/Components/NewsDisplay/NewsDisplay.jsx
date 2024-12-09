import './NewsDisplay.css';

import NewsItem from '../NewsItem/NewsItem';
import news_placeholder_icon from '../Assets/news-placeholder-icon.png'
import { useState } from 'react';

/* import news_json from '../TempFiles/news.json' */

const NewsDisplay = ({ news, title }) => {

	const [page, setPage] = useState(0)
	const currentNews = news.slice(page * 10, (page + 1) * 10);

	const getMaxPages = () => {
		let pages = []
		for (let i = 0; i < Math.ceil(news.length / 10); i++) {
			pages.push(i)
		}
		return pages
	}

	const changePage = (i) => {
		setPage(i)
		window.scrollTo(0, 0)
	}

	const closeSidebar = () => {
		let sidebar = document.getElementById('side_bar');
		sidebar.classList.remove('active')
	}

	return (
		<section className="news-display" onClick={closeSidebar}>
			<h1>{title}</h1>
			{news.length > 0 ? (
				<>
					<div className="newsdisplay-grid">
						{currentNews.map((article, i) => <NewsItem key={i} article={article} />)}
					</div>
					<div className="newsdisplay-page-btns">
						{getMaxPages().map((_, i) =>
							<button
								key={i}
								className={'page-btn' + (i == page ? ' active' : '')}
								onClick={() => changePage(i)}>
								{i + 1}
							</button>
						)}
					</div>
				</>
			) : (
				<>
					<div className="newsdisplay-placeholder">
						<img src={news_placeholder_icon} alt="" />
						<h2>There are no news at the moment.</h2>
					</div>
				</>
			)}
		</section>
	)
};

export default NewsDisplay;
