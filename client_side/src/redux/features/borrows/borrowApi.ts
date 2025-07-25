import { baseApi } from "@/redux/apis/baseApi";
import type { BorrowResponseDto, BorrowSummaryResponseDto, CreateBorrowDto } from "@/types/borrow.dtos";


export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all borrows
    getBorrows: builder.query<BorrowSummaryResponseDto[], void>({
      query: () => ({
        url: '/borrow',
        method: 'GET'
      }),
      providesTags: ['Borrow'], 
    }),
    // post borrow
    postBorrow: builder.mutation<BorrowResponseDto, CreateBorrowDto>({
      query: (borrow) => ({
        url: '/borrow',
        method: 'POST',
        body: borrow,
      }),
      invalidatesTags: ['Borrow', 'Book'],
    }),
     
  })
})

export const {
  useGetBorrowsQuery,
  usePostBorrowMutation
} = borrowApi