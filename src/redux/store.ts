import { configureStore , combineReducers } from "@reduxjs/toolkit";
import FoodReducer from './Reducer/food-reducer';
import DragReducer from './Reducer/drag-reduccer';

const rootReducer = combineReducers({
   FoodReducer,
   DragReducer
})

export const SetupStore = () => {
   return configureStore({
      reducer : rootReducer
   })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof SetupStore>
export type AppDispatch = AppStore['dispatch']