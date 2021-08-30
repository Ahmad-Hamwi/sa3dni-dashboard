import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ReportChartsConfig } from "../../ReportChartsConfig";
import {
  ChatSatisfactionDayModel,
} from "../../../../../infrastructure/model/report/ChatSatisfactionsModel";

export type ChatSatisfactionRateBarProps = {
  data: ChatSatisfactionDayModel[];
};

const ChatSatisfactionRateBar: FC<ChatSatisfactionRateBarProps> = (props) => {
  const series = [
    {
      name: "Good",
      data: props.data.map((d) => d.ratedGood),
    },
    {
      name: "Bad",
      data: props.data.map((d) => d.ratedBad),
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
