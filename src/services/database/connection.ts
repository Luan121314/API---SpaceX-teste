import manifest from '../../manifest';
import mongoose from 'mongoose';

const connection = () => {
    const {databaseName, password} = manifest.database;
    const uri = `mongodb+srv://user01:${password}@mongodatabase01-7udss.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    const connectionOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        appname: databaseName,
        autoIndex: true
    }
    
    mongoose.connect(uri, connectionOptions, err => {
            if (err) {
                console.log(err);
                return
            };
            console.log('Database conected ')
        });
}

export default connection



