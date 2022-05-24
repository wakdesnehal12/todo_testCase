import { ProList } from './Interfaces';

interface Props{
  item: ProList;
  completeList(namesToDelete:string): void;
  completeLists(namesToEdit:string, numsToEdit:number ): void;
}


export default function List({ item, completeList, completeLists }: Props) {
  return (
    <tr>  
      <td>{item.names}</td>
      <td>{item.nums}</td>
      <td><button onClick={() => {completeLists(item.names, item.nums)}} data-testid="editButton">Edit</button></td>
      <td><button onClick={() => {completeList(item.names)}} data-testid="deleteButton">Delete</button></td>
    </tr>
  )
}
