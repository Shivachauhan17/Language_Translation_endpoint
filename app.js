const axios = require('axios');
const cors = require('cors');
const express = require('express');

app.use(cors());
// Create Express app
const app = express();
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
        'X-RapidAPI-Key': '6429489ee3msh613285eae7000fep119206jsn0eb3a9730243',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
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
