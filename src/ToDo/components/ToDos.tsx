import { useSetRecoilState } from "recoil";
import { Category, IToDos, todosAtom } from "../../atom";

export default function ToDos({ id, text, category }: IToDos) {
  const setToDos = useSetRecoilState(todosAtom);

  const handleToDo = (category: IToDos['category']) => {
    setToDos(prev => prev.map(todo => {
      console.log(todo);
      return todo.id === id ? { id, text, category, } : todo
    }))
  }


  return (
    <li>
      <span>{text}</span>
      {category !== Category.todo && <button onClick={() => handleToDo(Category.todo)}>ToDo</button>}
      {category !== Category.doing && <button onClick={() => handleToDo(Category.doing)}>Doing</button>}
      {category !== Category.done && <button onClick={() => handleToDo(Category.done)}>Done</button>}
    </li>
  );
}