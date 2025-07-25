import  { useEffect } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import type { UpdateBookDto } from '@/types/book.dtos';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetBookByIdQuery,
  useUpdateBookByIdMutation,
} from '@/redux/features/books/bookApi';
import Swal from 'sweetalert2';

const UpdateBookPage = () => {
  const form = useForm<UpdateBookDto>();
  const { _id } = useParams() as { _id: string };  // nahole ts dhore nibe string | undefined
  console.log(_id)
  const navigate = useNavigate();
  
  const { data: book, isLoading, isError } = useGetBookByIdQuery(_id as string);
  console.log(book)
  const [ updateBookById ] = useUpdateBookByIdMutation();

  useEffect(() => {
    if(book){
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available,
      });
    }
  }, [book, form]);

  const handleUpdateBook = async (data: UpdateBookDto) => {
    const parsedData = {
      ...data,
      copies: Number(data.copies),
    };
    console.log("parsed ", parsedData, _id);
    try{
      const res = await updateBookById({ _id, payload: parsedData }).unwrap();
      console.log("Book updated", res);

      // alert show
      Swal.fire({
        title: "Book is updated!",
        icon: "success",
        draggable: true
      });
      form.reset();
      navigate('/')
    }
    catch(e){
      console.log("Failed to create book:", e)
    }
    
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className='max-w-[600px] mx-auto p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateBook)} className="space-y-4">

          <FormField name="title" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel> Title </FormLabel>
              <FormControl><Input {...field} placeholder="Enter title" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="author" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel> Author </FormLabel>
              <FormControl><Input {...field} placeholder="Enter author" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="genre" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel> Genre </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl  className='w-full '><SelectTrigger><SelectValue placeholder="Select genre" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="FICTION">FICTION</SelectItem>
                  <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                  <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                  <SelectItem value="HISTORY">HISTORY</SelectItem>
                  <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                  <SelectItem value="FANTASY">FANTASY</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="isbn" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel> ISBN </FormLabel>
              <FormControl><Input {...field} placeholder="Enter ISBN" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="description" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter description" rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="copies" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel> Copies </FormLabel>
              <FormControl><Input type="number" {...field} placeholder="Enter copies" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="available" control={form.control} render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormLabel>Available</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button className='w-full bg-blue-600' type="submit">Update</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBookPage;
