import {FC} from "react";
import {AgentPerformanceInfo} from "./AgentSatisfactionParams";
import {Typography} from "@material-ui/core";

export type AgentPerformanceProps = {
    data: AgentPerformanceInfo;
};

const percentOf = (value: number, total: number): number => {
    return (value * 100) / total;
};

const AgentPerformance: FC<AgentPerformanceProps> = (props) => {
    return (
        <div>
            <div style={{display: "flex"}}>
                <TitleValue title={"Assigned Chats"} value={props.data.totalRatedChats}/>

                <TitleValue
                    style={{marginLeft: '64px'}}
                    title={"Avg Response Time"}
                    value={props.data.averageResponseTime}
                />
            </div>

            <div style={{display: "flex", marginTop: '16px'}}>
                <TitleValue
                    title={"Rated Good"}
                    value={`${props.data.ratedGoodChats} (${percentOf(
                        props.data.ratedGoodChats,
                        props.data.totalRatedChats
                    )}%)`}
                />
                <TitleValue
                    style={{marginLeft: '64px'}}
                    title={"Rated Bad"}
                    value={`${props.data.ratedBadChats} (${percentOf(
                        props.data.ratedBadChats,
                        props.data.totalRatedChats
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
