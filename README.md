# Receta

This is a test application to play around with Angular2 before starting a larger project.  Currently using ngrx for state management, mongodb and express on the backend.

This project was generated with [angular-cli](https://github.com/angular/angular-cli)

## TO RUN THIS APP

First, copy the config file in server/config folder with `cp config.sample.js config.js`.  Change the DB address to your local instance of Mongo or URI to Mongolab, etc.

I am using Yummly API to search for 3rd party recipes (which requires API keys).  Go [here](https://developer.yummly.com/) to get your own key.

Make sure mongo is running and then in one terminal, run `npm start` to get the backend running.

Then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
