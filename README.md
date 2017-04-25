# Hood Scraping


We will create a website with data about local Seattle neighborhoods.

We will data scrape from `http://www.visitseattle.org/things-to-do/neighborhoods/`, and put this data into our own database.

We should have two routes for our webpage:

1. `GET /` - displays an index of all the neighborhoods
2. `GET /:name` - displays info about one particular neighborhood

We'll make a scraping script `scrape.js` that we can run once to populate our database.

Refer to these notes for help:

* [`cheerio` module](https://wdi_sea.gitbooks.io/notes/content/02-js-jquery/js-data-scraping/readme.html)

* [`async` module](https://wdi_sea.gitbooks.io/notes/content/02-js-jquery/js-async/readme.html)

## Getting Started

0. Fork this repo, clone, `cd` into it
1. `npm init`
2. Install the modules we need: `npm install --save ...`
  * We are using sequelize...refer to your notes for what modules we need for that.
  * What is the web server framework we are using? Need that too...
  * Any other common modules?
3. Create a database.
  * `sequelize init`
  * Good name for db: `seattle_hoods_db`
  * `createdb ...`
4. We need one table- `neighborhood`. Check out the source website we will be scraping. What data is there to get for each neighborhood? These will be our columns.
  * `sequelize model:create --name ... --attributes "column1:type, column2:type ..."`
5. Run the migrations!
  * `sequelize db:migrate`

## Task

There are three stages to this task.

1. Scrape for data
2. Create the web server
3. Style

For help with `cheerio` or `async`, refer to the notes linked above.

---

### 1. Scrape for data

You will create a script that scrapes the `www.visitseattle.org` website. It will populate the `neighborhood` table with data.

Make a file called `scrape.js`. To run it, you do `node scrape.js`. You need the `request` and `cheerio` modules (why?).

Remember, `http://www.visitseattle.org/things-to-do/neighborhoods/` is the page where you scrape a list of all the neighborhoods. From that list, you need to `request` each neighborhood URL and scrape the response with `cheerio`.

For each scraped neighborhood, add data to your table:

```
db.neighborhood.create({
  // ...
});
```

1. Get list of all neighborhoods from `http://www.visitseattle.org/things-to-do/neighborhoods/`
2. For each neighborhood, scrape and add to table. Use `async` for this part!

Once you see all the data in your table in Postico, you are done with this step.

---

### 2. Create the web server

1. Create your webserver entry point file (probably `index.js`).
2. Require the modules you need:
  * ex: `var moduleName = require('module-name');`
  * express path ejs body-parser express-ejs-layouts
3. Create the express app
  * `var app = express();`
4. Set up the middleware you need
  * `app.use(...);`
  * How do we set up static file serving?
  * How do we set up the ejs template engine, and use eje layouts?
  * Use the `morgan` module for request logging!
  * If you want a table of your routes, use the module `https://github.com/Hoten/rowdy`
5. Set up your routes
  * GET /             | Neighboorhood index
  * GET /:name        | Neighborhood show

  For each route:
    1. `app.<verb>(function(req, res) { ... })`
    2. Query the database for the data you need
    3. Pass that data to an ejs template: `res.render('...', ...)`
    4. Don't forget error handling!

You should end up with a rather short `index.js` file. All the hard work was done in `scrape.js`.

---

### 3. Style

CSS time!

![](css-time.gif)
