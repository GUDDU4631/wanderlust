if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const app = require("./app");
const port = 8000;

const mongoose = require('mongoose');
//mongoDB connection
const MONGO_ATLAS_URL = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(MONGO_ATLAS_URL);
}
main().then(() => {
    console.log('data base successfully connect with backend');
}).catch(err => {
    console.log(err);
});

//routs for crud operation

app.listen(port, () => {
    console.log('app listenning...')
});