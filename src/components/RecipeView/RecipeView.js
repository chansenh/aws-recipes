import React from 'react';
import { useState } from 'react';
import './RecipeView.css';


const RecipeView = (props)=>{

    const [recipeID,setRecipeID] = useState(props.id);
    const [recipe,setRecipe] = useState(props.name);
    const [image,setImage] = useState(props.image);
    

    const renderRecipe = (event)=>{
        let recipeobj = {id:recipeID,name:recipe,image:image,instructions:props.instructions,ingredients:props.ingredients}
        //console.log('recipeitem',recipeobj,event.target)
        props.renderRecipe(recipeobj)
    };
    
    let item = props.recipeList[props.id];
    let ingredients = item.ingredients.map(ingredient => {
        return (<li className='list-item-ingredient'>{ingredient}</li>)
    });
    //let instructions = item.instructions.map((instruction)=>{
    //    return(<p className='fixed'>{instruction}</p>)
    //});
    let imgurl = props.images[`${item.image}`];
    let instructionsProcessed='';
    let backbtnimg = props.images[`back.png`]
    for (let index = 0; index < item.instructions.length; index++) {
        const character = item.instructions[index];
        if(character==='\n'){
            instructionsProcessed=instructionsProcessed+'\n\n';
        }
        instructionsProcessed = instructionsProcessed+character
        
    }
    

    
    return(
        <div className="recipe-view">
            <header className='recipe-title'>
                <div className='back-button-container'>
                    <img onClick={props.reset} className='back-button-image' src={backbtnimg}></img>
                </div>
                {item.name}
            </header>
            <img className="recipe-view-image" src={imgurl}/>
            <hr className="dotted"></hr>
            <div className='recipe-header'>
                Ingredients
            </div>
            <ul role="list" className='recipe-ingredients'>{ingredients}</ul>
            <hr className="dotted"></hr>
            <div className='recipe-header'>
                Instructions
            </div>
            <div className='recipe-instructions'>{instructionsProcessed}</div>
            <hr className="dotted"></hr>
            <header className='recipe-header'>Video</header>
            <div className='video'>...Coming Soon</div>
            
        </div>
    )
};

export default RecipeView;


/**
 * 
 * <iframe width="800" height="500"
        src="https://www.youtube.com/embed/uImS_1XeRjI">
    </iframe>
 * 
 * 
 * 
 */