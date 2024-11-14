const mongoDB = require('mongoose')
mongoDB.connect('mongodb://localhost:27017/toDoListAPP', {
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(
        `MongoDB Connected with error: ${err}`
    );
})

module.exports = mongoDB;