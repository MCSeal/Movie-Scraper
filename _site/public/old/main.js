const Http = new XMLHttpRequest();
// document.getElementById('#search_box').addEventListener('keypress', (e) =>{
//     console.log('oivery')
// })
const resultsEl = document.querySelector('#results')

var resultsData = []

document.querySelector('#search_box').addEventListener('keypress', (e) =>{

    if (e.key === 'Enter') {
      var key = 'http://www.omdbapi.com/?apikey=78036a52&s='    
      var message = e.target.value
      var search= message.split(" ")
      
      for (var i=0; i < search.length - 1; i++){
              search[i] += "%20"
          }


      var fSearch = key+ search.join('')
      
      Http.open("get", fSearch);
      Http.send();
    
      Http.onreadystatechange=(e)=>{
        if (e.target.status === 200){
          response = Http.responseText
          const data = JSON.parse(response)

          if (data.Search){
              for (var i=0; i < data.Search.length - 1; i++){
                resultsData.push(data.Search[i])
                  
            }
            console.log(resultsData)
            resultsEl.appendChild(generateResults(resultsData))
            
          } else {
            console.log('Sorry no Results found, please try changing your search')
          }

        } else if (e.target.status !== 200){
          console.log("An error has taken place")
        }
   
          
      }

      
      
  } 
});


const getResultData = async (searchCriteria) => {
  const response = await fetch('searchCriteria')
}



generateResults = (results) =>{
   
  
  for (var i=0; i < results.length - 1; i++){
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const resultsText = document.createElement('span')
    
    //fav box set up
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)

    //setup results text
    resultsText.textContent = results[i].Title
    containerEl.appendChild(resultsText)

    

    return containerEl

    // resultsLi.classList.add('list-item')
    // containerEl.classList.add('list-item__container')
    
    // //add news list element and sets title
    // const newLi = resultsEl.appendChild(resultsLi)
    // newLi.textContent = results[i].Title
    
    
    // // checkbox.checked = todo.completed
    // containerEl.appendChild(checkbox)
    
    
    
 
 
 
  }
}


// // doResults = () => {










// // generateResults = () => {
  
// // }




// // doResults()
