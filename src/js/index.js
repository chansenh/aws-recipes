import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery/dist/jquery';
import dbrecipe from '../data/db.json';
import * as homeView from './views/homeView.js';
import * as recipeView from './views/recipeView.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { loadRecipe } from './views/recipeView';
import { data } from 'autoprefixer';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5gV4aoXfVzzSGA-v4jNGeRRQpx5r_g9c",
  authDomain: "simplmeals.firebaseapp.com",
  projectId: "simplmeals",
  storageBucket: "simplmeals.appspot.com",
  messagingSenderId: "663715479785",
  appId: "1:663715479785:web:023efa4f4b23e07526f078",
  measurementId: "G-XNJRV3TP4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function loadHomeEvents(id){
  document.getElementById(`${id}`).addEventListener(`click`, event=>{
    
    let target = event.target;
    while(!(Number(target.id))){
      target = target.parentNode;
      
    }
    //console.log('sugest clicked',target.id);
    document.getElementById(`${id}`).querySelectorAll(`.card`).forEach(card =>{
      //trigger button of card if card is clicked on
      //console.log(card)
      if(card.id==target.id){
        card.querySelector(`.btn`).click()
      }
    });
  });
}

function homeControl(event){
  if (event.target.location.pathname=='/index.html' || event.target.location.pathname=='/'){
    let carouselidlist = ['recent_inner']; //'suggested_inner' 'popular_inner' not implemented yet
    //grab popular, recent and suggested lists TODO
    //let popularrecipes = getRecipes(dbrecipe.popular);
    let recentrecipes = getRecipes(dbrecipe.recent);

    //let popularchunked = separateArrayCarouselSizedChunks(popularrecipes);
    let recentchunked = separateArrayCarouselSizedChunks(recentrecipes);
    
    carouselidlist.forEach(carouselid =>{
      loadHomeEvents(carouselid);
    });
    //homeView.populateCarousels('popular_inner',popularchunked);
    homeView.populateCarousels('recent_inner',recentchunked);
    homeView.populateCategories(dbrecipe.categories);
    homeView.populateTags(dbrecipe.tags)
    
    //access to clicking on table elements
    document.getElementById('searchtable').addEventListener('click',event=>{
      if(event.target.classList.contains('tablerow')){
        let target = event.target;
        while(!(target.id)){
          target = target.parentNode;
          
        }
        console.log(target.id)
      }
    });

    //search bar control
    document.getElementById('searchgo').addEventListener('click', event=>{

      //active tags lose meaning when searching for recipes by name or category
      removeActiveDropdown('tagdropdown');
      document.getElementById('tagnavbar').innerHTML = 'Tags';
      
      let target = event.target;
      let searchquery = document.getElementById('searchinput').value.trim();
      let category = document.getElementById('categorydropdown').querySelector('.active');
      homeView.clearTable();
      if (category && searchquery){
        searchRecipes(searchquery,dbrecipe.total,dbrecipe.recipes,category.innerHTML);
      }
      //nothing in search bar but a category is active. search results should be all recipes under active category
      else if(category){
        searchRecipes('none',dbrecipe.total,dbrecipe.recipes,category.innerHTML);
      }
      else{
        searchRecipes(searchquery,dbrecipe.total,dbrecipe.recipes,'none');
      }
      
    });

    document.getElementById('categorydropdown').addEventListener('click', event=>{
      
      if(event.target.classList.contains("dropdown-item") && event.target.classList.contains("active")){
        removeActiveDropdown('categorydropdown')
        //console.log(event.target)
        //event.target.classList.toggle('active');
        document.getElementById('categorynavbar').innerHTML="Categories";
      }else if(event.target.classList.contains("dropdown-item")){
        removeActiveDropdown('categorydropdown')
        event.target.classList.add('active');
        document.getElementById('categorynavbar').innerHTML=event.target.innerHTML;
      }
      
    });

    document.getElementById('tagdropdown').addEventListener('click', event=>{
      
      if(event.target.classList.contains("dropdown-item") && event.target.classList.contains("active")){
        removeActiveDropdown('tagdropdown')
        homeView.clearTable();
        document.getElementById('recipelist').style.display = "none";
        document.getElementById('tagnavbar').innerHTML = 'Tags';
      }
      else if(event.target.classList.contains("dropdown-item")){
        removeActiveDropdown('tagdropdown')
        let tagkey = event.target.id;
        event.target.classList.add('active');
        document.getElementById('tagnavbar').innerHTML=event.target.innerHTML;
        let recipelist = dbrecipe.tags[tagkey].recipeids;
        homeView.clearTable();
        searchRecipes('none',recipelist,dbrecipe.recipes,'none')
      }
    });
  }

}

function removeActiveDropdown(dropdownid){
  document.getElementById(dropdownid).querySelectorAll('.dropdown-item').forEach(node =>{
    if (node.classList.contains('active')){
      console.log('removing', node)
      node.classList.remove('active')
    }
  });
  
}
//home control

//3 or 4 recipes per carousel item
function separateArrayCarouselSizedChunks(recipearray){
  let chunkedarray = [];
  let chunkcount=0;
  let workingarray=[];
  recipearray.forEach((element,idx) => {
    workingarray.push(element);
    
    chunkcount= chunkcount+1;
    //if chunkcount%4==0, push current workingarray to chunkedarray and start processing next workingarray
    if(!(chunkcount%4) || idx==recipearray.length-1){
      chunkedarray.push(workingarray);
      workingarray=[]
    }
  });
  return chunkedarray
}
//get popular recipes from main recipe object
function getRecipes(recipeids){
  
  let recipearray=[];
  recipeids.forEach(id =>{
    recipearray.push(dbrecipe.recipes[id]);
  });

  return recipearray;
}

function searchRecipes(searchterm,recipeids,recipeobject,category){
  
    

    console.log(searchterm)
    console.log(recipeids)
    //console.log(recipeobject)
    recipeids.forEach(id =>{
        //[number]recipe.id
        //[string]recipe.name
        //[string]recipe.image
        //[string]recipe.instructions
        //[list]recipe.ingredients
        
        //search through recipe names for a the searchterm
        //multiple matches may exist e.g. 'beef' matches with 'beef wellington', 'beefaburger'
        //isoalte recipe name into single words to check against searchterm
        let recipe = recipeobject[id];
        let categories = recipe.categories;
        let categoryfound=0
        console.log('on ',id)
        categories.forEach(cat =>{
          console.log(cat);
          console.log(category);
          if(category=='none'){
            categoryfound=1
          }
          else if(cat==category){
            categoryfound=1
          }
        });
        if(categoryfound){
          //nothing entered into search bar to search but a category is marked active. populate any recipes belonging to active category
          if(searchterm=='none'){
            homeView.populateSearchedRecipe(recipe);
          }
          else{
            const isolatedwords = recipe.name.split(' ');
            let found = 0;
            console.log(`searching ${recipe.name}`)
            isolatedwords.forEach(word =>{
                //match found
                word=word.toLowerCase();
                searchterm=searchterm.toLowerCase();
                
                console.log(word.includes(searchterm))
                if(word.includes(searchterm)){
                    found=1;
                }     
            });
            if(found){
              homeView.populateSearchedRecipe(recipe);
            }
          }
          
        }
        
    });

}

function recipeControl(event){
  if (event.target.location.pathname=='/recipe.html'){
    
    //document.getElementById('recipe').addEventListener('click',event=>{
    //  console.log('recipe container clicked');
    //});

    const urlstring = window.location.search;
		
		const urlparams = new URLSearchParams(urlstring)
		let id = urlparams.get('recipe');

    console.log(dbrecipe.recipes[id])
    recipeView.loadRecipe(dbrecipe.recipes[id]);
    recipeView.loadIngredients(dbrecipe.recipes[id])
    recipeView.loadInstructions(dbrecipe.recipes[id])
    
    

  }
}



//central hub that controls all actions for every website page
function windowListeners(event){
  
  homeControl(event);
  recipeControl(event);

}

//when browser is loaded, activate all webpages
//gives functionality to anything the user interacts with
function eventListenersOn(){
  console.log('hello')
  window.addEventListener('load', event=>windowListeners(event));
}




//this line activates website
eventListenersOn()