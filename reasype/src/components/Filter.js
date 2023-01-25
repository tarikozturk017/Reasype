import React from "react";
import EnumInput from "./EnumInput";
import RangeInput from "./RangeInput"
import OldPaper from "../old.webp"
// import Post from "../post.png"
import PaperContent from "./PaperContent";
import BasicPaper from "./BasicPaper";

export default function Filter(props) {
    const [recipeData, setRecipeData] = React.useState({
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
    }) 

    const [isAdvanced, setIsAdvanced] = React.useState(false)

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime']
    const dishTypes = ['Alcohol-cocktail', 'Biscuits and cookies', 'Bread', 'Cereals', 
        'Condiments and sauces', 'Drinks', 'Desserts', 'Egg', 'Main course', 'Omelet', 
        'Pancake', 'Preps', 'Preserve', 'Salad', 'Sandwiches', 'Soup', 'Starter']
    const cuisineTypes = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 
        'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 
        'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']
    const diets = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium']
    const healths = ['alcohol-free', 'immuno-supportive', 'celery-free', 'crustacean-free', 
        'dairy-free', 'egg-free', 'fish-free', 'fodmap-free', 'gluten-free', 'keto-friendly', 
        'kidney-friendly', 'kosher', 'low-potassium', 'lupine-free', 'mustard-free', 'low-fat-abs', 
        'No-oil-added', 'low-sugar', 'paleo', 'peanut-free', 'pecatarian', 'pork-free', 'red-meat-free', 
        'sesame-free', 'shellfish-free', 'soy-free', 'sugar-conscious', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free']
    const numbers = ['3', '4', '5', '6', '7', '8', '9', '10+']


    // React.useEffect(() => {

    // })

    function getRecipe() {
        // const randomNumber = Math.floor(Math.random() * 10)
        // const url = allMemeImages[randomNumber].url
        // setMeme(prevMeme => ({
        //     ...prevMeme,
        //     randomImage: url
        // }))
        props.handleFilter(recipeData);
        
    }


    function handleRange(data, name) {
        console.log('setting handle range data: ' + data+name)
        setRecipeData(prevData => ({
            ...prevData,
            // [name]: value
            [name]: data
        }))
    }

    function resetRange(name){
        setRecipeData(prevData => ({
            ...prevData,
            // [name]: value
            [name]: ''
        }))
    }

    function handleChange(event) {
        let {name, value} = event.target
        if (name === 'ingr') {
            if(value === '10+') value = 100;
        }
        setRecipeData(prevData => ({
            ...prevData,
            // [name]: value
            [name]: value
        }))
    }

    function handleEnumChange(data, name) {
        // console.log('Filter handleEnumChange' + data + name)
        setRecipeData(prevData => ({
            ...prevData,
            // [name]: value
            [name]: data
        }))
    }

    const nums = numbers.map((num) => {
        return (
            <option value={num}>{num}</option>
        )
    })

    function toggleAdvancedSearch() {
        // console.log('setting adv/reg')
        setIsAdvanced((oldAdvanced) => !oldAdvanced)
        
    }
    
    

    const regularSearch = <div className="advanced-search--button">
                                <button onClick={toggleAdvancedSearch}>Advanced search</button>
                            </div>

    const advancedSearch = 
    <div className="advanced--outer">
    <div className="advanced-filter--container">
        <div className="advanced-element--container" id="advanced-1">
            <p className="input--description">Calorie range (kcal)</p>
            <RangeInput name="calories" resetRange={resetRange} handleRange={handleRange} />   
        </div>       
        <div className="advanced-element--container" id="advanced-2">
            <p className="input--description">Preparation time (min)s</p>
            <RangeInput name="time" resetRange={resetRange} handleRange={handleRange} />
        </div>
        
        <div className="advanced-element--container" id="advanced-3">
            <p className="input--description">Select dish type</p>
            <EnumInput value={recipeData.dishType} name="dishType" placeholder="Dish type" handleEnumChange={handleEnumChange} options={dishTypes}/>
        </div>
        <div className="advanced-element--container" id="advanced-4">
            <p className="input--description">Select meal type</p>
            <EnumInput value={recipeData.mealType} name="mealType" placeholder="Meal type" handleEnumChange={handleEnumChange} options={mealTypes}/>
        </div>
        <div className="advanced-element--container" id="advanced-5">
            <p className="input--description">Select cuisine type</p>
            <EnumInput value={recipeData.cuisineType} name="cuisineType" placeholder="Cuisine type" handleEnumChange={handleEnumChange} options={cuisineTypes}/>
        </div>
        <div className="advanced-element--container" id="advanced-6">
            <p className="input--description">Select health label</p>
            <EnumInput value={recipeData.health} name="health" placeholder="Health label" handleEnumChange={handleEnumChange} options={healths}/>
        </div>
        <div className="advanced-element--container" id="advanced-7">
            <p className="input-exclude--description">Enter an ingredient to exclude</p>
            <input 
                type="text" // string
                placeholder="Exclude ingredient"
                className="form--input"
                value={recipeData.excluded}
                onChange={handleChange}
                name="excluded"
                autoComplete="off"
            />
        </div>
        {/* <div></div> */}
        <div className="advanced-element--container" id="advanced-paper">
            <div><img src={OldPaper} alt="" /></div>
            <PaperContent data={recipeData}/>
        </div>
    

    </div>
    <div  className="advanced-element--container" id="advanced-8">
        <button onClick={toggleAdvancedSearch}>Return to basic search</button>
    </div>
    </div>

    const updatedPage = isAdvanced ? advancedSearch : regularSearch;
    const OptionVal = recipeData.ingr=== 100 ? '10+' : recipeData.ingr;

    // TODO
    // add reset to range or make it toggle
    // if no input press add, make no change
    // sticker for basic search
    // test project 

    // apply the concept below to the enum types
    // https://www.w3schools.com/howto/howto_js_filter_dropdown.asp
    return (
        <div className="filter-page--container">
            <div className="filter--header">
                <h3>R E A S Y P E</h3>
                <p>Please set any of the filter to generate a recipe based on your wish</p>    
            </div>
            <div className="form"> 
                <div className="primary-filter--container">
                    <div className="form-element--container">
                        <p className="input--description">Enter a query to search</p>
                        <input // no need to change 
                            type="text" // string
                            placeholder="Query name"
                            className="form--input"
                            value={recipeData.q}
                            onChange={handleChange}
                            name="q"
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-element--container">
                        <p className="input--description">Select diet type</p>
                        <EnumInput value={recipeData.diet} name="diet" placeholder="Diet" handleEnumChange={handleEnumChange} options={diets}/>
                        {/* <p className="diet-value--filter">{recipeData.diet.map((item) => {
                            return <li>{item}</li>
                        })}</p> */}
                    </div>
                    <div className="form-element--container">
                        <p>Max ingredients #{recipeData.ingr === 100 ? '10+' : parseInt(recipeData.ingr) }</p>
                        <select value={OptionVal} onChange={handleChange} name="ingr" className="form--input" >
                            {nums}
                        </select>
                    </div>
                </div>

                {/* <div className="advanced--outer">
                <div className="advanced-filter--container">
                    <div className="advanced-element--container" id="advanced-1">
                        <p className="input--description">Enter calorie range</p>
                        <RangeInput name="calories" handleRange={handleRange} />   
                    </div>       
                    <div className="advanced-element--container" id="advanced-2">
                        <p className="input--description">Enter preparation time</p>
                        <RangeInput name="time" handleRange={handleRange} />
                    </div>
                    
                    <div className="advanced-element--container" id="advanced-3">
                        <p className="input--description">Select dish type</p>
                        <EnumInput value={recipeData.dishType} name="dishType" placeholder="Dish type" handleEnumChange={handleEnumChange} options={dishTypes}/>
                    </div>
                    <div className="advanced-element--container" id="advanced-4">
                        <p className="input--description">Select meal type</p>
                        <EnumInput value={recipeData.mealType} name="mealType" placeholder="Meal type" handleEnumChange={handleEnumChange} options={mealTypes}/>
                    </div>
                    <div className="advanced-element--container" id="advanced-5">
                        <p className="input--description">Select cuisine type</p>
                        <EnumInput value={recipeData.cuisineType} name="cuisineType" placeholder="Cuisine type" handleEnumChange={handleEnumChange} options={cuisineTypes}/>
                    </div>
                    <div className="advanced-element--container" id="advanced-6">
                        <p className="input--description">Select health label</p>
                        <EnumInput value={recipeData.health} name="health" placeholder="Health label" handleEnumChange={handleEnumChange} options={healths}/>
                    </div>
                    <div className="advanced-element--container" id="advanced-7">
                        <p className="input-exclude--description">Enter an ingredient to exclude</p>
                        <input 
                            type="text" // string
                            placeholder="Exclude ingredient"
                            className="form--input"
                            value={recipeData.excluded}
                            onChange={handleChange}
                            name="excluded"
                            autoComplete="off"
                        />
                    </div>
                    <div></div>
                    <div className="advanced-element--container" id="advanced-paper">
                        <div><img src={OldPaper} alt="" /></div>
                    </div>
                

                </div>
                <div  className="advanced-element--container" id="advanced-8">
                    <button onClick={toggleAdvancedSearch}>Return to basic search</button>
                </div>
                </div> */}
                {/* <div className="advanced-search--button">
                    <button onClick={toggleAdvancedSearch}>Advanced search</button>
                </div> */}
                
                {/* {advancedSearch}
                {regularSearch} */}

                {updatedPage}
                <BasicPaper data={recipeData} isAdvanced={isAdvanced}/> 
                <div className="generate-button">
                    <button 
                        // className="generate-button"
                        onClick={getRecipe}
                    >
                        Generate Recipe
                    </button>
                </div>
                {/* {!isAdvanced && {Post}} */}
                {/* <div className="basic-paper--container" >
                    {!isAdvanced && <div className="basic--paper">
                        <img src={Post} alt="" />
                    </div>}
                    <div className="basic-p--paper">
                        <li>Querying for Chicken</li>
                        <li>Max 5 ingredients</li>
                        <li>Diet types: </li>
                        </div>
                </div> */}
                
                
                
            </div>
            {/* <div className="meme">
            <img src={meme.randomImage} alt="" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div> */}
            
        </div>
    )
}