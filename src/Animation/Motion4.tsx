import { motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(90deg, #f953c6, #b91d73);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 20px;
`;

export default function Motion4() {
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <Box
        ref={boxRef}
      >
        <SmallBox
          drag
          dragConstraints={boxRef}
          dragElastic={0.2}
          dragSnapToOrigin
          whileDrag={{backgroundColor:"rgb(46, 204, 113)", transition: { duration: 5 } }}
        />
      </Box>
    </Wrapper>
  );
}