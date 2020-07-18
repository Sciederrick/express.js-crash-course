const express = require('express')
const path = require('path')
var exphbs  = require('express-handlebars');
const logger = require('./middleware/logger');

//Models
const curators = require('./Curators')

const app = express()

//handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use(logger)

//Homepage Route
app.get('/', (req, res) => res.render('index', {
  title: 'Sample Trivial API',
  curators
}))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/curators', require('./routes/curators'))
app.use('/issues/categories', require('./routes/issues/categories'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
