import { useState, useEffect } from "react";
import LoadingSkeleton from "../controls/LoadingSkeleton";
import { fetchServices } from "../api/services";
import "../styles/services.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { navigate } from "@reach/router";
import jwtDecode from "jwt-decode";
import Button from "@material-ui/core/Button";

const Service = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (error) {}
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
      <div className="service-loader">
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
      <Button
        color="primary"
        variant="contained"
        className="create-service-btn"
        onClick={() => navigate("/service-form")}
      >
        ADD
      </Button>

      <Grid container>
        {services?.map((service) => {
          return (
            <Grid item xs={6}>
              <Paper className="service-card">
                <div className="service-title">{service?.title}</div>
                <div className="service-desc">{service?.description}</div>
                <div style={{marginTop:'30px',marginBottom:'30px'}}>{service?.price}</div>
                <img
                  src={`https://pet-care-endpoint.herokuapp.com/${service.imageUrl}`}
                  alt={service.title}
                  className="service-image"
                />
                <Button
                  color="primary"
                  variant="contained"
                  style={{marginTop:'20px',marginBottom:'20px'}}
                  onClick={() => navigate(`/service-form/${service._id}`)}
                >
                  Edit
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Service;
