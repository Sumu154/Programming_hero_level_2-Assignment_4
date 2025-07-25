import { useGetBorrowsQuery } from '@/redux/features/borrows/borrowApi';
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const BorrowSummaryPage = () => {
  const { data: borrows, isLoading, isError } = useGetBorrowsQuery();
  console.log(borrows);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;


  return (
    <div className='m-4'>
      <Table className='min-w-[650px] md:w-[90%] lg:w-[80%] mx-auto rounded-t-2xl overflow-hidden   '>
        <TableHeader className='bg-blue-600' >
          <TableRow className=''  >
            <TableHead>  </TableHead>
            <TableHead className='text-white text-center'> Title </TableHead>
            <TableHead className='text-white text-center'> isbn </TableHead>
            <TableHead className='text-white text-center'> Quantity </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { borrows?.map((it, index) => {
            return <TableRow>
              <TableCell className='text-center'> {index+1} </TableCell>
              <TableCell className='text-center'> {it.title} </TableCell>
              <TableCell className='text-center'> {it.isbn} </TableCell>
              <TableCell className='text-center'> {it.quantity} </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummaryPage;