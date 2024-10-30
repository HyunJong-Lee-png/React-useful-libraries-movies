export const getCoins = async () => {
  return (await fetch('https://api.coinpaprika.com/v1/coins')).json();
}

export const getInfo = async (coinId: string = '') => {
  return (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
}

export const getPriceInfo = async (coinId: string = '') => {
  return (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
}

export const getCoinHistory = async (coinId: string = '') => {
  return (await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)).json();
}