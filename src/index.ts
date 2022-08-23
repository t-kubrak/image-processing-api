import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('images'));

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get('/api/images', (req, res) => {
    res.send('Loading...');
});
