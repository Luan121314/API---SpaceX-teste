import mongoose from 'mongoose';

const password = process.env.PASSWORD;
const dbName = process.env.DATABASE_NAME;

const urlConnetion = `mongodb+srv://user01:${password}@mongodatabase01-7udss.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connection = mongoose.connect(urlConnetion,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        appname: dbName,
        autoIndex: true
    }, err => {
        if (err) return;
        console.log('Database conected ')
    });

export default connection



