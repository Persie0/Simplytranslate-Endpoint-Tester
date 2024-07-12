# SimplyTranslate API Tester

This project is an API that returns working instances of SimplyTranslate and Lingva translation services.

## Free public API endpoint
Make a GET request to:

https://simplytranslate-api-tester.vercel.app/getWorkingInstances

The API will return a JSON response with working instances of SimplyTranslate and Lingva translation services. For example:
```
{
"workingInstance": {
      "simply": [
         "https://simplytranslate.org/",
         "https://translate.northboot.xyz/",
         "https://sptl.ggtyler.dev/",
      ],
      "lingva": [
         "https://lingva.lunar.icu/",
         "https://lingva.nezumi.party/",
         "https://lingva.nirn.quest/"
      ]
   }
}
```

## Deploy an endpoint to Vercel yourself
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Persie0/simplytranslate_api_tester)


## Description

This application tests multiple SimplyTranslate and Lingva API endpoints for translation services. It measures the response time and checks the accuracy of translations from English to German.

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install express axios
   ```

## Usage

To run the API tester locally:

1. Start the server:
   ```
   node proxy.js
   ```

2. Make a GET request to the `/getWorkingInstances` endpoint:
   ```
   http://localhost:3000/getWorkingInstances
   ```

The API will return a JSON response with working instances of SimplyTranslate and Lingva translation services. For example:
```
{
"workingInstance": {
      "simply": [
         "https://simplytranslate.org/",
         "https://translate.northboot.xyz/",
         "https://sptl.ggtyler.dev/",
      ],
      "lingva": [
         "https://lingva.lunar.icu/",
         "https://lingva.nezumi.party/",
         "https://lingva.nirn.quest/"
      ]
   }
}
```
