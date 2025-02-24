import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.div)`
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:white;
  font-size: 12px;
  padding: 15px 55px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  width: 93px;
  height: 23px;
  margin-right: 50px;
  &>path{
    stroke: white;
    stroke-width: 10px;
    fill: red;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;  
  gap:20px;
`;

const Item = styled.li`
  &>a{
    color:white;
    display: block;
    position: relative;
    transition: color 0.3s ease-in-out;
    &:hover{
      color: #FF8C9E;
    }
  }
`;

const RedDot = styled(motion.div)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const SearchBox = styled.form`
  display: flex;
  position: relative;
  height: 25px;
`;

const SearchInput = styled(motion.input)`
  background-color: transparent;
  padding-left: 30px;
  color:white;
  min-width: 230px;
  transform-origin: right center;
`;

const SearchButton = styled(motion.svg)`
  height: 25px;
  position: absolute;
  cursor: pointer;
`;

const pathVar = {
  start: {
    pathLength: 0,
    opacity: 1
  },
  hover: {
    pathLength: 1,
    opacity: [0, 1, 0],
    transition: {
      pathLength: {
        duration: 5
      },
      opacity: {
        repeat: Infinity
      }
    }
  },
}

const inputVar = {
  start: {
    scaleX: 0,
  },
  end: {
    scaleX: 1,
    transition: {
      ease: 'easeInOut',
    }
  }
}

const scrollVar = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)'
  }
}

export default function Header() {
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');
  const inputControl = useAnimation();
  const [openSearch, setOpenSearch] = useState(false);
  const { scrollY } = useScroll();
  const scrollControl = useAnimation();
  const movieMatch = useMatch('/movies/:movieId');

  const handleClick = () => {
    if (openSearch) {
      inputControl.start('start')
    } else {
      inputControl.start('end')
    }
    setOpenSearch(prev => !prev);
  }

  useEffect(() => {
    scrollY.on('change', () => {
      if (scrollY.get() > 80) {
        scrollControl.start('scroll')
      } else {
        scrollControl.start('top')
      }
    })
  }, [])

  return (
    <Nav
      variants={scrollVar}
      // initial='top'
      animate={scrollControl}
    >
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            variants={pathVar}
            initial='start'
            whileHover='hover'
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item><Link to={'/'}>Home{(homeMatch || movieMatch) !== null && <RedDot layoutId="redDot" />}</Link></Item>
          <Item><Link to={'/tv'}>Tv Shows{tvMatch !== null && <RedDot layoutId="redDot" />}</Link></Item>
        </Items>
      </Col>
      <Col>
        <SearchBox>
          <SearchButton
            onClick={handleClick}
            initial={{ x: 210 }}
            animate={{ x: openSearch ? 0 : 210, transition: { ease: 'easeInOut' } }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </SearchButton>
          <SearchInput
            variants={inputVar}
            initial='start'
            animate={inputControl}
            placeholder="search for movie or tv shows..."
          />
        </SearchBox>
      </Col>
    </Nav>
  );
}