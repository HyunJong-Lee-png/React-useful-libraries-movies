import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableCard from "./DroppableCard";
import { useRecoilState } from "recoil";
import { droppableAtom } from "../atom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;  
  align-items: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3,minMax(250px,1fr));
  gap: 20px;
`;

export default function KanbanList() {
  const [droppable, setDroppable] = useRecoilState(droppableAtom);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      //드랍한 구역이 다를 경우
      const prevToDos = [...droppable[source.droppableId]];
      const toDo = prevToDos.splice(source.index, 1)[0];
      const curToDos = [...droppable[destination.droppableId]];
      curToDos.splice(destination.index, 0, toDo);
      setDroppable({ ...droppable, [source.droppableId]: prevToDos, [destination.droppableId]: curToDos });
    } else {
      //드랍한 구역이 같을 경우
      const prevToDos = [...droppable[source.droppableId]];
      const toDo = prevToDos.splice(source.index, 1)[0];
      prevToDos.splice(destination.index, 0, toDo);
      setDroppable({ ...droppable, [source.droppableId]: prevToDos });
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Board>
          {Object.keys(droppable).map(drop =>
            <DroppableCard drop={drop} />
          )}
        </Board>
      </Wrapper>
    </DragDropContext>
  );
}