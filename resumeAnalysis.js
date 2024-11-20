const express = require('express');
const router = express.Router();
const MeaningCloud = require('meaning-cloud');

// Create a MeaningCloud API client
const mc = new MeaningCloud({
  key: 'YOUR_API_KEY',
  url: 'https://api.meaningcloud.com/',
});

// Create a POST endpoint to analyze the user's resume
router.post('/analyze', (req, res) => {
  const resumeText = req.body.resumeText;

  // Send the resume text to the MeaningCloud API
  mc.topics({
    txt: resumeText,
    lang: 'en',
    tt: 'ec',
    uw: 'y',
    dm: 's',
  }, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error analyzing resume' });
    } else {
      const analysisResults = response.entity_list;
      res.send(analysisResults);
    }
  });
});

module.exports = router;
