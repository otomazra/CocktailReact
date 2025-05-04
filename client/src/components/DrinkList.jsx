export default function DrinkList({ arrayOfDrinks, detailsFunction, drinkIdFunction }) {

  

  if (!arrayOfDrinks || arrayOfDrinks.length === 0) {
    return <p>No drinks found try another search</p>;
  } else {
    console.log(arrayOfDrinks);
    return (
      <div className="cocktailList">
        {arrayOfDrinks.map((cocktail) => {
          {
            console.log(cocktail);
          }
          return (
            <div className="indexCocktail" onClick={()=>{detailsFunction(); drinkIdFunction(cocktail.id);}} key={cocktail.id}>
              <img
                src={cocktail.image}
                alt={cocktail.drink + "img"}
                className="indexCocktailImg"
              />
              <h3 className="indexCategory">{cocktail.category}</h3>
              <h2 className="indexCocktailTitle">{cocktail.drink}</h2>
            </div>
          );
        })}
      </div>
    );
  }
}
