import axios from "axios"

const getbookdetail = async(id)=>{
    try{
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyD60Hxs2KHyOVKOeEoPVlpaItVOiy5d9vU`)
        const data = res.data
        return data
    }catch(err){
        console.log(err)
    }
}

export default getbookdetail