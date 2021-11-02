const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected',()=>{
    console.log('Mongoose connected');
})


mongoose.connection.on('disconnected',()=>{
    console.log('Mongoose disconnected');
})

// const gracefulShutdown = (msg, callback) => {
//     mongoose.connection.close( () => {
//         console.log(`Mongoose disconnected through ${msg}`);
//         callback();
//     });
// };

require('./locations');

// process.once('SIGUSR2', () => {
//     gracefulShutdown('nodemon restart', () => {
//         process.kill(process.pid, 'SIGUSR2');
//     });
// });
// process.on('SIGINT', () => {
//     gracefulShutdown('app termination', () => {
//         process.exit(0);
//     });
// });
// process.on('SIGTERM', () => {
//     gracefulShutdown('Heroku app shutdown', () => {
//         process.exit(0);
//     });
// });

