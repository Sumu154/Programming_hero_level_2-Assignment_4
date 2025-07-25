import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import BookPage from "@/pages/BookPage";
import AddBookPage from "@/pages/AddBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import UpdateBookPage from "@/pages/UpdateBookPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <BookPage></BookPage>
      },
      {
        path: "/addBook",
        element: <AddBookPage></AddBookPage>
      },
      {
        path: "/updateBook/:_id",
        element: <UpdateBookPage></UpdateBookPage>
      },
      {
        path: "/borrowSummary",
        element: <BorrowSummaryPage></BorrowSummaryPage>
      }
    ]
  },
]);

export default router;