import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoins } from "../api/coinFetcher";
import { Helmet } from "react-helmet";
import { useRecoilState, useSetRecoilState } from "recoil";
import { themeAtom } from "../atom";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  color: green;
  margin-bottom: 20px;
`;

const Title = styled.span`
  font-size:48px;
  font-weight: 600;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul`
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
`;

const Coin = styled.li`
  border-radius: 15px;
  background-color: ${props => props.theme.accentColor};
  margin-bottom: 10px;
  &>a{
    padding: 20px;
    display: flex;
    color:black;
    transition: color 0.2s ease-in;
    align-items: center;
  }
  &>a:hover{
    color:green;
  }
`;

const Img = styled.img`
  width: 25px;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.btnColor};
  border-radius: 5px;
`;

interface Coins {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

export default function Coins() {

  // const [coins, setCoins] = useState<Coins[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch('https://api.coinpaprika.com/v1/coins')
  //     .then(res => res.json())
  //     .then((data: Coins[]) => {
  //       setCoins(data.slice(0, 100));
  //       setLoading(false);
  //     })
  // }, []);

  const { isLoading, data } = useQuery<Coins[]>('getCoins', getCoins)
  const setThemeMode = useSetRecoilState(themeAtom)

  return (
    <Container>
      <Helmet>
        <title>
          Coins
        </title>
      </Helmet>
      <Header>
        <Title>
          Coins
        </Title>
      </Header>
      <Button onClick={() => setThemeMode(prev => !prev)}>ToggleBtn</Button>
      {isLoading ? <Loading>"Loading..."</Loading>
        :
        <CoinList>
          {data?.slice(0, 100).map(coin =>
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>)}
        </CoinList>}
    </Container>
  );
}