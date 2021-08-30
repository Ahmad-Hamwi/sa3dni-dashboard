import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ReportChartsConfig } from "../../ReportChartsConfig";
import { RateTotals } from "./ChatSatisfactionRateParams";

export type ChatsSatisfactionRatePieProps = {
  data: RateTotals;
  width?: string,
  height?: string
};

const ChatsSatisfactionRatePie: FC<ChatsSatisfactionRatePieProps> = (props) => {
  const options: ApexOptions = {
    colors: [
      ReportChartsConfig.colors.badChatRate,
      ReportChartsConfig.colors.goodChatRate,
    ],
    labels: [`Bad`, `Good`],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      // width={props.width || "300px"}
      // height={props.height || '300px'}
      type="donut"
      series={[props.data.ratedBadChats, props.data.ratedGoodChats]}
      options={options}
    />
  );
};

export default ChatsSatisfactionRatePie;
