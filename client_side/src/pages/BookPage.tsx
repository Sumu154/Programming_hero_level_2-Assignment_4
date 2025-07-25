import { useState } from 'react';
import { useDeleteBookByIdMutation, useGetBooksQuery } from '@/redux/features/books/bookApi';
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import type { BookResponseDto } from '@/types/book.dtos';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import BorrowModal from '@/components/others/BorrowModal';

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookResponseDto | null>(null);


  const navigate = useNavigate();
  const { data: books, isLoading, isError } = useGetBooksQuery();
  // console.log(books);
  const [ deleteBookById ] = useDeleteBookByIdMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;


  const handleUpdate = async (book: BookResponseDto) => {
    console.log(book._id);
    navigate(`/updateBook/${book._id}`)
  }

  const handleDelete = async (book: BookResponseDto) => {
    // console.log(book._id);
    const { _id } = book
    const swalRes = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if(swalRes.isConfirmed) {
      const res = await deleteBookById({ _id }).unwrap();
      console.log("Book deleted", res);
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }

  }


  const handleBorrow = async (book: BookResponseDto) => {
    console.log(book._id);
    setModalOpen(true);
    setSelectedBook(book)
    
  }

  return (
    <div className='m-4'>
      <Table className='min-w-[650px] md:w-[90%] lg:w-[80%] mx-auto rounded-t-2xl overflow-hidden   '>
        <TableHeader className='bg-blue-600' >
          <TableRow className=''  >
            <TableHead>  </TableHead>
            <TableHead className='text-white text-center'> Title </TableHead>
            <TableHead className='text-white text-center'> Author </TableHead>
            <TableHead className='text-white text-center'> Genre </TableHead>
            <TableHead className='text-white text-center'> isbn </TableHead>
            <TableHead className='text-white text-center'> Copies </TableHead>
            <TableHead className='text-white text-center'> Available </TableHead>
            <TableHead className='text-white text-center'> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { books?.map((it, index) => {
            return <TableRow>
              <TableCell className='text-center'> {index+1} </TableCell>
              <TableCell className='text-center'> {it.title} </TableCell>
              <TableCell className='text-center'> {it.author} </TableCell>
              <TableCell className='text-center'> {it.genre} </TableCell>
              <TableCell className='text-center'> {it.isbn} </TableCell>
              <TableCell className='text-center'> {it.copies} </TableCell>
              <TableCell className='text-center'> {it.available===true ? 'Yes' : 'No'} </TableCell>
              <TableCell className='flex gap-6 justify-center items-center'> 
                <FaEdit onClick={()=>handleUpdate(it)} className='text-[22px] text-blue-600 '></FaEdit>  
                <MdDelete onClick={()=>handleDelete(it)} className='text-[24px] text-red-700'></MdDelete>
                <FaBook onClick={()=>handleBorrow(it)}  className='text-[18px] text-green-800 '></FaBook> 
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      {/* modal */}
      {selectedBook && (
        <BorrowModal
          book={selectedBook}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}      
    </div>
  );
};


export default HomePage;