import React from "react";
import { useState } from 'react';
import './RecipeInput.css';

const RecipeInput = (props)=>{

    const[searchterm, setSearchTerm] = useState('')
    const[invalid, setInvalid] = useState('')
    const[warning, setWarning] = useState('Search for recipes')

    const recipeInputHandler = (event) =>{
        //console.log(event.target.value)
        if(event.target.value.length>0){
            setInvalid((prevState)=>(''));
            setWarning((prevState)=>('Search for recipes'));
            
        }
        setSearchTerm((prevState)=>(event.target.value));
        
        
        
        
    };



    const sendUserSearch = (event) =>{
        event.preventDefault()
        //console.log('recipe is|',recipe.trim().length,'|')
        if(searchterm.trim().length>0){
            
            props.recieveUserSearch(searchterm)
            
            
            
        }else{
            setInvalid('invalid')
            setWarning('????')
            
        }
        //resets input box on submittion
        setSearchTerm((prevState)=>(''))
        
    };
    return(
        <div>
            <form onSubmit={sendUserSearch}>
                <div className={`form-control ${invalid} recipe-input`}>
                    
                    <input type='text' value={searchterm} placeholder={warning} onChange={recipeInputHandler}/>
                    <button className="search-button" type='submit'>Search</button>
                </div>
            </form>
        </div>
        
    )
};

export default RecipeInput;