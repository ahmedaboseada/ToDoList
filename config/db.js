const mongoDB = require('mongoose')
mongoDB.connect('mongodb+srv://kokoseda:116574Mm@devtamiapi.qyh3s.mongodb.net/toDoListAPP?retryWrites=true&w=majority&appName=DevtamiAPI', {
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(
        `MongoDB Connected with error: ${err}`
    );
})

module.exports = mongoDB;
