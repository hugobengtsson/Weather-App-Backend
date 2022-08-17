import Express from "express";

const app = Express();
const port = 3000;


app.use(Express.static("Client"))

app.get("/", (req, res) => {


    res.send("Hello värld")

})


app.listen( port, () => {
    console.log("Server is running on port: " + port)
})