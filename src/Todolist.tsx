import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProList } from './Components/Interfaces'; 
import List from './Components/List';

const getLocal = () =>{
    let data = localStorage.getItem('key')
    // console.log(ldata);

    if(data){
        return JSON.parse(localStorage.getItem('key') || "{}") 
    }else{
        return []
    }
}

// const getLocal = () =>{
//     let data = sessionStorage.getItem('key')
//     console.log(data);

//     if(data){
//         return JSON.parse(sessionStorage.getItem('key') || "{}") 
//     }else{
//         return []
//     }
// }
export default function Todolist() {
    const [addName, setAddName] = useState<string>("");
    const [number, setNumber] = useState<any>();
    const [todoList, setTodoList] = useState<ProList[]>(getLocal());
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event.target.name === "addName"){
            setAddName(event.target.value);
        }else{
            setNumber((event.target.value))
        }
    };

    const addList = (): void => {
        const newList = { names : addName, nums : number };
        // setTodoList([...todoList, newList]);

        let itemValue = 0;
        if(
            todoList.some((item, ind) => {
                itemValue = ind
                return (
                    item.nums === number||item.names === addName
                )
            })
        ) {
            todoList[itemValue] = newList;
            setTodoList([...todoList]);
        }
        else {
            setTodoList([...todoList, newList]);
        } 
        setAddName("");
        setNumber(0);
    };

    //Delete the Item
    const completeList = (namesToDelete: string): void => {
        setTodoList(
            todoList.filter((item) => {
            return item.names !== namesToDelete;
            })  
        );
    };

   
    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(todoList))
    }, [todoList]);

    // useEffect(() => {
    //     sessionStorage.setItem('key', JSON.stringify(todoList))
    // }, [todoList]);
    
    const completeLists = (namesToEdit:string, numsToEdit: number): void => {
        setAddName(namesToEdit);
        setNumber(numsToEdit);
    };
  return (
    <>
        <div>
            <div>
                <h3>ToDo List ( Using TypeScript)</h3>
            </div>
            <label>Product Name: </label>
            <input
                data-testid="addname"
                type="text"
                name='addName'
                value={addName}
                onChange={handleChange}
            />

            <label>Quantity: </label>
            <input
                data-testid="quantity"
                type="number"
                name='number'
                value={number}
                onChange={handleChange}
            />
        </div>

        <div>
            <button onClick={addList} data-testid="addlist">ADD</button>
        </div>
        
        
        <div>
            <table className='tableData'>
                <thead></thead>
                <tbody>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {
                        todoList.map((item: ProList, key: number) => {
                            return (
                                <div data-testid="todoData">
                                    <List
                                        
                                        key={key} 
                                        item={item} 
                                        completeList={completeList}
                                        completeLists={completeLists}
                                    /> 
                                </div>  
                            );                 
                        })
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
                
        </div>
       
    </>
  )
}
    