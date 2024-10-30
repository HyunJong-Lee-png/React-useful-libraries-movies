import { atom, selector } from "recoil";

export const themeAtom = atom({
  key: 'theme',
  default: false,
});

export interface IToDos {
  text: string;
  id: string;
  category: Category
}
export const todosAtom = atom<IToDos[]>({
  key: 'toDos',
  default: [],
})

//export type Category = 'todo' | 'doing' | 'done'
export enum Category {
  'todo',
  'doing',
  'done'
}
//enum Category는 마치 type Catogory = 0 | 1 | 2;와 같다.
export const categoryAtom = atom<Category>({
  key: 'category',
  default: Category.todo,
})

export const toDosSelector = selector({
  key: 'toDosSelector',
  get: ({ get }) => {
    const todos = get(todosAtom);
    return [todos.filter(todo => todo.category === Category.todo),
    todos.filter(todo => todo.category === Category.doing),
    todos.filter(todo => todo.category === Category.done)];
  }
});

export const minuteAtom = atom({
  key: 'minute',
  default: 0,
})

export const hourSelector = selector({
  key: 'hour',
  get: ({ get }) => {
    const minute = get(minuteAtom);
    return minute / 60;
  },
  set: ({ set }, newValue) => {
    const minute = Number(newValue) * 60;
    set(minuteAtom, minute);
  }
});

export interface DroppableInfo {
  id: string;
  text: string;
}
interface DroppableItems {
  [key: string]: DroppableInfo[]
}
export const droppableAtom = atom<DroppableItems>({
  key: 'droppable',
  default: {
    todo: [],
    doing: [],
    done: [],
  }
})