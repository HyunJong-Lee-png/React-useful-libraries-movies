import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { getInfo, getPriceInfo } from "../api/coinFetcher";
import { Helmet } from "react-helmet";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

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

const CoinWrapper = styled.div`
  background-color: #001F3F;
  border-radius: 15px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color:white;
  &>span:last-child{
    font-weight: bold;
  }
  align-items: center;
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const GraphWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const GraphNav = styled.div<{ active: boolean }>`
  background-color: #001F3F;
  border-radius: 15px;
  &>a{
    padding: 10px 0;
    display: block;
    text-align: center;
    color: ${props => props.active ? 'green' : props.theme.textColor};
  }
`;


export default function Coin() {
  const { state } = useLocation();
  const { coinId } = useParams<{ coinId: string }>();
  const chart = useMatch(`/${coinId}/chart`);
  const price = useMatch(`/${coinId}/price`);

  const { isLoading: infoLoading, data: info } = useQuery<InfoData>('getInfo', () => getInfo(coinId))
  const { isLoading: priceLoading, data: priceInfo } = useQuery<PriceData>(
    'getPriceInfo',
    () => getPriceInfo(coinId),
    { refetchInterval: 5000 });

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const coinData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //     const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
  //     setInfo(coinData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [])

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ?? 'Loading..'}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ?? 'Loading..'}
        </Title>
      </Header>
      {infoLoading || priceLoading ? <Loading>"Loading.."</Loading>
        :
        <>
          <CoinWrapper>
            <CoinInfo>
              <span>RANK:</span>
              <span>{info?.rank}</span>
            </CoinInfo>
            <CoinInfo>
              <span>SYMBOL:</span>
              <span>${info?.symbol}</span>
            </CoinInfo>
            <CoinInfo>
              <span>PRICE:</span>
              <span>${(priceInfo?.quotes.USD.price)?.toFixed(3)}</span>
            </CoinInfo>
          </CoinWrapper>
          <Description>
            {info?.description}
          </Description>
          <CoinWrapper>
            <CoinInfo>
              <span>TOTAL SUPPLY</span>
              <span>{priceInfo?.total_supply}</span>
            </CoinInfo>
            <CoinInfo>
              <span>MAX SUPPLY</span>
              <span>{priceInfo?.max_supply}</span>
            </CoinInfo>
          </CoinWrapper>
          <GraphWrapper>
            <GraphNav active={chart !== null}><Link to={`/${coinId}/chart`} state={{ name: info?.name }}>CHART</Link></GraphNav>
            <GraphNav active={price !== null}><Link to={`/${coinId}/price`} state={{ name: info?.name }}>PRICE</Link></GraphNav>
          </GraphWrapper>
          <Outlet context={{ coinId }} />
        </>
      }
    </Container>
  );
}