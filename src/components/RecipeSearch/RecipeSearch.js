import React from "react";
import { useEffect, useState } from "react";
import RecipePagination from '../RecipeList/RecipePagination';
import './RecipeSearch.css'
const RecipeSearch = (props)=>{

    let searchterm = props.searchterm;
    //let recipedb = props.recipedb;
    let searchresults = props.searchResults;

    let jsxoutput=[];
    //console.log(searchresults);
    
    useEffect(()=>{
        
        //console.log('search results', props.searchResults)
      },[props.searchResults]);
      //[pagedID,props.recipeIndices]
    
    //console.log('JSXOUTPUT FOR SEARCHING IS',searchresults)
    return(
        <div className="recipe-search">
            <header>Searching {searchterm}</header>
            <RecipePagination recipeIndices={searchresults} recipeList={props.recipeList} renderRecipe={props.renderRecipe} images={props.images} setCurrentPage={props.setCurrentPage} page={props.currentPageNumber}/>
        </div>
        
    )
};

export default RecipeSearch;


/***
 * 
 * useEffect(()=>{
        let recipearray = props.recipeIndices.filter((id,idx)=>{
            if((props.page-1)*12<=idx && idx<=(props.page*12)-1){
                //console.log('instantiated PAGED ITEM',id)
                let item = props.recipeList[id];
                //console.log(item);
                return id
            }
            
        });
        setPagedID(recipearray)
      },[]);
 * 
 * 
 * 
 * 
 * 
 * 
 */