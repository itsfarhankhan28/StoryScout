import axios from "axios"

const getBooks = async(searchVal)=>{
    try{
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchVal}:keyes&key=AIzaSyD60Hxs2KHyOVKOeEoPVlpaItVOiy5d9vU`)
        const data = res.data
        console.log(data)
        return data.items
    }catch(err){
        console.log(err)
    }

}

export default getBooks