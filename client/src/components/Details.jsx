import axios from "axios";
import { useEffect, useState } from "react";
import Ingredients from "./Ingredients";

export default function Details(props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const id = props.id;
  console.log("Details.jsx line 7. Parent: App.jsx. id: ", id);
  const [drink, setDrink] = useState({});

  useEffect(() => {
    async function fetchDrink() {
      try {
        const response = await axios.get(API_URL+"/cocktail/" + id);
        const data = response.data;
        console.log("response: ",response);
        console.log("response.data: ", data);
        setDrink(data);
        console.log("Details.jsx line 16. data: ", data);
        console.log("Details.jsx line 17. drink state: ", drink);
      } catch (error) {
        console.error("Failed to fetch drink:", error);
      }
    }
    fetchDrink();
  }, [id]);

  return (
    <div className="drinkMain">
      <div className="drinkTitleDiv">
        <h1 className="pageTitle ">{drink.drink}</h1>
      </div>
      <div className="drinkInfo">
        <div className="imageDiv">
          <img src={drink.image} />
        </div>
        <div className="textDiv">
          <p className="property">
            <span className="drinkName">Name:</span>
            <span className="nameData">{drink.drink}</span>
          </p>
          <p className="property">
            <span className="drinkCategory">Category:</span>
            <span className="categoryData">{drink.category}</span>
          </p>
          <p className="property">
            <span className="alcohol">Alcohol:</span>
            <span className="alcoData">{drink.alcoholic}</span>
          </p>
          <p className="property">
            <span className="glass">Glass:</span>
            <span className="glassData">{drink.glass}</span>
          </p>
          <p className="property" id="ingredients">
            <span className="ingredients">Ingredients:</span>
          </p>
          <Ingredients drink={drink} />
        </div>
      </div>
      <div className="instructionDiv">
        <p>
          <span className="instructionTitle">Instruction:</span>{" "}
          <span className="instructionText text">{drink.instructions}</span>
        </p>
      </div>
    </div>
  );
}
