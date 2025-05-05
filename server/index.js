import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import _ from "lodash";
import cors from "cors";

const app = express();


app.use(cors({
  origin: "https://cocktailreact-1.onrender.com", 
  methods: ["GET", "POST"],
}));

const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
let key = 1;
const API_URL = `https://www.thecocktaildb.com/api/json/v1/${key}/`;

function mapDrinkData(drink) {
  console.log(drink.strDrinkThumb);
  console.log(drink.strDrink);
  console.log(drink.strCategory);
  return {
    id: drink.idDrink,
    image: drink.strDrinkThumb,
    drink: drink.strDrink,
    category: drink.strCategory,
  };
}

//Home page with the search area and some random drinks
app.get("/", async (req, res) => {
  try {
    // Each axios request of the random drink shows only one random drink,
    // so for 20 of them on one page we need the 'for' cycle.
    const result = []; // To save all of the random drinks
    for (let i = 0; i < 20; i++) {
      const response = await axios.get(API_URL + "random.php");
      const beverage = response.data.drinks[0];
      const check = result.find((drink) => drink.idDrink === beverage.idDrink);
      if (check) {
        i--;
        continue;
      }
      result.push(beverage);
      console.log(`${i + 1} session works`); // Making sure everything is going correct
    }
    let dataArray = []; // To save the necessary information about each drink.
    for (let i = 0; i < result.length; i++) {
      const info = result[i];
      if (info && info != undefined) {
        console.log("info is real");
        const dataObj = {
          // We create an object for each drink with only the necessar information that we need.
          id: info.idDrink, //we get single element arrays on every request.
          image: info.strDrinkThumb, //that is why we need to specify the index 0.
          drink: info.strDrink,
          category: info.strCategory,
        };
        dataArray.push(dataObj);
      } else {
        continue;
      }
      // Turning JSON object into a string
      console.log(JSON.stringify(result[i].strDrink));
    }
    if (Array.isArray(dataArray) && dataArray.length > 0) {
      console.log(dataArray);
      res.json(dataArray);
    } else res.json("No drink matches your search");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Getting details about the clicked or searched by id drink
app.get("/cocktail/:id", async (req, res) => {
  //Recieving the drink id from the index.ejs file
  let cocktailId = req.params.id;
  console.log("ID: ",cocktailId);
  try {
    const result = await axios.get(API_URL + "lookup.php?i=" + cocktailId);
    let info = result.data.drinks;
    if (info) {
      let drink = result.data.drinks[0];
      let consistanceArray = []; //Array for the ingredeints together with the measures
      let measure;
      let ingredient;
      for (let i = 1; i <= 15; i++) {
        //strIngredient1...strIngredeint15.

        measure = drink["strMeasure" + i];
        ingredient = drink["strIngredient" + i];
        if (!measure) {
          //There are measureless ingredients so in this case we need empty space.
          measure = "";
        }
        if (!ingredient) {
          //If the ingredients are no more we end the for cycle.
          break;
        }
        const consistance = {
          // Object of the measure and ingredient.
          measure: measure,
          ingredient: ingredient,
        };
        consistanceArray.push(consistance); //Filling the array with the measure and ingreadient object.
      }

      const drinkData = {
        // The final drink object with the necessary data.
        id: cocktailId,
        drink: drink.strDrink,
        category: drink.strCategory,
        alcoholic: drink.strAlcoholic,
        glass: drink.strGlass,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb,
        consistance: consistanceArray,
      };
      
      console.log("Drink data: ", drinkData);
      res.json(drinkData);
    } else {
      return res.status(404).json("No drink found with the specified ID")
      };
    } catch (error) {
    res.status(404).send(error.message);
    console.log("Error message",error.message);
  }
});

app.post("/search", async (req, res) => {
  try {
    const searchQuery = req.body.search?.trim();
    if (!searchQuery) {
      console.log(searchQuery);
      // res.status(400).json({ error: "Search query is required" });
      return;
    }
    const result = await axios.get(API_URL + "search.php", {
      params: {
        s: searchQuery,
        timeout: 5000,
      },
    });
    const info = result.data.drinks;
    if (Array.isArray(info) && info.length > 0) {
      console.log("info is real");
      const dataArray = info
        .filter((drink) => drink?.idDrink)
        .map(mapDrinkData);
      console.log(dataArray);
      res.json(dataArray);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log("API call failed", {
      message: error.message,
      stack: error.stack,
    });
    res.status(404).json(error.message);
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
