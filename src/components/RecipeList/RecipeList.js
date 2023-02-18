import React from "react";
import { useState } from "react";
import RecipeItem from "../RecipeItem/RecipeItem";

import './RecipeList.css';

const RecipeList = (props)=>{

    //const[recipeList,setrecipeList] = useState(props.recipelist)
    const[pagedID,setPagedID] = useState([])
    const deleteRecipe = (recipeobj)=>{
        
        let alteredlist = props.recipeList.filter(recipe=>{
            if(recipe.id!==recipeobj.id){
                return recipe
            }
            
        });
        //console.log('alteredlsit   ',alteredlist)
        props.updateList(alteredlist);

    };

    const renderCategory = (category)=>{

        props.renderCategory(category)
        

    };

    let jsxoutput=[];
    //console.log('RECIPELIST.JS',[...props.pagedID])
    if(props.pagedID){
        jsxoutput = props.pagedID.map(id=>{
            let item = props.recipeList[id];
            let categories='';
            item.category.forEach((category,idx) => {
                if(idx==item.category.length-1){
                    categories=categories+`${category}`
                }else{
                    categories=categories+`${category} | `
                }
                
            });
            return (
                
                <RecipeItem key={item.id} id={item.id} recipe={item.name} image={props.images[`${item.image}`]} category={item.category} renderRecipe={props.renderRecipe} renderCategory={renderCategory}/>
                
                );
    });
    }
    

    return(
        <div className="recipe-list">
            {jsxoutput}
        </div>
        
    )
};

export default RecipeList;