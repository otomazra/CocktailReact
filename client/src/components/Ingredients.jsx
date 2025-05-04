import { useEffect } from "react";

export default function Ingredients({ drink }) {

console.log(drink);
  const consistance = drink.consistance;
  console.log(consistance);
  let ingredientsList; 
  function ingrTags(){
    ingredientsList = consistance.map(ingredient=>(
            <li className="ingredientMeasure" key={drink.id}>
              <span className="measure">{ingredient.measure}</span>
              <span className="ingredient">{ingredient.ingredient}</span>
            </li>
    ))
  }
  return <ul className="ingredientList">{ingredientsList}</ul>;
}
