const axios = require('axios');
const cors = require('cors');
const express = require('express');
const dotenv=require('dotenv')

dotenv.config({path:'.env'})


// Create Express app
const app = express();
app.use(cors());
app.use(express.json());
// Define a route
app.post('/', async(req, res) => {
  try{
    if (!req.body || !req.body.text || typeof req.body.text !== 'string') {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const {text}=req.body

    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'en');
    encodedParams.set('to', 'fr');
    encodedParams.set('text', `${text}`);

    const options = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      },
      data: encodedParams,
    };
    const response = await axios.request(options);
	  res.status(200).json({translation:response.data.trans})
  }
  catch(err){
    console.log("error:",err)
    res.status(500).json({error:'error occured while translating'})
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
