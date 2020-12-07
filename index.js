import dotenv from 'dotenv';
dotenv.config();
import express from 'express' ;
import cors from 'cors' ;
import {connectMongoDatabase} from './app/utils/config/mongoose.js'
import {router} from './app/router.js';

connectMongoDatabase();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({extended:true}))

app.get('/',(req,res)=>{
    res.send("Success")
})

app.use('/api',router)
app.listen(port, () => {
    console.info(`App started listening at :${port}`);
});

app.use((req, res, next) => {
    res.status(404).send("Invalid path");
});
  
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === "development" ? err : {};

    console.error("Global Handler - Unexpected Error happened", err.message);
    // render the error page
    res.status(err.status || 500);
    res.render("Unexpected error happened.");
});