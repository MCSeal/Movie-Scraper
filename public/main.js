//things to do 
//attach to mongodb so when they click share button it sends a token that can be looked up
//fix css when producing too big of a search result
//change search so when there is too many results to show, it inputs that 
//touch up CSS

//60percent done...


const Http = new XMLHttpRequest();

const resultsEl = document.querySelector('#results');
const favContainer = document.querySelector('#favourites');
var arrayCounter = 0;
var favCounter = 0;
var resultsData = [];
var favourites = [];



document.querySelector('#search_box').addEventListener('keypress', (e) =>{

    if (e.key === 'Enter') {
      clearResults();
      var key = 'https://www.omdbapi.com/?apikey=78036a52&s='    
      var message = e.target.value
      var fSearch = key + message
     getResultData(fSearch)
 
  } 
});


const getResultData = async (searchCriteria) => {
  const response = await fetch(searchCriteria);
  if (response.status === 200){
    const data = await response.json()
      if (data.Search){
        for (var i=0; i < data.Search.length - 1; i++){
          resultsData.push(data.Search[i])
            
      }
      resultsData.forEach((result) => {
        resultsEl.appendChild(generateResults(resultsData))
      })
      
      
    } else {
      resultsEl.innerHTML = 'Sorry no Results found, please try changing your search'
    }
  }else {
    console.log('error with connection or database')
  }
}


clearResults = () =>{
  resultsData = [];
  arrayCounter = 0;
  resultsEl.innerHTML = '';

}



generateResults = (results) =>{
   
    const resultEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    checkbox.classList.add('checkbox')
    const resultsText = document.createElement('span')
        //fav box set up
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    
    
    resultEl.classList.add('list-item')
    resultEl.classList.add('favourite-item')
    containerEl.classList.add('list-item__container')
    resultEl.appendChild(containerEl)

    //setup results text
    resultsText.textContent = results[arrayCounter].Title + ' (' + results[arrayCounter].Year + ')'
    containerEl.appendChild(resultsText)
    arrayCounter ++;
    

   checkbox.addEventListener('change', (e) => {
   toggleFav()
   
  })

  return resultEl
}



 toggleFav = () =>{
   const checkboxes = document.querySelectorAll('.checkbox')

   //goes through each checkbox and sees if its checked
   //if it is... and it isn't already in favourites it pushes to that array
   //also removes from array if gets unchecked
   for (var i=0; i < checkboxes.length; i++){
    if ((checkboxes[i].checked) && (!favourites.includes(checkboxes[i].parentElement.textContent))){
       favourites.push(checkboxes[i].parentElement.textContent)
        let tempFav = [...favourites]
        let favourite = tempFav.pop()
        favContainer.appendChild(generateFavourites(favourite));
        tempFav = []
       
     } else if ((!checkboxes[i].checked) && (favourites.includes(checkboxes[i].parentElement.textContent))){
       //so get the name of what need to remove... then go through favs to find which index that belongs to and remove
       const toRemove = checkboxes[i].parentElement.textContent
        removeFav(toRemove)
        
     } else if ((checkboxes[i].checked) && (favourites.includes(checkboxes[i].parentElement.textContent))){
        continue;
         
     }
   }
    
 }
 
 
 
 
 
 
 
 
 
 
 
generateFavourites = (favourite) => {
        const favEl = document.createElement('label');
       const containerEl = document.createElement('div');
       const favText = document.createElement('span');
       
       favContainer.appendChild(containerEl);
       const removeButton = document.createElement('button');
       
       //set up text
       favText.textContent = favourite;
       containerEl.appendChild(favText);
       
       favEl.classList.add('list-item')
       favEl.classList.add('fav')
       containerEl.classList.add('list-item__container')
       favEl.append(containerEl)
       
       removeButton.textContent = 'X'
       removeButton.classList.add('button', 'button--text')
       favEl.appendChild(removeButton)
       removeButton.addEventListener('click', (e) => {
            //targets the checkbox and trims the Text including "/n" which is added
          const temp = e.path[1].innerText
          const toRemove = (temp.slice(0, -1)).replace(/^\s+|\s+$/g, '')
          removeFav(toRemove)
          toggleCheckboxRemove()
       })
       
       
       
       return favEl
 };
 
 
 
 removeFav = (toRemove) => {
    const allFav = favContainer.querySelectorAll('.fav');
 
    const removeIndex = favourites.findIndex((fav) => fav == toRemove)

    if (removeIndex > -1){
        favourites.splice(removeIndex, 1)
      allFav[removeIndex].parentNode.removeChild(allFav[removeIndex])
    }    

 }
 







 toggleCheckboxRemove = () =>{
   const checkboxes = document.querySelectorAll('.checkbox')

   for (var i=0; i < checkboxes.length; i++){
    if ((checkboxes[i].checked) && (!favourites.includes(checkboxes[i].parentElement.textContent))){
       checkboxes[i].checked = false;
     } 
   }

 }
 
 
 
 
 
 
document.querySelector('#share').addEventListener('click', (e) =>{
 
   
  fetch('/',{
    method:'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({favourites})

  });


});

