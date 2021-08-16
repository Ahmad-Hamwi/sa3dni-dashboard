import { FC, useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { Routes } from "../../route/routes";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  selectedItem: {
    color: theme.palette.primary.main,
    border: "10px black",
  },
}));

const ReportsListMenu: FC = (props) => {
  const classes = useStyles();

  const [chatsMenuOpen, setChatsOpen] = useState(false);

  const [agentsMenuOpen, setAgentsOpen] = useState(false);

  const { path } = useRouteMatch();

  const location = useLocation();

  const handleChatsClick = () => {
    setChatsOpen((prevState) => !prevState);
  };

  const handleAgentsClick = () => {
    setAgentsOpen((prevState) => !prevState);
  };

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleChatsClick}>
        <ListItemText primary="Chats" />
        {chatsMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={chatsMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={path + Routes.REPORTS_CHATS_SATISFACTION}
          >
            <ListItemText
              secondary="Chat Satisfaction"
              className={
                location.pathname.includes(Routes.REPORTS_CHATS_SATISFACTION)
                  ? classes.selectedItem
                  : undefined
              }
            />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={path + Routes.REPORTS_CHATS_AVAILABILITY}
          >
            <ListItemText
              secondary="Chat Availability"
              className={
                location.pathname.includes(Routes.REPORTS_CHATS_AVAILABILITY)
                  ? classes.selectedItem
                  : undefined
              }
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleAgentsClick}>
        <ListItemText primary="Agents" />
        {agentsMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={agentsMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to={path + Routes.REPORTS_AGENT_SATISFACTION}
          >
            <ListItemText
              secondary="Agents Satisfaction"
              className={
                location.pathname.includes(Routes.REPORTS_AGENT_SATISFACTION)
                  ? classes.selectedItem
                  : undefined
              }
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default ReportsListMenu;
