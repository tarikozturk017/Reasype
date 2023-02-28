import React from 'react';
import Filter from './components/Filter';
import Recipe from './components/Recipe';
// import Footer from './components/Footer';
import Fork from "./fork.png"
import Knife from "./knife.png"
import './styles.css'

import axios from 'axios'



export default function App() {
    // const axios = require("axios");
    const [optionsData, setOptionsData] = React.useState({
        q: '', 
        diet: [], //enum
        ingr: 5,
        excluded: '',
        dishType: [], //enum
        mealType: [], //enum
        cuisineType: [], //enum
        health: [], //enum
        calories: '',
        time: ''
    });  
    const [resultRecipe, setResultRecipe] = React.useState({});
    const [isRecipeGenerated, setIsRecipeGenerated] = React.useState(false);

    React.useEffect(() => {
    //   const axios = require('axios');
    //   const axios = require(axiosImport);

      const options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: {
          q: optionsData.q, 
          diet: optionsData.diet[0], 
          ingr: optionsData.ingr, //max num of ingredients that returns
          to: 10, //max num of result that returns
          excluded: optionsData.excluded,
        dishType: optionsData.dishType[0], //enum
        mealType: optionsData.mealType[0], //enum
        cuisineType: optionsData.cuisineType[0], //enum
        health: optionsData.health[0], //enum
        // calories: optionsData.calories,
        time: '50'
        },
        headers: {
          'X-RapidAPI-Key': '72f094bba8mshe30eb0e4eba84b4p1c57b9jsn898cf38aeb4e',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
      };
      
    //   axios.get('http://webcode.me').then(resp => {

    //         console.log(resp.data);
    //     });


    console.log("setted options: " + options.params.diet + options.params.ingr + options.params.q);
    //   console.log("options tobe be fetched: " + options.params.q + options.params.diet + options.params.ingr + options.params.excluded + 
    //   options.params.dishType + options.params.mealType + options.params.cuisineType + 
    //   options.params.health + options.params.calories + options.params.time)
      axios.request(options).then(function (response) {
        console.log("fetched data: " + response.data);
        console.log(response.data);
        getRandomRecipe(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    }, [optionsData])

    function getRandomRecipe(fetchedData) {
        let len = fetchedData['hits'].length;
        let randomNum = Math.floor(Math.random() * len);
        console.log('len: ' + len);

        if(len !==0 ) setResultRecipe(fetchedData['hits'][randomNum]['recipe'])
    }
    

    function handleFilter(data) {
        setOptionsData(data)
        setIsRecipeGenerated(isRecipeGenerated => !isRecipeGenerated)
    }

    function resetRecipe(){
        console.log("reseting old game")
        setOptionsData({
            q: '', 
            diet: [], //enum
            ingr: 5,
            excluded: '',
            dishType: [], //enum
            mealType: [], //enum
            cuisineType: [], //enum
            health: [], //enum
            calories: '',
            time: ''
          });  
        setIsRecipeGenerated(isRecipeGenerated => !isRecipeGenerated)
    }
    return (
        <div style={{ flex: 1 }}>
            <div className='outer--container'>
            {/* <div className='sides--container'> */}
                <img src={Fork} alt="" className="fork"/>
                
            {/* </div> */}
            {/* <Leftbar /> */}
                <div className='container'>
                    {!isRecipeGenerated ? 
                        <Filter handleFilter={handleFilter} /> 
                        : 
                        <Recipe resetRecipe={resetRecipe} resultRecipe={resultRecipe} />}
                    {/* <Filter handleFilter={handleFilter}/> */}
                    {/* <Recipe  resultRecipe={resultRecipe} /> */}
                </div>
                <img src={Knife} alt="" className="knife"/>
            </div>
            {/* <Footer /> */}
        </div>
    );
}