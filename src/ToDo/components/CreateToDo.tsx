import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryAtom, todosAtom } from "../../atom";
import { nanoid } from "nanoid";

interface IFieldValues {
  toDo: string
}

export default function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(todosAtom);
  const { register, handleSubmit, setValue } = useForm<IFieldValues>();
  const category = useRecoilValue(categoryAtom);

  const onValid = (data: IFieldValues) => {
    setValue('toDo', '');
    setToDos([...toDos, { id: nanoid(), text: data.toDo, category, }]);
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("toDo", {
        required: 'wirte to do'
      })}
        placeholder="wirte to do"
      />
      <button>add</button>
    </form>
  );
}