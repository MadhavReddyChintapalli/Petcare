import { useState, useEffect } from "react";
import LoadingSkeleton from "../controls/LoadingSkeleton";
import { fetchFeeds } from "../api/feeds";
import moment from "moment";
import "../styles/feeds.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { navigate } from "@reach/router";
import jwtDecode from "jwt-decode";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFeeds();
      setFeeds(data);
    } catch (error) { }
    setIsLoading(false);
  };

  const loadCurrentUser = () => {
    const token = localStorage.getItem("token");
    const tokenDetails = jwtDecode(token);
    setCurrentUser(tokenDetails?.user?.id);
  };

  useEffect(() => {
    loadData();
    loadCurrentUser();
  }, []);

  const renderSkeleton = () => {
    return (
      <div className="feed-loader">
        <LoadingSkeleton variant="text" />
        <LoadingSkeleton
          variant="circle"
          width={40}
          height={40}
          marginTop={5}
        />
        <LoadingSkeleton variant="rect" width={210} height={118} />
      </div>
    );
  };
  if (isLoading) {
    return (
      <>
        {renderSkeleton()}
        {renderSkeleton()}
      </>
    );
  }

  const truncateString = (inputString) =>
    inputString?.length > 25 ? inputString.slice(0, 75) + "..." : inputString;
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className="create-feed-btn"
        size="small"
        onClick={() => navigate("/feed-form")}
      >
        <AddIcon />
      </Fab>
      <Grid container>
        {feeds?.map((feed) => {
          return (
            <Grid item xs={6}>
              {feed?.userId === currentUser && (
                <Fab
                  color="secondary"
                  aria-label="add"
                  className="create-feed-btn"
                  size="small"
                  onClick={() => navigate(`/feed-form/${feed._id}`)}
                >
                  <EditIcon />
                </Fab>
              )}

              <Paper className="feed-card">
                <div className="feed-title">{feed?.title}</div>
                <div className="feed-desc">
                  {truncateString(feed?.description)}
                </div>
                <span>{moment(feed?.datePosted).format("YYYY/MM/DD")}</span>
                <img
                  src={`https://pet-care-endpoint.herokuapp.com/${feed.imageUrl}`}
                  alt={feed.title}
                  className="feed-image"
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Feed;
