import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import adminReducer from '../features/admin/adminSlice';
import lectureReducer from '../features/lecture/lectureSlice';
import snacksReducer from '../features/snacks/snacksSlice';
import cartReducer from '../features/cart/cartSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    lecture: lectureReducer,
    snacks: snacksReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
