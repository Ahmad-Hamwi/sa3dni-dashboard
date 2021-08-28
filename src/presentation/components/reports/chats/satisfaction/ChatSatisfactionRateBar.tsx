import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ReportChartsConfig } from "../../ReportChartsConfig";
import { DayRateSatisfaction } from "./ChatSatisfactionRateParams";

export type ChatSatisfactionRateBarProps = {
  data: DayRateSatisfaction[];
};

const ChatSatisfactionRateBar: FC<ChatSatisfactionRateBarProps> = (props) => {
  const series = [
    {
      name: "Good",
      data: props.data.map((d) => d.ratedGoodChats),
    },
    {
      name: "Bad",
      data: props.data.map((d) => d.ratedBadChats),
    },
  ];

  const options: ApexOptions = {
    colors: [
      ReportChartsConfig.colors.goodChatRate,
      ReportChartsConfig.colors.badChatRate,
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "25%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: props.data.map((d) => d.date),
    },
  };

  return <ReactApexChart height={'300px'} type="bar" series={series} options={options} />;
};

export default ChatSatisfactionRateBar;
