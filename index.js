require('./src/db');
const server = require('./src/app');
const { db } = require('./src/db');

server.listen(3001, () => {
    console.log('CONNECTED ON PORT 3001');
});

db.sync({ force: true })
    .then(() => {
        console.log('CONNECTED TO POSTGRES')
    });
