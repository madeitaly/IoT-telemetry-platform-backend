import 'dotenv/config';
import express from "express";

const app = express()

//Environmental Variables
const port = process.env.PORT;


/////////////////////////////////////
//  ROUTING OF THE HTTPS REQUESTS ///
/////////////////////////////////////
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
