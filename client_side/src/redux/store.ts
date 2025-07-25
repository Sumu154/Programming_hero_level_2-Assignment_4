import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './apis/baseApi';


const store = configureStore({
  reducer: {
    // book: bookReducer, 
    [baseApi.reducerPath]: baseApi.reducer,
  },

  // middlewares
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseApi.middleware)
  
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;