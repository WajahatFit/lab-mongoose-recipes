const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({title: 'Paella', level : 'Easy Peasy', ingredients : 'arroz, maiz, pollo', cuisine : 'idk', diskType: 'main_course', image:'idk', duration: 30, creator : 'the chef'})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(()=>{
    console.log(Recipe.find({title:'Paella'}))
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'} , {duration:100})
  })
  .then((updatedRecipe)=> {
    console.log(updatedRecipe);
  })
  .then(()=> {
    return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .then (()=>{
    console.log('Carrot Cake Deleted!')
  })
  .catch(err => {
    console.log(err);
  })
  .then(()=>{
    mongoose.connection.close();
  })
  .finally(()=> console.log('this is from finally!'))
