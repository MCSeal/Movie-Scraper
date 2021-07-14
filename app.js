const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const crypto = require('crypto')

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const favDataModel = require('./model/fav')
const server = http.createServer(app);
const router = express.Router();
const Favourite = require('./model/fav')

mongoose.connect(`${process.env.MONGO}`)
.then(result => {
    app.listen(process.env.PORT ||8080);
})
.catch(err => {
    console.log(err);
});

app.use(express.json({limit: '2mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Movie Favourites',
        path: '/',
        favourites: [],
        shareBoxValue: "Click share!"
    
    })
})

//to fix!:

//2 reqs!  why








app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
});



app.post('/', (req, res) => {
   jsonFavs = req.body

   function isEmpty(obj) {
    return Object.keys(obj).length === 0;
    }
    //trying to get empty arrays put into db
    if (!isEmpty(jsonFavs) && jsonFavs.favourites){
    crypto.randomBytes(6, (err, buffer)=>{
        const token = buffer.toString('hex')
        

        const favArray = new favDataModel({
            favs: jsonFavs,
            shareCode: token
        }) 
    
        return favArray.save()
        .then(result => {
            res.status(201).json({ path: `/share/${token}` })
        })
    
        .catch(err => {
            console.log(err);
        })
    

    })
    }

});



app.get('/share/:shareToken', (req, res, next) => {
   const shareToken = req.params.shareToken
    
   

   if (shareToken !== null){
    Favourite.findOne({shareCode: shareToken})
    .then(result => {
        res.render('index', {
            pageTitle: 'Movie Favourites',
            path: '/share/:shareToken',
            favourites: result.favs[0].favourites,
            shareBoxValue: 'https://movie-scraper-ms.herokuapp.com/share/' + shareToken
        
        })
    })
    .catch(err => {
        console.log(err);
    })

   } else{
       next()
   }

})



