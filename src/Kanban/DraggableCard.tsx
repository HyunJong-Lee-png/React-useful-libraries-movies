import { Draggable } from "react-beautiful-dnd";
import { DroppableInfo } from "../atom";
import styled from "styled-components";
import { memo } from "react";

interface ISnapshotProps {
  isDragging: boolean;
}

const Wrapper = styled.div<ISnapshotProps>`
  border-radius: 10px;
  border: 1px solid black;
  background-color: ${props => props.isDragging ? '#FFF7D1' : 'white'};
  color:black;
  padding: 10px;
  margin-bottom: 10px;
`;
export default memo(function DraggableCard({ drag, index }: { drag: DroppableInfo, index: number }) {
  console.log(drag.text);
  return (
    <Draggable key={drag.id} draggableId={drag.id} index={index}>
      {(provided, snapshot) =>
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {drag.text}
        </Wrapper>}
    </Draggable>
  );
});