import './Footer.css';

import linkedin_icon from '../Assets/linkedin-icon.png'
import github_icon from '../Assets/github-icon.png'

const Footer = (props) => {
    return (
        <footer id="footer">
            <div id="about">
                <h2>About Daily News</h2>
                <p>
                    Daily News aggregates top headlines from trusted sources in real-time,
                    all in one place with a simple, responsive interface.
                </p>
                <p>
                    The news content provided on Daily News is sourced through <a href="https://newsapi.org/" target="_blank">NewsAPI</a>,
                    which gathers data from a wide range of reliable and reputable news outlets,
                    ensuring up-to-date information from across the globe.
                </p>
            </div>

            <div id="credits">
                <h3>Developed by: José Mathias </h3>
                <div id="contact">
                    <a><img src={linkedin_icon} alt="Linkedin"/></a>
                    <a href="https://github.com/JoMath363" target="_blank"><img src={github_icon} alt="Gituub"/></a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
