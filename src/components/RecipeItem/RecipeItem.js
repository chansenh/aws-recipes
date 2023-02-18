import React from 'react';
import { useState } from 'react';
import './RecipeItem.css'

const RecipeItem = (props)=>{

    const [recipeID,setRecipeID] = useState(props.id);
    const [name,setName] = useState(props.name);
    const [image,setImage] = useState(props.image);
    
    const renderRecipe = (event)=>{
        let recipeobj = {id:recipeID,name:name,image:image}
        props.renderRecipe(recipeobj)
    };

    const renderCategory = (event)=>{

        props.renderCategory(event.target.id)

    };

    let jsxcategories=[]
    props.category.forEach(category => {

        jsxcategories.push(
            <li key={category}>
                <a className='category tag' id={category} onClick={renderCategory}>
                {category}
                </a>
            </li>
        )
        
    });
    
        
    return(
        <div className="recipe-item" key={recipeID} id={recipeID}>

            <img width="400" height="267" src={props.image} onClick={renderRecipe}/>
            <ul className='tags'>
            {jsxcategories}
            </ul>
            <div className='container recipe-item-title' onClick={renderRecipe}>
            <p>{props.recipe}</p>
            </div>
            
            
            
        </div>
    )
};

export default RecipeItem;