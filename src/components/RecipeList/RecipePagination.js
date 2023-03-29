import { render } from "@testing-library/react";
import React from "react";
import { useEffect, useState } from "react";
import RecipeList from "../RecipeList/RecipeList";

import './RecipeList.css';

const RecipePagination = (props)=>{

    const[page,setPage] = useState(1);
    const[offset,setOffset] = useState(12);
    const[pagedID,setPagedID] = useState([]);
    const[totalpages,setTotalPages] = useState(Math.ceil((props.recipeIndices.length - 1) / offset));
    const nextImage = props.images[`next.png`];
    const nextHoverImage = props.images[`next_clicked.png`];
    const prevImage = props.images[`prev.png`];
    const prevHoverImage = props.images[`prev_clicked.png`];
    const [nextHovered, setNextHovered] = useState(false);
    const [prevHovered, setPrevHovered] = useState(false);
    const [itemAmountHTML,setItemAmountHTML] = useState();

  const handleMouseEnter = (event) => {
    if(event.target.className==='prev-button-image'){
        setPrevHovered(true)

    }
    
    if(event.target.className==='next-button-image'){
        setNextHovered(true)

    }
  };

  const handleMouseLeave = (event) => {
    if(event.target.className==='prev-button-image'){
        setPrevHovered(false)

    }
    
    if(event.target.className==='next-button-image'){
        setNextHovered(false)

    }
  };
    
    
      //[pagedID,props.recipeIndices]
    
    useEffect(()=>{

        const fetchPagedID = ()=>{
            let recipearray = props.recipeIndices.filter((id,idx)=>{
                
                if((page-1)*offset<=idx && idx<=(page*offset)-1){
                    return id

                //the index value for first space available is larger than the idx. 
                }
                
            });
            setPagedID(prevState=>recipearray);
            setTotalPages((prevState)=>{
                const newTotalPages = Math.ceil((props.recipeIndices.length - 1) / offset);
                if (newTotalPages !== prevState) {
                    return newTotalPages;
                }
                return prevState;
            });
            if(page>totalpages && totalpages>0){
                setPage(totalpages);
            }
            
        };
        fetchPagedID();
    },[,props.recipeIndices,offset,totalpages,page]);
    
    useEffect(()=>{
        
        const selectItemAmount = ()=>{
            let jsxoutput=[];
            ['12','25','50'].forEach((num)=>{
                if(offset==num){
                    jsxoutput.push(<a className="selected" onClick={changeOffset} data-offset={num}>{num}</a>)
                }else{
                    jsxoutput.push(<a onClick={changeOffset} data-offset={num}>{num}</a>)
                }
                
            });

            setItemAmountHTML(jsxoutput);
        };
        selectItemAmount();

    },[,offset]);


    
    const renderPage = (event)=>{
    
        let newpagenumber=1;
        let recipearray=[];
        
        //console.log('recipe indicies',props.recipeIndices);
        //console.log('indicies size',props.recipeIndices.length);
        //console.log('total pages==',totalpages)
        if(event.target.dataset.direction=='next' && page<totalpages){

            newpagenumber=page+1;
            setPage((prevState)=>(prevState+1));
            recipearray=grabnewpagedarray(newpagenumber);
            setPagedID(recipearray);
        }
        if(event.target.dataset.direction=='prev' && page>1){

            newpagenumber=page-1;
            setPage((prevState)=>(prevState-1));
            recipearray=grabnewpagedarray(newpagenumber);
            setPagedID(recipearray);
        }
        
            
        
        
        
        //setPagedID((prevState)=>(recipearray));
    };



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

    const changeOffset = (event) => {
        //console.log(event.target.dataset.offset);
        setOffset(Number(event.target.dataset.offset))
    }
    
    
    return(
        <div>
            <div className="itemsperpage">
                
                <div className="dropdown">
                    <button className="dropbtn">Items per page</button>
                    <div className="dropdown-content">
                        {itemAmountHTML}
                    </div>
                </div>
            </div>
            <RecipeList recipes={props.recipes} recipeIndices={props.recipeIndices} recipeList={props.recipeList} pagedID={pagedID} renderRecipe={renderRecipe} images={props.images} renderCategory={renderCategory}/>
            <div className="wrapcontainer">
                <div className='prev-button-container'>
                    <img onClick={renderPage} className='prev-button-image' data-direction="prev" src={prevHovered ? prevHoverImage : prevImage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
                </div>
                
                <div className="page-number">
                    <div>Page</div>
                    {page}
                    
                </div>
                
                <div className='next-button-container'>
                    <img onClick={renderPage} className='next-button-image' data-direction="next" src={nextHovered ? nextHoverImage : nextImage} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
                </div>
            </div>    
            
        </div>
        
    )
};

export default RecipePagination;