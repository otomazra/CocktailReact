export default function Header() {
  return (
    <>
      <div className="container">
        {/* <header> */}
        <a className="homeLink" href="/">
          <span className="banner">
            Cocktail <span className="db">DB</span>
          </span>
        </a>
        <ul className="navigationList">
          <li>
            <a href="/" id="homePage">
              Home
            </a>
          </li>
          <li>
            <a id="aboutButton" href="/about">
              About
            </a>
          </li>
        </ul>
        {/* </header> */}
      </div>
    </>
  );
}
