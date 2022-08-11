const express =require('express')
const articleRouter = require('./routes/articles')
const Article = require('./modules/article')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express();
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true})
// mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true, useCreateIndex: true})

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/', async (req,res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index',{articles:articles})
})

app.use('/articles', articleRouter);
app.listen(3000,()=>{
    console.log("server running on port 3000")
})