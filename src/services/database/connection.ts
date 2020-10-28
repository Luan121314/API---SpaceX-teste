import mongoose from 'mongoose';

const connection = () => {
    const password = process.env.PASSWORD;
    const dbName = process.env.DATABASE_NAME;
    const urlConnetion = `mongodb+srv://user01:${password}@mongodatabase01-7udss.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    
    mongoose.connect(urlConnetion,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            appname: dbName,
            autoIndex: true
        }, err => {
            if (err) {
                console.log(err);

                return
            };
            console.log('Database conected ')
        });
}

export default connection



