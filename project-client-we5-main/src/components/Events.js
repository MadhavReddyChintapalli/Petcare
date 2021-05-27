import { useState, useEffect } from "react";
import LoadingSkeleton from "../controls/LoadingSkeleton";
import { fetchEvents } from "../api/events";
import moment from "moment";
import "../styles/events.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { navigate } from "@reach/router";
import jwtDecode from "jwt-decode";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
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
        onClick={() => navigate("/event-form")}
      >
        <AddIcon />
      </Fab>
      <Grid container>
        {events?.map((event) => {
          return (
            <Grid item xs={12} md={12} lg={12} className='event-container'>
              {event?.user === currentUser &&
                <Fab
                  color="secondary"
                  aria-label="add"
                  className="create-event-btn"
                  size="small"
                  onClick={() => navigate(`/event-form/${event._id}`)}
                >
                  <EditIcon />
                </Fab>
              }

              <Paper className='event-item'>
                <h1 >{event?.eventName}</h1>
                {
                  event?.eventCreated ? <span>Event Created On {moment(event?.eventCreated).format("YYYY/MM/DD HH:MM  A")}</span> : ''
                }
                {
                  event.eventLimit ? <p>Limit : {event?.eventLimit} persons</p> : <p> No Limit Applicable</p>
                }
                {
                  event.eventPrice ? <p>Price : {event?.eventPrice} $</p> : <p> Free Event</p>
                }
                {
                  event?.evenCategory ? <p>Category :  {event?.evenCategory} </p> : ''
                }
                {
                  event?.eventAge ? <p>Minimum Age  :  {event?.eventAge} </p> : <p> All age groups </p>
                }
                {
                  event?.eventDate ? <p> Event Date : {moment(event?.eventDate).format("YYYY/MM/DD")} </p> : ''
                }


                <div >
                  <h4>{truncateString(event?.eventDescription)}</h4>
                </div>

                {
                  event.eventImageUrl ?
                    < img
                      src={`https://pet-care-endpoint.herokuapp.com/${event?.eventImageUrl}`}
                      alt={event?.eventName}
                    /> :
                    ''
                }
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div >
  );
};

export default Events;
