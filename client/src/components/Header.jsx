export default function Header({showAbout}) {


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
            <a id="aboutButton" onClick={showAbout}>
              About
            </a>
          </li>
        </ul>
        {/* </header> */}
      </div>
    </>
  );
}
