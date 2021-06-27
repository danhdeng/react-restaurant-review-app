import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

//load environment variables
dotenv.config();

const mongoClient=mongodb.MongoClient;

const port =process.env.PORT || 8000

mongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
   {
       poolSize:50,
       wtimeout:2500,
       useNewUrlParse: true,
       useUnifiedTopology: true
   })
   .catch(err=>{
       console.error(err.stack);
       process.exit(1);
   })
   .then(async client=>{
       //initialize db connection before server start
       await RestaurantsDAO.injectDB(client);
       await ReviewsDAO.injectDB(client);
       app.listen(port,()=>{
           console.log(`listening on port ${port}`)
       })
   })