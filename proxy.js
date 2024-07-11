const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());


const simply_base_url = [
  'https://simplytranslate.org/',
  'https://translate.northboot.xyz/',
  'https://sptl.ggtyler.dev/',
  'https://t.opnxng.com/',
  'https://simplytranslate.pussthecat.org/',
  'https://translate.slipfox.xyz/',
  "https://translate.tiekoetter.com/",
  "https://trap.her.st/",
];

const simply = simply_base_url.map(base => `${base}api/translate/?engine=google&from=en&to=de&text=`);


const lingva_base_url = [
  "https://lingva.garudalinux.org/",
    "https://lingva.lunar.icu/",
    "https://translate.plausibility.cloud/",
  ];

const lingva = lingva_base_url.map(base => `${base}api/v1/en/de/`);


async function testTranslationAPIs() {
  const startTime = Date.now(); // Record the start time

  const testAPI = async (url, index, type) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request ${index} to ${url} timed out`));
      }, 1500); // 1.5 seconds timeout
    });

    try {
      const requestStartTime = Date.now(); // Record the start time of each request

      const response = await Promise.race([
        fetch(`${url}${encodeURIComponent('Hello')}`),
        timeoutPromise,
      ]);

      const requestEndTime = Date.now(); // Record the end time of each request

      if (response.ok) {
        const timeTaken = requestEndTime - requestStartTime;
        const result = await response.json();
        if (result['translated-text'] === "Hallo" || result['translation'] === "Hallo" || result['translated_text'] === "Hallo") {
          console.log(`Request ${index} to ${url} succeeded. Time taken: ${timeTaken}ms`);
          return { url, timeTaken }; // Return the url and time taken if the request was successful
        } else {
          console.error(`Error testing server reachability for ${url}: Translation is not correct!`);
        }
      }
    } catch (error) {
      // Handle errors, or simply ignore them if you want to continue checking other URLs
      console.error(`Request ${index} to ${url} failed with error: ${error.message}`);
    }
    return null; // Return null if the request was not successful
  };

  const simplyPromises = simply.map((url, index) => testAPI(url, index, 'simply'));
  const lingvaPromises = lingva.map((url, index) => testAPI(url, index, 'lingva'));

  const simplyResults = await Promise.all(simplyPromises);
  const lingvaResults = await Promise.all(lingvaPromises);

  const workingSimply = simplyResults.filter(result => result !== null);
  const workingLingva = lingvaResults.filter(result => result !== null);

  const totalTimeTaken = Date.now() - startTime;
  console.log(`All requests completed in ${totalTimeTaken}ms.`);

  return {
    simply: workingSimply,
    lingva: workingLingva
  };
}




app.get('/getWorkingInstances', async (req, res) => {
  try {
    const workingInstance = await testTranslationAPIs();
    if (workingInstance) {
      res.json({ workingInstance });
    } else {
      res.status(503).json({ error: 'No working translation API found' });
    }
  } catch (error) {
    console.error('Error in /getWorkingInstances:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

