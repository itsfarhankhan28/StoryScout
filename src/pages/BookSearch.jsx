/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import getBooks from "../customHooks/getBooks"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BookSearch = () => {

    const [searchValue,setSearchValue] = useState('Harry Potter')
    const [books,setBooks] = useState()
    const [filteredBooks,setFilteredBooks] = useState()

    const [category, setCategory] = useState('All');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const getBooksData = async(searchVal)=>{
        const booksdata = await getBooks(searchVal)
        setBooks(booksdata) 
    }

    // console.log(category)
    console.log(books)
    console.log(category)

    const FilterOnClick = ()=>{
        if(category == 'All'){
            setFilteredBooks(books)
        }else{
            const filtered = books?.filter((data)=>{
                return data?.volumeInfo?.categories?.map((item)=>{
                    return item.includes(category)
                })
            })
            setFilteredBooks(filtered)
        }
    }

    console.log(filteredBooks)

    useEffect(()=>{
        getBooksData(searchValue)
    },[searchValue])

        useEffect(() => {
            FilterOnClick();
          }, [books, category]);


  return (
    <div className="md:p-10 xxsm:p-5 flex flex-col gap-10">
        <div className="flex xxsm:flex-col xxsm:gap-5 md:flex-row md:justify-between items-center">
            <h1 className="text-3xl font-semibold">Available books:-</h1>
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                    className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700">
                    Search
                </button>
            </div>
        </div>
        <div className="flex gap-1">
            <div className="xxsm:w-[150px] md:w-[300px]">
                <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter By Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Filter By Category"
                    onChange={handleChange}
                    >
                    <MenuItem value='All'>All</MenuItem>
                    <MenuItem value='Art'>Art</MenuItem>
                    <MenuItem value='Music'>Music</MenuItem>
                    <MenuItem value='Children'>Children</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </div>
        </div>
        <div className="w-full flex justify-center items-center flex-wrap gap-10">
            {filteredBooks ? filteredBooks?.map((data)=>{
                return (
                    <>
                    <Link to={`/book/${data?.id}`}>
                    <div className="md:w-[400px] md:h-[250px] xxsm:w-[350px] xxsm:h-[200px] rounded-2xl shadow-xl flex gap-3">
                        <div className="flex flex-col justify-center items-center w-[40%] border-r-2">
                            <img src={data?.volumeInfo?.imageLinks?.thumbnail} alt="Image not found" />
                        </div>
                        <div className="flex justify-center items-start flex-col w-[60%] gap-3">
                            <h1 className="font-semibold">Book title: <span className="font-normal">{data.volumeInfo.title}</span></h1>
                            <h1 className="font-semibold">Author: <span className="font-normal">{data?.volumeInfo?.authors?.map((data)=>{
                                return data
                            })}</span></h1>
                        </div>
                    </div>
                    </Link>
                    </>
                )
            }) : <Loader/>}
        </div>
    </div>
  )
}

export default BookSearch
