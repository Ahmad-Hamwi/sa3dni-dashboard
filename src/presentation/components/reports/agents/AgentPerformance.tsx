import {FC} from "react";
import {Typography} from "@material-ui/core";
import UserPerformanceViewModel from "../../../viewmodel/user/UserPerformanceViewModel";
import Utils from "../../../../utils/Utils";

export type AgentPerformanceProps = {
    data: UserPerformanceViewModel;
};

const percentOf = (value: number, total: number): number => {
    return (value * 100) / total;
};

const AgentPerformance: FC<AgentPerformanceProps> = (props) => {
    return (
        <div>
            <div style={{display: "flex"}}>
                <TitleValue title={"Assigned Chats"} value={props.data.totalChats}/>

                <TitleValue
                    style={{marginLeft: '64px'}}
                    title={"Avg Response Time"}
                    value={Utils.convertMillisecondsToPeriod(props.data.averageResponseTime)}
                />
            </div>

            <div style={{display: "flex", marginTop: '16px'}}>
                <TitleValue
                    title={"Rated Good"}
                    value={`${props.data.ratedGood} (${percentOf(
                        props.data.ratedGood,
                        props.data.totalChats
                    )}%)`}
                />
                <TitleValue
                    style={{marginLeft: '64px'}}
                    title={"Rated Bad"}
                    value={`${props.data.ratedBad} (${percentOf(
                        props.data.ratedBad,
                        props.data.totalChats
                    )}%)`}
                />
            </div>
        </div>
    );
};

export default AgentPerformance;

const TitleValue: FC<{ title: string; value: any, style?: any }> = (props) => {
    return (
        <div style={{...props.style , display: "flex"}}>
            <Typography style={{fontWeight: "bold", marginRight: '8px'}}>{props.title}: </Typography>
            <Typography>{props.value}</Typography>
        </div>
    );
};
