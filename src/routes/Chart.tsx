import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { getCoinHistory } from "../api/coinFetcher";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../atom";

interface IHistoryInfo {
  close: string
  high: string
  low: string
  market_cap: number
  open: string
  time_close: number
  time_open: number
  volume: string
}

interface IError {
  error: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<IHistoryInfo[] | IError>('getHistory', () => getCoinHistory(coinId));
  const themeMode = useRecoilValue(themeAtom);

  return (
    <>
      {isLoading ? (
        "Loading chart"
      ) : Array.isArray(data) ?
        (
          <ReactApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: themeMode ? 'dark' : 'light',
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
        )
        : <>{data?.error}</>
      }
    </>
  );
}
