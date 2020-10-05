import express from 'express'
import data from './data'
import path from 'path'
import dotenv from 'dotenv'
import config from './config'
//import "core-js/stable";
//import "regenerator-runtime/runtime";
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import uploadRoute from './routes/uploadRoute'



dotenv.config();
/* Connect to database */
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason))

const app =  express()
app.use(bodyParser.json())

//----------------------deployment heroku------------------------------
//app.use("/", express.static(__dirname + "/../frontend/build"));
//app.get("/", (req, res) => res.sendFile(__dirname  + "/../frontend/build/index.html"))

//app.use(express.static(path.join(__dirname, '/../frontend/build')));
//app.get('*', (req, res) => res.sendFile(path.join('${__dirname}/../frontend/build/index.html')));

//app.listen(config.PORT, () => {
//  console.log('Server started at port ' + `${config.PORT}`);
//});
//OK !!!


app.use("/api/uploads", uploadRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use('/api/orders', orderRoute);
app.get("/api/config/paypal", (req, res) =>{
    res.send(config.PAYPAL_CLIENT_ID)
})
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => { res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))

});



// app.get("/api/products/:id", (req,res) =>{
//     const productId = req.params.id
//     const product = data.products.find(x => x._id === productId)
//     if(product)
//         res.send(product)
//     else
//     res.status(404).send({msg: "Product Not Found."})
// })

// app.get("/api/products", (req,res) =>{
//     res.send(data.products);
// })

app.listen(config.PORT, () => {console.log("Server started at " + config.PORT)})