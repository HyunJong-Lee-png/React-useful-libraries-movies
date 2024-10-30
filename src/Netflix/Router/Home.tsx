import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMovies } from "../Api/api";
import { imageUtil } from "../Utility/imageUtil";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

interface IMovie {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

interface IMovies {
  dates: {
    maximum: string
    minimum: string
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const Wrapper = styled.div`
  height: 100vh;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ image: string }>`
  height: 100%;
  background-image:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,1)),url(${(props) => imageUtil(props.image)});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  color:white;
`;

const Title = styled.span`
  font-size: 50px;
  font-weight: bold;
`;

const Overview = styled.span` 
  font-size: 27px;
  width: 50%;
`;

const Template = styled.div`
  background-color: black;
  margin-top: -100px;
`;

const Slider = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap:20px;
  &>div:last-child{
    transform-origin: right center;
  }
  &>div:first-child{
    transform-origin: left center;
  }
`;

const Box = styled(motion.div) <{ image: string }>`
  border: 1px solid black;
  background-image: url(${props => imageUtil(props.image, 'w500')});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
`;

const BoxTitle = styled(motion.div)`
  background-color: gray;
  font-size: 18px;
  text-align: center;
  opacity: 0;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayBox = styled(motion.div)`
  width: 40%;
  border-radius: 10px;
  overflow: hidden;
  color:white;
`;

const OverlayImg = styled.img`
  width: 100%;
  position: relative;
`;

const OverlayTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  position: relative;
  top:-45px;
  padding-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const OverlayOverView = styled.div`
  background-color: #3C3D37;
  padding: 10px;
  position: relative;
  top: -31px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const chunck = 5;

const boxVar = {
  hover: {
    scale: 1.5,
    y: -70,
    zIndex: 10,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  },
}

const titleVar = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }
}

export default function Home() {
  const { data, isLoading } = useQuery<IMovies>('fetchMovies', fetchMovies);
  const [index, setIndex] = useState(0);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const movieMatch = useMatch('/movies/:movieId');
  const [moving, setMoving] = useState(false);
  const clickedMovie = movieMatch !== null &&
    data?.results.find(movie => movie.id + '' === movieMatch.params.movieId);

  const handleClick = () => {
    if (click || moving) return;
    if (data) {
      setIndex(prev => (prev + 1) * chunck >= data.results.length - 1 ? 0 : prev + 1);
      setClick(true);
      setMoving(false);
    }
  }
  const handleDown = useCallback(() => {
    setMoving(false);
  }, [])
  const handleMove = useCallback(() => {
    setMoving(true);
  }, [])
  const handleExit = useCallback(() => {
    setClick(false);
  }, [])
  const modalClick = useCallback((movieId: number) => {
    navigate(`/movies/${movieId}`);
  }, [])
  const handleOverlay = useCallback(() => {
    navigate('/')
  }, [])

  return (
    <Wrapper >
      {isLoading ? <Loading>is Loading...</Loading> :
        <>
          <Banner
            image={data?.results[0].backdrop_path || ''}
            onClick={handleClick}
            onMouseDown={handleDown}
            onMouseMove={handleMove}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Template>
            <AnimatePresence initial={false} mode="popLayout" onExitComplete={handleExit}>
              <Slider
                key={index}
                initial={{ x: window.innerWidth + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -window.innerWidth }}
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results.slice(1).slice(chunck * index, chunck * (index + 1)).map(movie =>
                  <Box
                    key={movie.id}
                    image={movie.poster_path}
                    variants={boxVar}
                    whileHover='hover'
                    onClick={() => modalClick(movie.id)}
                    layoutId={movie.id + ''}
                  >
                    <BoxTitle variants={titleVar}>
                      {movie.title}
                    </BoxTitle>
                  </Box>
                )}
              </Slider>
            </AnimatePresence>
          </Template>
          <AnimatePresence>
            {movieMatch !== null &&
              <Overlay
                key={movieMatch.params.movieId}
                onClick={handleOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <OverlayBox layoutId={movieMatch.params.movieId}>
                  {clickedMovie && <>
                    <OverlayImg
                      src={imageUtil(clickedMovie.backdrop_path, 'w500')} />
                    <OverlayTitle>
                      {clickedMovie.title}
                    </OverlayTitle>
                    <OverlayOverView>
                      {clickedMovie.overview}
                    </OverlayOverView>
                  </>}
                </OverlayBox>
              </Overlay>}
          </AnimatePresence>
        </>
      }
    </Wrapper>
  );
}