import express from "express"
import reviewsRouter from "./routes/reviews.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("./frontend/dist"))

app.use("/api", reviewsRouter);

//instructor said that this is very useful for express
app.use(express.urlencoded({ extended: true}))


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})

// ALWAYS MAKE SURE THE ADD THE SERVER URL AS A PROXY IN THE FRONTEND package.json 
// SHOULD BE THE SAME URL AS THE node.js AND express SERVERS ARE RUNNING ON
// adding the proxy to the frontend package.json file allows us to edit jsx code and update the frontend real time without having to maunally run a build command after every change
// also need to add the proxy server to the vite config file in the frontend