import { baseApi } from "@/redux/apis/baseApi";
import type { BookResponseDto, CreateBookDto, UpdateBookDto } from "@/types/book.dtos";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all books
    getBooks: builder.query<BookResponseDto[], void>({
      query: () => ({
        url: '/books',
        method: 'GET'
      }),
      providesTags: ['Book'],
    }),
    // get all books
    getBookById: builder.query<BookResponseDto, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: 'GET'
      }),
      providesTags: ['Book'],
    }),
    // post all books
    postBooks: builder.mutation<BookResponseDto, CreateBookDto>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    // update a book
    updateBookById: builder.mutation<BookResponseDto, {_id: string, payload: UpdateBookDto}>({
      query: ({_id, payload}) => ({
        url: `/books/${_id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Book'],
    }),
    // delete a book
    deleteBookById: builder.mutation<BookResponseDto, {_id: string}>({
      query: ({_id}) => ({
        url: `/books/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),

  })
})

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  usePostBooksMutation,
  useUpdateBookByIdMutation,
  useDeleteBookByIdMutation
} = bookApi