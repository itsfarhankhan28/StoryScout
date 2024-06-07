/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import getbookdetail from "../customHooks/getbookdetail"
import { Link } from "react-router-dom"

const BookDetail = () => {

    const [singleBookData,setSingleBookData] = useState()
    const [bookshelf,setBookshelf] = useState([])
    console.log(bookshelf)

    const params = useParams()
    const book_id = params.id

    const getSingleBookData = async(id)=>{
        const singlebookdata = await getbookdetail(id)
        console.log(singleBookData)
        setSingleBookData(singlebookdata)
    }

    const AddToBookShelf = (id,thumbnail,title,authorname)=>{
        setBookshelf([...bookshelf,{book_id:id,thumbnail:thumbnail,title:title,author:authorname}])
    }

    const AddToLocalStorage = (bookshelf)=>{
        const booksJson = JSON.stringify(bookshelf)
        localStorage.setItem("mybooks",booksJson)
    }

    


    useEffect(()=>{
        getSingleBookData(book_id)
    },[])

  return (
    <div className="flex justify-center items-center gap-10 py-20">
        <div className="flex gap-5 justify-between flex-col p-5 w-[1000px]">
            <div className="flex gap-5 justify-between xxsm:flex-col md:flex-row">
                <div className="md:w-[30%] flex justify-start items-center">
                    <img className="w-[300px]" src={singleBookData?.volumeInfo?.imageLinks?.thumbnail} alt="" />
                </div>
                <div className="md:w-[70%] flex flex-col justify-between xxsm:gap-5 md:gap-0">
                    <div className="flex flex-col gap-5">
                        <div className="leading-7">
                            <h1 className="font-semibold text-lg">Book Title: <span className="font-normal text-md">{singleBookData?.volumeInfo?.title}</span></h1>
                            <h1 className="font-semibold">Author: <span className="font-normal">{singleBookData?.volumeInfo?.authors?.map((data)=>{
                                return data
                            })}</span></h1>
                        </div>
                        <div>
                            <h1 className="font-semibold">Published In: <span className="font-normal">{singleBookData?.volumeInfo?.publishedDate}</span></h1>
                            <h1 className="font-semibold">Published By: <span className="font-normal">{singleBookData?.volumeInfo?.publisher}</span></h1>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <button 
                        onClick={()=>AddToBookShelf(singleBookData?.id,singleBookData?.volumeInfo?.imageLinks?.thumbnail,singleBookData?.volumeInfo?.title,singleBookData?.volumeInfo?.authors?.map((data)=>{
                            return data
                        }))}
                        className="bg-black text-white font-semibold xxsm:text-sm md:text-lg px-5 py-2 rounded-xl">
                            Add to BookShelf
                        </button>
                        <Link to='/mybooks'>
                            <button 
                            onClick={()=>AddToLocalStorage(bookshelf)}
                            className="bg-black text-white font-semibold xxsm:text-sm md:text-lg px-5 py-2 rounded-xl">
                                View BookShelf
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-xl">Description:-</h1>
                <div>{singleBookData?.volumeInfo?.description}</div>
            </div>
        </div>
    </div>
  )
}

export default BookDetail
