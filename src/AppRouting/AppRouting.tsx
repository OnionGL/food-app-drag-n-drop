import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Component/Header/Header";
import DragDrop from '../Component/DragDrop/DragDrop';

const AppRouting = () => {
   return <>
      <Header />
      <BrowserRouter>
      <Routes>
         <Route path={"/foodlist"} element={<DragDrop />}/>
      </Routes>
      </BrowserRouter>
   </>
}
export default AppRouting;