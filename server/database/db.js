import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://vikram:vikramnaik@cluster0.dt8oe9s.mongodb.net/whatsapp?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;