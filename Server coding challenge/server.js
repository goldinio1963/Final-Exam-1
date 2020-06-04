const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const {Actors} = require('./models/actor-model');
const {Movies} = require ('./models/movie-model')

const app = express();

app.patch('/api/add-movie-actor/:movie_ID', jsonParser, (req,res) => {
    const pid = req.params;

    if(!pid){
        const error = 406;
        res.statusMessage = "Id is missing in the body of the request"
        errorHandler(error, req, res);
    }

    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const bid = req.body.actor_ID;

    console.log(pid)
    console.log(bid)
    console.log(fname)

    if(pid != bid) {
        const error = 409;
        res.statusMessage = "id and movie_ID do not match "
        errorHandler(error, req, res);
    }

    if(!fname || !lname) {
        const error = 403;
        res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list"
        errorHandler(error, req, res);
    }

    Actors
        .getActorByName(fname, lname)
        .then(actor => {
            console.log(actor)
        })
        .catch(err => {
            const error = 404;
            res.statusMessage = "The actor or movie do not exist"
            errorHandler(error, req, res);
        });

    Movies
        .getMovieById(pid)
        .then(movie => {
            console.log(movie)
        })
        .catch(err => {
            const error = 404;
            res.statusMessage = "The actor or movie do not exist"
            errorHandler(error, req, res);
        });

    Movies
        .addActorToMovieList(pid, fname, lname)
        .then(movie => {
            return res.status(201).json(movie)
        })
        .catch(err => {
            const error = 500;
            res.statusMessage = "Error on the database"
            errorHandler(error, req, res);
        });
    

}),

/* 
    Your code goes here 
*/

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});