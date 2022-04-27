import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFood } from '../models/IFood';
import { IDragArray } from '../models/IDragArray';




interface DragState {
   idArray : number,
   dragArray : IDragArray[];
   isLoading : boolean;
   error : string
}

const initialState:DragState = {
   idArray : 0,
   dragArray : [{id : 1 ,title : "Breakfast", list : []} , {id : 2 ,title : "Morning", list : []} , {id : 3 ,title : "Lunch", list : []} , {id : 4 ,title : "Snack", list : []} , {id : 5 ,title : "Dinner", list : []}],
   isLoading : false,
   error : ''
}


export const DragReducer = createSlice ({
   name : 'drag',
   initialState , 
   reducers: {
      setDrag(state , action : PayloadAction<IFood[]>){
         state.dragArray[state.idArray].list.push(action.payload[0])
      },
      removeDrag(state , action : PayloadAction<IFood[]>){
         state.dragArray[state.idArray].list = state.dragArray[state.idArray].list.filter(item => 
             item.id !== action.payload[0].id
         )
      },
      getIdArray(state , action : PayloadAction<number>){
            state.idArray = action.payload - 1;
      },
      getArray(state , action : PayloadAction<IDragArray[]>) {
         state.dragArray = action.payload
      }
   },

})

export default DragReducer.reducer;

