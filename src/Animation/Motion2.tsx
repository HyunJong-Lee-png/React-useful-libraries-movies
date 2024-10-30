import { motion } from "framer-motion";
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
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(2,1fr);
  gap: 10px;
  padding: 10px;
  
`;

const Circle = styled(motion.div)`
  border-radius: 50%;
  background-color: white;
`;

const boxVar = {
  initial: {
    scale: 0.5,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
      type: 'spring',
      duration: 2,
      bounce: 0.5
    }
  },

}

const circleVar = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition:{
      duration:3
    }
  },
}


export default function Motion2() {
  return (
    <Wrapper>
      {/*CSS의 transform 속성을 직접 사용하는 대신 개별 변환 속성(scale, rotate, x, y 등)을 사용하는 것이 좋습니다*/}
      <Box
        variants={boxVar}
        initial='initial'
        animate='animate'
      >
        <Circle variants={circleVar} />
        <Circle variants={circleVar} />
        <Circle variants={circleVar} />
        <Circle variants={circleVar} />
      </Box>
    </Wrapper>
  );
}