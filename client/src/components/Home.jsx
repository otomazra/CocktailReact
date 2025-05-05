import axios from "axios";
import { useState, useEffect } from "react";
import DrinkList from "./DrinkList";

export default function Home(props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [drinksArray, setDrinksArray] = useState([]);
  const [drink, setDrink] = useState("");


  useEffect(() => {
    receiveDrinks();
  }, []);

  useEffect(() => {
    console.log(drinksArray);
  }, [drinksArray]);

  const receiveDrinks = async () => {
    const result = await axios.get(API_URL);
    setDrinksArray([...result.data]);
  };

  const handleChange = async (event) => {
    
    setDrinksArray([]);

    let drinkName = event.target.value;
    setDrink(drinkName);
    if(drinkName.trim()===""){
      receiveDrinks();
    }
    try {
      const result = await axios.post(API_URL+"/search", { search: drinkName });
      console.log(result);
      setDrinksArray(result.data);
    } catch (error) {
      console.error("Search failed:", error);
      setDrinksArray([]); // or set an error state
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(drink);
    const result = await axios.post(API_URL+"/search", { search: drink });
    console.log(result);
    setDrinksArray(result.data);
  };

  return (
    <>
      <div className="searchDiv">
        <form onSubmit={handleSubmit}>
          <div id="search">
            <label className="searchLabel" htmlFor="search">
              Search for the Cocktail
            </label>
            <input
              value={drink}
              onChange={handleChange}
              type="search"
              name="search"
              id="searchArea"
              placeholder="Find your favourite cocktail"
            />
          </div>
        </form>
      </div>
      {drink || drink != undefined ? (
        <DrinkList arrayOfDrinks={drinksArray}
         detailsFunction={props.detailsFunction} drinkIdFunction={props.drinkIdFunction} />
      ) : (
        <p>No drinks found, try to search again</p>
      )}
    </>
  );
}
