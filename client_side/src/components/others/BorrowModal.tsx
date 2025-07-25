import Modal from 'react-modal';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import type { CreateBorrowDto } from '@/types/borrow.dtos';
import { usePostBorrowMutation } from '@/redux/features/borrows/borrowApi';
import type { BookResponseDto } from '@/types/book.dtos';
import Swal from 'sweetalert2';

interface BorrowModalProps {
  book: BookResponseDto; // define fully
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}


const BorrowModal: React.FC<BorrowModalProps> = ({ book, modalOpen, setModalOpen }) => {
  const form = useForm<CreateBorrowDto>();
  const [ postBorrow ] = usePostBorrowMutation();


  const handleBorrowSubmit = async (borrow: CreateBorrowDto) => {
    const parsedData = {
      ...borrow,
      quantity: Number(borrow.quantity), // Convert copies to number
      book: book._id
    };
    console.log(parsedData)
   try{
      await postBorrow(parsedData).unwrap();
      setModalOpen(false);

      // add alert
      Swal.fire({
        title: "Borrow is completed!",
        icon: "success",
        draggable: true
      });
      form.reset();
    } 
    catch(error) {
      console.error('Borrow failed:', error);
    }
  };

  return (
    <Modal
    isOpen={modalOpen}
    onRequestClose={() => setModalOpen(false)}
    contentLabel="Example Modal"
    className="bg-white p-6 rounded-lg w-[300px] sm:w-[360px] md:w-[390px] lg:w-[420px] mx-auto mt-20 shadow-lg"
    overlayClassName="fixed inset-0 bg-dark/30 flex justify-center items-center"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleBorrowSubmit)} className="space-y-4">
          <FormField name="quantity" control={form.control}
          rules={{
            required: "Quantity is required",
            min: { value: 1, message: "Minimum quantity is 1" },
            max: { value: book.copies, message: `Maximum quantity is ${book.copies}` },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={1} max={book.copies} placeholder="Enter quantity"/>
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )} />

          <FormField name="dueDate" control={form.control}
          rules={{ required: "Due date is required" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field}
                value={typeof field.value === 'string'?field.value : field.value instanceof Date?field.value.toISOString().split('T')[0] : ""} 
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )} />

          <Button type="submit" className="w-full bg-blue-600"> Submit </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default BorrowModal;
