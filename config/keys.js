// get password from env variables ?
// module.exports = {
//    mongoURI: process.env.dbPassword
// }

// dbPassword = "mongodb+srv://userNAMEhere:userPASSWORDhere@cluster0.ycepu.mongodb.net/test?retryWrites=true&w=majority";
// local DB
// url = 'mongodb://127.0.0.1:27017/agenda';

// docker mongo container
url = 'mongodb://mongo:27017/agenda'

module.exports = {
    mongoURI: url
    // mongoURI: dbPassword
}