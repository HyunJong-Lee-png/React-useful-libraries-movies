import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { droppableAtom } from "../atom";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { FormEvent, useState } from "react";
import { nanoid } from "nanoid";

interface ISnapshotProps {
  draggingFromThisWith: string | null | undefined,
  isDraggingOver: boolean
}

const Wrapper = styled.div<ISnapshotProps>`
  border-radius: 10px;
  border: solid 1px black;
  background-color: ${props => props.isDraggingOver ? '#77CDFF' : props.draggingFromThisWith ? 'tomato' : '#0D92F4'};
  padding: 10px;
  min-height: 300px;
`;

const Form = styled.form`
  margin-bottom: 10px;
`;

const Title = styled.h1`
  text-align: center;
  color:black;
  margin-bottom: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

export default function DroppableCard({ drop }: { drop: string }) {
  const [droppable, setDroppable] = useRecoilState(droppableAtom);
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    setDroppable(prev => {
      return { ...prev, [drop]: [...prev[drop], { id: nanoid(), text: value }] }
    });
    setValue('');
  }

  return (
    <Droppable key={drop} droppableId={drop} >
      {(provided, snapshot) =>
        <Wrapper
          {...provided.droppableProps}
          ref={provided.innerRef}
          draggingFromThisWith={snapshot.draggingFromThisWith}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <Title>{drop}</Title>
          <Form onSubmit={handleSubmit}>
            <input placeholder={`write ${drop} content`} value={value} onChange={(e) => setValue(e.target.value)} />
            <button>add</button>
          </Form>
          {droppable[drop].map((drag, index) =>
            <DraggableCard drag={drag} index={index} />
          )}
          {provided.placeholder}
        </Wrapper>}
    </Droppable>
  );
}