import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useState } from "react";
import RecipeList from "../RecipeList/RecipeList";

import './RecipeList.css';

const RecipePagination = (props)=>{

    const[page,setPage] = useState(props.page);
    const[offset,setOffset] = useState(12);
    const[pagedID,setPagedID] = useState([]);
    

    
    const[totalpages,setTotalPages] = useState(Math.ceil((props.recipeIndices.length-1)/12));
    
      //[pagedID,props.recipeIndices]
    
    useEffect(()=>{

        const fetchPagedID = ()=>{
            let recipearray = props.recipeIndices.filter((id,idx)=>{
                if((props.page-1)*12<=idx && idx<=(props.page*12)-1){
                    return id
                }
                
            });
            setPagedID(prevState=>recipearray);
        };
        fetchPagedID();
    },[props.recipeIndices]);
    
    const renderPage = (event)=>{
    
        let newpagenumber=1;
        let recipearray=[];
        if(event.target.textContent=='next' && page<totalpages){
            newpagenumber=page+1;
            setPage((prevState)=>(prevState+1));
            recipearray=grabnewpagedarray(newpagenumber);
            let newrecipes = updateRecipes(newpagenumber);
            
            setPagedID(recipearray);
        }
        if(event.target.textContent=='prev' && page>1){
            newpagenumber=page-1;
            setPage((prevState)=>(prevState-1));
            recipearray=grabnewpagedarray(newpagenumber);
            let newrecipes = updateRecipes(newpagenumber);
            
            setPagedID(recipearray);
        }
        
            
        
        
        
        //setPagedID((prevState)=>(recipearray));
    };

    const updateRecipes = pagenum=>{
        let recipes = props.recipes.filter((recipe,idx)=>{
            if((pagenum-1)*offset<=idx && idx<=(pagenum*offset)-1){
                
                
                return recipe
            }
            
        });
        return recipes
    }

    const grabnewpagedarray = (pagenum)=>{
        let recipearray = props.recipeIndices.filter((id,idx)=>{
            if((pagenum-1)*offset<=idx && idx<=(pagenum*offset)-1){
                let item = props.recipeList[id];

                return id
            }
            
        });
        return recipearray
    };

    const renderRecipe = (recipeobj)=>{

        //grab page nubmer
        props.setCurrentPage(page)


        //pass on to props.renderRecipe
        props.renderRecipe(recipeobj);
    };

    const renderCategory = (category)=>{
        props.renderCategory(category)
    };

    
    return(
        <div>

            <RecipeList recipes={props.recipes} recipeIndices={props.recipeIndices} recipeList={props.recipeList} pagedID={pagedID} renderRecipe={renderRecipe} images={props.images} renderCategory={renderCategory}/>
            <div className="wrapcontainer">
                <a onClick={renderPage}>prev</a>
                <a>{page}</a>
                <a onClick={renderPage}>next</a>
            </div>    
            
        </div>
        
    )
};

export default RecipePagination;