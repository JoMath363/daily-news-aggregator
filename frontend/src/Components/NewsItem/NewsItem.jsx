import './NewsItem.css';

import news_default from '../Assets/news-default.png'
import empty_star_icon from '../Assets/empty-star-icon.png'
import full_star_icon from '../Assets/full-star-icon.png'
import { useState } from 'react';


const NewsItem = ({ article }) => {
    const [favorited, setFavorited] = useState(article.isFavorited)
    const user = JSON.parse(localStorage.getItem('user'))

    const addFavorite = () => {
        const email = user.email;

        fetch('http://localhost:5555/favorites/add', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, article }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                const userData = {
                    name: data.name,
                    email: data.email,
                    favorites: data.favorites
                }

                console.log(userData)

                localStorage.setItem('user', JSON.stringify(userData));
            })
            .catch((error) => console.error(error));

        setFavorited(true)
    }

    const removeFavorite = () => {
        const email = user.email;
        const title = article.title;

        fetch('http://localhost:5555/favorites/remove', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, title }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                const userData = {
                    name: data.name,
                    email: data.email,
                    favorites: data.favorites
                }

                console.log(userData)

                localStorage.setItem('user', JSON.stringify(userData));
            })
            .catch((error) => console.error(error));

        setFavorited(false)
    }

    const openUrl = () => {
        window.open(article.url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className='news-item'>
            <img className='news-item-image' onClick={openUrl} src={article.urlToImage || news_default} />
            <div className="container">
                <div className="top">
                    <h2 className="title" onClick={openUrl}>{article.title}</h2>
                    <p className="description">{article.description}</p>
                </div>
                <div className='bottom'>
                    <div className="info">
                        <p className="date">{article.publishedAt}</p>
                        <p className="source">Source: {article.source.name}</p>
                    </div>

                    {user ? (
                        <img className={'favorite'} src={favorited ? full_star_icon : empty_star_icon}
                            onClick={() => favorited ? removeFavorite() : addFavorite()} />
                    ) : (
                        null
                    )}

                </div>
            </div>
        </div>
    )
};

export default NewsItem;
