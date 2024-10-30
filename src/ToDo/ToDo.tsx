import { useRecoilState, useRecoilValue } from "recoil";
import { Category, categoryAtom, todosAtom, toDosSelector } from "../atom";
import CreateToDo from "./components/CreateToDo";
import ToDos from "./components/ToDos";
import { ChangeEvent, useState } from "react";

export default function ToDo() {
  const [todo, doing, done] = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = e;
    const newValue = parseInt(value);
    setCategory(newValue);
  }

  return (
    // <div>
    //   <h1>To Dos</h1>
    //   <hr />
    //   <CreateToDo />
    //   <h1>ToDo</h1>
    //   <ul>
    //     {todo.map(todo => <ToDos key={todo.id} {...todo} />)}
    //   </ul>
    //   <hr />
    //   <h1>Doing</h1>
    //   <ul>
    //     {doing.map(doing => <ToDos key={doing.id} {...doing} />)}
    //   </ul>
    //   <hr />
    //   <h1>Done</h1>
    //   <ul>
    //     {done.map(done => <ToDos key={done.id} {...done} />)}
    //   </ul>
    // </div>
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onChange={handleChange}>
        <option value={Category.doing}>doing</option>
        <option value={Category.todo}>todo</option>
        <option value={Category.done}>done</option>
      </select>
      <CreateToDo />
      <ul>
        {category === Category.todo ? todo.map(todo => <ToDos key={todo.id} {...todo} />)
          : category === Category.doing ? doing.map(doing => <ToDos key={doing.id} {...doing} />)
            : done.map(done => <ToDos key={done.id} {...done} />)}
      </ul>
    </div>
  );
}