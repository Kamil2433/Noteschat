const mongoose=require('mongoose')
const mongoURI='mongodb+srv://kamil:kamil@cluster0.u8ecui6.mongodb.net/?retryWrites=true&w=majority'

// 'mongodb://127.0.0.1:27017/CloudNote1?directConnection=true'
// mongodb://localhost:27017/
// mongodb://127.0.0.1:27017/?directConnection=true


const connectionParams={
    useNewUrlParser: true,
      useUnifiedTopology: true 
}

const connectmongo=async()=>{

// const mon=await mongoose.connect(mongoURI,connectionParams)

// console.log("connected successfully to mongodb")

mongoose.connect(mongoURI,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

}


module.exports=connectmongo;