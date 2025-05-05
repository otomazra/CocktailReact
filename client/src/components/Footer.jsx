export default function Footer(props) {
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
            <button onClick={props.showAbout}><a>About</a></button>
          </li>
        </ul>
      </footer>
    // </div>
  );
}
