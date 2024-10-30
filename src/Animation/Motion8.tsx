import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(90deg, #f953c6, #b91d73);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 300px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
  &>div:first-child,&>div:last-child{
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 100%;
  background-color: white;
  border-radius: 10px;
`;

const NewBox = styled(motion.div)`
  width: 200px;
  height: 100px;
  background-color: antiquewhite;
  border-radius: 10px;
`;

const NewWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Motion8() {
  const [tab, setTab] = useState('');


  const handleClick = (e: MouseEvent<HTMLDivElement>, item: string) => {
    setTab(item);
  }

  const handleWrapper = () => {
    setTab('');
  }

  return (
    <Wrapper >
      <Container>
        {['1', '2', '3', '4'].map((item, index) => <Box key={index} layoutId={item} onClick={(e) => handleClick(e, item)} />)}
      </Container>
      <AnimatePresence>
        {tab ?
          <NewWrapper
            onClick={handleWrapper}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <NewBox layoutId={tab} />
          </NewWrapper> : null}
      </AnimatePresence>
    </Wrapper>
  );
}