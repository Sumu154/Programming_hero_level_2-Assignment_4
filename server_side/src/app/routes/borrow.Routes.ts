import express from 'express';
const router = express.Router();
import { 
  createBorrow, 
  getBorrows
} from '../controllers/borrow.Controller';


router.post('/borrow', createBorrow)
router.get('/borrow', getBorrows)


export default router;