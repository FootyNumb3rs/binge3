import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Slide from "@material-ui/core/Slide";
import { lightBlue } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import TodayIcon from "@material-ui/icons/Today";
import ScheduleIcon from "@material-ui/icons/Schedule";

import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../styles/pop-up.css";

//const defaultTheme = createMuiTheme;
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: lightBlue
  }
});

const useStyles = makeStyles(theme => ({
  log: { display: "flex", height: "100%" },

  box: {
    display: "flex",
    maxWidth: 700,
    minWidth: 700,
    width: 700,
    maxHeight: 900,
    minHeight: 430,
    height: "auto",
    overflow: "hidden",
    borderRadius: 0
  },
  metaStyle: {
    display: "flex",
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#919191",
    fontWeight: 100,
    marginBottom: 18.5
  },
  synopsisStyle: {
    //flexGrow: 1,
    fontFamily: "Roboto",
    fontSize: 12.5,
    color: "#bdbdbd",
    marginBottom: 30,
    marginRight: 10,
    fontWeight: 300,
    lineHeight: 1.9
  },
  runtimeIcon: {
    width: "13.5px",
    padding: 0,
    marginTop: -4.8
  },

  button: {
    marginRight: theme.spacing(1.2),
    marginTop: 10,
    borderRadius: 20,
    height: "30px",
    fontSize: 12,
    textAlign: "left"
  },
  chip: {
    marginRight: 6.5,
    marginBottom: 1.5,
    backgroundColor: "#212121",
    color: "#bdbdbd",
    fontSize: 11.3,
    fontWeight: 500
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

// ----- DIALOG TITLE ------

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ----- DIALOG TITLE ------

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

{
  /* ------ MAIN FUNCTION ------ */
}
export default function PopUp({ handleClose, open, content }) {
  const classes = useStyles();
  const getRunningTime = runtime => {
    var hours = runtime / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "hr " + rminutes + "min";
  };
  //const theme = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        onClose={handleClose}
        open={open}
        classes={{
          paper: classes.box
        }}
      >
        <link
          href="https://fonts.googleapis.com/css?family=Bitter|Literata:500|Merriweather:700&display=swap"
          rel="stylesheet"
        />
        {/* Dialog Box */}
        <DialogContent dividers className={"dialog-content"}>
          <div className={"dialog-content-inner-div"}>
            {/* Image Panel */}
            <div className={"backdrop-div"}>
              <img src={content.backdropLink} className={"backdrop-img"} />
            </div>

            {/* Right Panel */}
            <div className={"meta-data"}>
              {/* ----------- TITLE ----------- */}
              <div style={{ width: "95%" }}>
                <Typography className={"title"}>{content.title}</Typography>
                {/* ----------- META DATA --------------- */}
                <div className={classes.metaStyle}>
                  <span
                    style={{ height: "45px", width: "45px", marginRight: 4 }}
                  >
                    <CircularProgressbarWithChildren
                      value={content.vote_average * 10}
                      strokeWidth={12.5}
                      styles={buildStyles({
                        strokeLinecap: "butt"
                      })}
                    >
                      <Typography style={{ fontSize: 14, fontWeight: 500 }}>
                        {content.vote_average * 10}
                      </Typography>
                    </CircularProgressbarWithChildren>
                  </span>
                  {/* Chip */}
                  <div style={{ marginLeft: 10 }}>
                    <div style={{ marginBottom: 5.5, paddingBottom: 2.5 }}>
                      {content.genres.map(genre => (
                        <Chip
                          size="small"
                          label={genre}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                    {/* Release etc. */}

                    <div
                      style={{
                        fontSize: 11.9,
                        marginLeft: 6,
                        fontWeight: 400,
                        flexDirection: "row",
                        display: "flex"
                      }}
                    >
                      <div style={{ marginRight: 5 }}>
                        <TodayIcon className={classes.runtimeIcon} />
                      </div>

                      <div style={{ marginRight: 14 }}>
                        {content.media_type == "tv"
                          ? content.first_air_date.slice(0, 4) +
                            " - " +
                            (content.status == "Returning Series"
                              ? "Present"
                              : content.last_air_date.slice(0, 4))
                          : content.release_date.slice(0, 4)}
                      </div>
                      <div style={{ marginRight: 3 }}>
                        <ScheduleIcon className={classes.runtimeIcon} />
                      </div>
                      <div>
                        {content.media_type == "tv"
                          ? content.number_of_seasons + " Season(s)"
                          : getRunningTime(content.runtime)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UNDER TITLE --------------- */}
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,
                  flexDirection: "column"
                }}
              >
                {/* OVERVIEW & BUTTOMS --------------- */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 0
                  }}
                >
                  {/* Overview */}
                  <div className={classes.synopsisStyle}>
                    {content.overview} <br />
                  </div>
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    marginLeft: 0,
                    marginRight: 0
                  }}
                >
                  {content.link && content.site == "YouTube" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      href={`https://www.youtube.com/watch?v=${content.link}`}
                      target="_blank"
                      style={{ textAlign: "left" }}
                    >
                      WATCH {content.media_type == "tv" ? "CLIP" : "TRAILER"}
                    </Button>
                  ) : (
                    <div />
                  )}

                  {content.homepage ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      href={content.homepage}
                      target="_blank"
                      style={{ textAlign: "left" }}
                    >
                      HOMEPAGE
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  );
}
