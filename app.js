const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router({});
require('dotenv/config')

//Import Routes
const navBarRoutes = require('./routes/NavBarItemRoutes')
const newsItemsRoutes = require('./routes/NewsItemRoutes')
const healthCheck = require('./routes/HelathCheck')
const reviewerRouter = require('./routes/ReviewerRoute')
const AboutRoutes = require('./routes/AboutRoutes')
const EventDateRoutes = require('./routes/EventDateRoutes')
const AdminRoute = require('./routes/AdminRoute')
const EditorNotificatiins = require('./routes/EditorNotificationRoutes')
const EventTopic = require('./routes/EventTopicRoutes')
const userRoutes = require('./routes/NormalUserRoutes')
const ResearcherRoutes = require('./routes/ResearcherRoutes')
const workshopConductor = require('./routes/WorkCoordRoutes')
const ImageUploadRoutes = require('./routes/ImageUpload')
const workshop = require('./routes/WorkshopRoutes')
const keynote = require('./routes/KeynoteSpeak')
const price = require('./routes/PriceRoutes')
const EventManageRoute = require('./routes/EventManageRoute')
const ResearchPaper = require('./routes/ResearchPaperRoute')
const Payment = require('./routes/Payment')
const Editor = require('./routes/EditorRouted')
const research = require('./routes/ResearchRoutes')


//Middleware
app.use(bodyParser.json())
app.use(cors())
app.use('/',healthCheck)
app.use('/nav-items', navBarRoutes);
app.use('/news', newsItemsRoutes);
app.use('/reviewer', reviewerRouter);
app.use('/about',AboutRoutes)
app.use('/event-date',EventDateRoutes)
app.use('/edi-noti',EditorNotificatiins)
app.use('/topic',EventTopic)
app.use('/n-user',userRoutes)
app.use('/admin',AdminRoute)
app.use('/researcher',ResearcherRoutes)
app.use('/n-wc',workshopConductor)
app.use('/image',ImageUploadRoutes)
app.use('/wShop',workshop)
app.use('/keynote',keynote)
app.use('/price',price)
app.use('/event-update', EventManageRoute);
app.use('/researchPaper',ResearchPaper)
app.use('/payment',Payment)
app.use('/editor',Editor)
app.use('/resrch', research)

app.use(express.static('uploads'))




//connecting to the database
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true , useUnifiedTopology:true},
    () =>{
        console.log("connected to the database")
    }
)

//server start
app.listen(8000);