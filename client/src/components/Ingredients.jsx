import { useEffect } from "react";
export default function Ingredients({ drink }) {
  if (!drink.consistance || !Array.isArray(drink.consistance)) {
    return null;
  }
  useEffect(() => {
    console.log(
      "Ingredients.jsx line 6. Parent: Details. Consistance: ",
      drink.consistance
    );    
    console.log("ingredientsList: ", drink.consistance);
  });

  return (
    <ul className="ingredientList">
      {drink.consistance.map((ingredient) => (
      <li className="ingredientMeasure" key={ingredient.ingredient}>
        <span className="measure">{ingredient.measure}</span>
        <span className="ingredient">{ingredient.ingredient}</span>
      </li>))}
    </ul>
  )
}
