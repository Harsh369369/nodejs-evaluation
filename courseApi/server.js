const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));



    const uri = 'mongodb+srv://harshgera003:S5cRT4nfGZgTmGeN@evaluation.rxqldjq.mongodb.net/?retryWrites=true&w=majority&appName=evaluation';
    const client = new MongoClient(uri);


    client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    const db = client.db('courses');

    
app.get('/courses:page:limit:category:difficulty', async (req, res) => {
    const { page, limit, category, difficulty } = req.params;
    const course = await db.collection('course').aggregate([{$match: { $and: [{category: category},{difficulty: difficulty}] }},{$skip: (page-1)*10},{$limit: limit  }]).toArray();
    res.send(course);
});
app.get('/my-courses', async (req, res) => {
    const course = await db.collection('my-course').find({}).toArray();
    res.send(course);
});

app.post('/enroll', (req, res) => {
    const course = db.collection('course').find({ _id: new ObjectId(req.body.id) });
    db.collection('my-course').insertOne(course);
    res.send('Course enrolled successfully');
});

app.post('/cancle-enrollment', async (req, res) => {
    await db.collection('my-course').deleteOne({ _id: new ObjectId(req.body.id) });
    res.send('Course cancelled successfully');
});

})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});




