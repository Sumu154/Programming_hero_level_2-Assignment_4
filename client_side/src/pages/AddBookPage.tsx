import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import type { CreateBookDto } from '@/types/book.dtos';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { usePostBooksMutation } from '@/redux/features/books/bookApi';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



const AddBookPage = () => {
  const form = useForm<CreateBookDto>()
  const [ postBook ] = usePostBooksMutation();
  const navigate = useNavigate()


  const onSubmit = async (data: CreateBookDto) => {
    console.log(data)
    const parsedData = {
      ...data,
      copies: Number(data.copies), // Convert copies to number
    };
    console.log(parsedData)

    try{
      const res = await postBook(parsedData).unwrap();
      console.log("Book created", res);

      // alert show
      Swal.fire({
        title: "Book is added!",
        icon: "success",
        draggable: true
      });
      form.reset();
      navigate('/')
    }
    catch(e){
      console.log("Failed to create book:", e)
    }

  }


  return (
    <div className='max-w-[600px] mx-auto p-8  '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormControl className='w-full '>
                  <SelectTrigger><SelectValue placeholder="Select genre" /></SelectTrigger>
                </FormControl>
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
              <FormLabel> Isbn </FormLabel>
              <FormControl><Input {...field} placeholder="Enter isbn" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="description" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter description"
                  className="w-full rounded border px-3 py-2"  
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />


          <FormField name="copies" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel> Copies </FormLabel>
              <FormControl><Input type="number" {...field} placeholder="Enter copies"  /></FormControl>
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

          <Button className='w-full bg-blue-600' type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddBookPage;