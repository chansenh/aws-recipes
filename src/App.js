import logo from './img/cooking_logo4.png';
import './App.css';
import headerBackground from './img/wallpaper.png';
import RecipeInput from './components/RecipeInput/RecipeInput';
import RecipePagination from './components/RecipeList/RecipePagination';
import { useEffect, useState } from 'react';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import RecipeItem from "./components/RecipeItem/RecipeItem";
import RecipeView from "./components/RecipeView/RecipeView";
import recipeDB from './data/db.json';
import { DataStore } from '@aws-amplify/datastore';
import { Recipes } from './models';
import Amplify from "@aws-amplify/core";
import awsconfig from "./aws-exports";     
Amplify.configure(awsconfig);
DataStore.configure(awsconfig);




function App() {

  


  function importAll(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
   }
  const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));
  
  //const[db,setDB] = useState(recipeDB)
  const[recipes,setRecipes] = useState([]);
  const[recipeList,setRecipeList] = useState({});//recipeDB['recipes']
  const[searchResults,setSearchResults] = useState([]);
  const[searchTerm,setSearchTerm] = useState('');
  const[recipeItem,setRecipeItem] = useState('');
  const[recipeIndices,setRecipeIndices] = useState([]);//recipeDB['recent']
  const[currentPageNumber,setCurrentPageNumber] = useState(1);
  const[pagination,setPagination] = useState([]);
  const[categorySearch, setCategorySearch] = useState([]);
  const[category,setCategory] = useState('');
  const[previousCategory, setPreviousCategory] = useState('');
  const[previousCategorySearch, setPreviousCategorySearch] = useState([]);
  const[previousSearchTerm,setPreviousSearchTerm] = useState('');
  const[previousSearchResults, setPreviousSearchResults] = useState([]);
  //const[jsxoutput,setjsxoutput] = useState(homepage);
  useEffect(()=>{
    const fetchData= async ()=>{  

      let dataobj = {};
      let ids = [];
      const models = await DataStore.query(Recipes);

      //models.forEach(recipe=>{
      //  DataStore.delete(recipe)
      //});

      models.forEach((recipe,idx)=>{
        
        dataobj[recipe.id] = {
          'id':recipe.id,
          'name':recipe.name,
          'image':recipe.image,
          'category':recipe.category,
          'ingredients':recipe.ingredients,
          'instructions':recipe.instructions
        };
        ids.push(recipe.id);
      });
      
      setRecipeList(dataobj)
      
      setRecipeIndices(ids)
      
    };
    fetchData();
  }, []);
  
  


  const recieveUserRecipe = (userrecipe)=>{
    
    let recipeobj = {id:userrecipe,recipe:userrecipe}
    let rlist= recipeList
    setRecipeList(prevState =>{
      return [...prevState,recipeobj]
    })

  };

  const searchRecipeDB = (searchterm)=>{
    setRecipeItem('');

    let searchedRecipes = []    
    
    recipes.forEach(recipe=>{
      if(recipe.name.toLowerCase().includes(searchterm.toLowerCase())){
        searchedRecipes.push(recipe);
      }
    });


    let validRecipeIDs=[]
    recipeIndices.forEach(recipeid=>{
    let recipe = recipeList[recipeid];
    
    if(recipe.name.toLowerCase().includes(searchterm.toLowerCase())){
        validRecipeIDs.push(recipeid)
        
    }
    });
    setPreviousCategory((prevState)=>([...prevState,category]));
    setPreviousCategorySearch((prevState)=>([...prevState,categorySearch]));
    setPreviousSearchResults((prevState)=>([...prevState,searchResults]));
    setPreviousSearchTerm((prevState)=>([...prevState,searchTerm]));
    setCategory('');
    setCategorySearch([]);
    setSearchResults((prevState)=>(validRecipeIDs));
    setSearchTerm((prevState)=>(searchterm));
  

  };

  const updateListAfterDeletion = (alteredlist)=>{
    setRecipeList(alteredlist);
  };

  const renderRecipe = (item)=>{
  
    setRecipeItem(item)

  };

  const renderCategory = (category)=>{
    

    let searchedRecipes = []    
    
    recipes.forEach(recipe=>{
      recipe.category.forEach(recipeCategory=>{
        if(recipeCategory === category){
          searchedRecipes.push(recipe);
        }
      });
      
    });


    let categoryids = [];
    //grab indices from all recipes with specfied category
    recipeIndices.forEach((id)=>{
      let item = recipeList[id];
      item.category.forEach((cat)=>{
        
        if(category===cat){
          categoryids.push(id);
        }
      });

    });
    setPreviousCategory((prevState)=>([...prevState,category]));
    setPreviousCategorySearch((prevState)=>([...prevState,categorySearch]));
    setPreviousSearchResults((prevState)=>([...prevState,searchResults]));
    setPreviousSearchTerm((prevState)=>([...prevState,searchTerm]));
    setSearchResults((prevState)=>([]));
    setSearchTerm((prevState)=>(''));
    setCategory((prevState)=>(category));
    setCategorySearch((prevState)=>(categoryids));
  };

  const setCurrentPage = (page)=>{
    setCurrentPageNumber(page);
  };
  const reset = (event)=>{
    setRecipeItem('');
    setSearchTerm('');
    setSearchResults([]);
    setCategorySearch([]);
    setCategory('');
  };

  const previousPaginationState = ()=>{
  
    setCategory((prevState)=>(previousCategory));
    setCategorySearch((prevState)=>(previousCategorySearch));
    setSearchResults((prevState)=>(previousSearchResults));
    setSearchTerm((prevState)=>(previousSearchTerm));

  
  };

  const initdb = async()=>{
    
    //<button className='initdb' onClick={initdb}>INIT</button>
    const models = await DataStore.query(Recipes);
    models.forEach(recipe=>{
      console.log(recipe.name)
    });
  };
  let jsxoutput = [];
  
  console.log(recipeList)
  console.log(recipeIndices)
  if(searchResults.length>0){
    
    
    jsxoutput.push(
      <div>
        <header className='search-message'>"{searchTerm}"</header>
        <header className='search-message'>Results {searchResults.length}</header>
        <button className="reset-button" onClick={reset}>RESET</button>
        <div className="recipe-search">
          <RecipePagination key={searchTerm} recipes={recipes} recipeIndices={searchResults} recipeList={recipeList} renderRecipe={renderRecipe} images={images} setCurrentPage={setCurrentPage} page={currentPageNumber} renderCategory={renderCategory}/>
        </div>
      </div>)
  }else if(categorySearch.length>0){
    
    jsxoutput.push(
      <div>
        <header className='search-message'>category: {category}</header>
        <header className='search-message'>Results {categorySearch.length}</header>
        <button className="reset-button" onClick={reset}>RESET</button>
        <div className="recipe-search">
          
          <RecipePagination key={category} recipes={recipes} recipeIndices={categorySearch} recipeList={recipeList} renderRecipe={renderRecipe} images={images} setCurrentPage={setCurrentPage} page={currentPageNumber} renderCategory={renderCategory}/>
        </div>
    </div>)

  }
  else{
    
    jsxoutput.push(<RecipePagination key='no_search' recipes={recipes} recipeIndices={recipeIndices} recipeList={recipeList} renderRecipe={renderRecipe} images={images} setCurrentPage={setCurrentPage} page={currentPageNumber} renderCategory={renderCategory}/>)
    
    

    //<RecipePagination recipeIndices={searchResults} recipeList={recipeList} renderRecipe={renderRecipe} images={images} setCurrentPage={setCurrentPage} page={currentPageNumber}/>)
    //<RecipeSearch recipeList={recipeList} searchterm={searchTerm} searchResults={searchResults} renderRecipe={renderRecipe} images={images} setCurrentPage={setCurrentPage} page={currentPageNumber}/>)
  }
    
  //navigating to specific recipe page
  if(recipeItem.id){
    jsxoutput = <RecipeView key={recipeItem.id} recipeList={recipeList} id={recipeItem.id} name={recipeItem.name} images={images} instructions={recipeItem.instructions} ingredients={recipeItem.ingredients} reset={reset}/>;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p className='main-title'>
          Mr and Mrs Meals
        </p>
        
        <img src={logo} className="App-logo" alt="logo" />
      </header>  
      <div className='content'>


        
      
        
      
        <div className='centered-content'>
        <RecipeInput recieveUserSearch={searchRecipeDB}/>
        </div>
        
        {jsxoutput}
          
      
      </div>
      
      
      
    
    </div>
      
      
    
  );
}

export default App;



//<RecipeList recipeList={recipeList} updateList={updateListAfterDeletion}/>
//<button onClick={previousPaginationState}>previous state</button>