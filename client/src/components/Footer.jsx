export default function Footer() {
  return (
    // <div className="footerContainer">
      <footer id="footer">
        <a href="/">
          <p className="banner">
            Cocktail <span className="db">DB</span>
          </p>
        </a>
        <p className="footerText">© 2024 Made with ❤️ by Oto Mazra</p>
        <ul className="navigationList">
          <li className="homeLink">
            <a href="/">Home</a>
          </li>
          <li className="aboutLink">
            <a href="/about">About</a>
          </li>
        </ul>
      </footer>
    // </div>
  );
}
