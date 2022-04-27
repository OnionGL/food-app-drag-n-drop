import { useEffect, useRef, useState } from 'react';
import style from './DragDrop.module.css'
import {DragReducer} from "../../redux/Reducer/drag-reduccer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { IFood } from '../../redux/models/IFood';
import { IDragArray } from '../../redux/models/IDragArray';


const DragDrop = () => {
   const {food} = useAppSelector(state => state.FoodReducer)
   const {setDrag} = DragReducer.actions;
   const [dragOpen, setDragOpen] = useState<boolean>(false)
   const {getIdArray  , removeDrag , getArray } = DragReducer.actions;   
   const {dragArray  } = useAppSelector(state => state.DragReducer)
   const [list , setList] = useState<IDragArray[]>(dragArray)
   useEffect(() => {
      setList(dragArray)
   }, [dragArray])
   const dragItem : any = useRef()
   const dragNote : any = useRef()
   const [dragging , setDragging] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   const setIdAndOpenDrag = (id:number) => {
      dragOpen ? setDragOpen(false) : setDragOpen(true);
      dispatch(getIdArray(id))
   }
   const handleDragStart = (e:any , params:any) => {
      dragItem.current = params;
      dragNote.current = e.target;
      dragNote.current.addEventListener('dragend' , handleDragEnd)
      setTimeout(() => {
         setDragging(true)
      }, 0)
   }
   const handleDragEnd = () => {
      setDragging(false)
      dragNote.current.removeEventListener('dragend' , handleDragEnd)
      dragItem.current = null;
      dragNote.current = null;   
   }
   const handleDragEnter = (e:any , params:any) => {
      const currentItem : any = dragItem.current  
      if(e.target !== dragNote.current){
         setList(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[params.boardI].list.splice(params.itemI, 0 , newList[currentItem.boardI].list.splice(currentItem.itemI,1)[0])
            dragItem.current = params;
            return newList;
         })
      }
   }
   const deleteItem = (id: number, item : IFood) => { 
      dispatch(getArray(list))
      dispatch(getIdArray(id))
      dispatch(removeDrag([item]))
   }
   const AddItem = (item:IFood) => {
      dispatch(getArray(list))
      dispatch(setDrag([item]))
   }
   let menuRef:any = useRef();
   useEffect(() => {
      document.addEventListener("mousedown" , (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setDragOpen(false)
         }
      })
   })
   return <>
      <div className={style.dragdrop}>
         {list.map((board,boardI) => 
            <div onDragEnter = {dragging && !board.list.length ? (e) => handleDragEnter(e , {boardI , itemI : 0}) : null || undefined} className={style.dragdrop_box}>
               <div className={style.board__title}>{board.title}</div>
               <hr />
               {board.list.map((item , itemI)=> 
                  <div 
                  draggable={true}
                  onDragStart={(e) => {handleDragStart(e , {boardI , itemI})}}
                  onDragEnter = {(e) => handleDragEnter(e , {boardI , itemI})}
                  className={style.drag__item}>
                     <div>{item.id}</div>
                     <img src={item.image} alt="img-food"/>
                     <div>{item.title}</div>
                     <button onClick = {() => deleteItem(board.id , item)}><img src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/54475/cross-mark-emoji-clipart-md.png" alt="delete"/></button>
                  </div>
                  )}
               <button className={style.dragendrop_buttonadd} onClick={() => setIdAndOpenDrag(board.id)}><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                     </svg><div className={style.button__text}>Add</div></button>
            </div>       
         )}
      </div>
      <>{dragOpen ?  
     <div className={style.foodlist}>
        <div className={style.food} ref={menuRef}> 
        <button className={style.button_close} onClick={() => setDragOpen(false)}>Close</button>
        {food.map(item => 
        <div className={style.item_box}>
         <div className={style.image}>
            {item.id}
            <img src={item.image} alt="Pasta"/>
            <div className={style.title}>
               {item.title}
            </div>
            <button className={style.btn + ' ' + style.fourth} onClick={() => AddItem(item)}>Add<span className="checkmark">
    <div className="checkmark_stem"></div>
    <div className="checkmark_kick"></div>
</span></button>
         </div>
         <hr />
         </div>
         )}
         </div>
     </div>: null}</>
   </>
}
export default DragDrop;