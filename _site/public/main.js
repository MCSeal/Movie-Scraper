const Http = new XMLHttpRequest();

const resultsEl = document.querySelector('#results')
arrayCounter = 0;
var resultsData = []

document.querySelector('#search_box').addEventListener('keypress', (e) =>{

    if (e.key === 'Enter') {
      clearResults();
      var key = 'http://www.omdbapi.com/?apikey=78036a52&s='    
      var message = e.target.value



      var fSearch = key + message
      // console.log(fSearch)
     getResultData(fSearch)
    

      
      
  } 
});


const getResultData = async (searchCriteria) => {
  const response = await fetch(searchCriteria);
  if (response.status === 200){
    const data = await response.json()
    console.log(data)
      if (data.Search){
        for (var i=0; i < data.Search.length - 1; i++){
          resultsData.push(data.Search[i])
            
      }
      // console.log(resultsData)
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
   
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const resultsText = document.createElement('span')
    
    containerEl.classList.add('list-item__container')
    //fav box set up
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)

    //setup results text
    resultsText.textContent = results[arrayCounter].Title
    containerEl.appendChild(resultsText)
    arrayCounter ++;
    return containerEl





      // resultsLi.classList.add('list-item')
      // 
    
    
    // //add news list element and sets title
    // const newLi = resultsEl.appendChild(resultsLi)
    // newLi.textContent = results[i].Title
    
    
    // // checkbox.checked = todo.completed
    // containerEl.appendChild(checkbox)
    
 
  
  
}


