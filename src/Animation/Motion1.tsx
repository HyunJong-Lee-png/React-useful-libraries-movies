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
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const boxVar = {
  initial: {
    scale: 0,
    rotate: 0
  },
  animate: {
    rotateZ: 360, scale: 1,
    transition:
    {
      duration: 1,
      type: 'spring',
      damping: 5,
      delay: 0.5
    },
  },
}
export default function Motion1() {
  return (
    <Wrapper>
      {/*CSS의 transform 속성을 직접 사용하는 대신 개별 변환 속성(scale, rotate, x, y 등)을 사용하는 것이 좋습니다*/}
      <Box variants={boxVar} initial='initial' animate='animate' />
    </Wrapper>
  );
}