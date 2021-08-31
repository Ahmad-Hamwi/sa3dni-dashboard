import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ReportChartsConfig } from "../../ReportChartsConfig";
import Utils from "../../../../../utils/Utils";
import {ChatAvailabilityDayModel} from "../../../../../infrastructure/model/report/ChatAvailabilitiesModel";

export type ChatAvailabilityBarProps = {
  data: ChatAvailabilityDayModel[];
};

const ChatAvailabilityBar: FC<ChatAvailabilityBarProps> = (props) => {

  const series = [
    {
      name: "Availability",
      data: props.data.map((d) => d.availability),
    }
  ];

  const options: ApexOptions = {
    colors: [ReportChartsConfig.colors.blue],
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
    yaxis: {
      labels: {
        formatter(val: number, opts?: any): string | string[] {
          return Utils.convertMillisecondsToPeriod(val)
        },
      },
    },
  };

  return (
    <ReactApexChart
      height={"300px"}
      type="bar"
      series={series}
      options={options}
    />
  );
};

export default ChatAvailabilityBar;