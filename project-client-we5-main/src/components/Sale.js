import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import { fetchSales } from "../api/sale";
import jwtDecode from "jwt-decode";
import LoadingSkeleton from "../controls/LoadingSkeleton";
import { deleteSale } from "../api/sale";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headingSpace: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 500,
    marginBottom: 20,
    cursor: "pointer",
  },
  image: {
    width: 150,
    height: 150,
  },
  img: {
    display: "block",
    minWidth: "100%",
    minHeight: "100%",
  },
  createSaleBtn: {
    float: "right",
  },
  buttonMargin: {
    marginRight: "15px",
  },
  formControl: {
    minWidth: 150,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 0,
    backgroundColor: "white",
  },
}));

const Sale = () => {
  const [sales, setSales] = useState([]);
  const classes = useStyles();
  const [petType, setPetType] = useState("");
  const [petList, setPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [paginationCount, setPaginationCount] = useState(0);
  const [page, setPage] = React.useState(1);

  // Initial load of data and sets the sale items
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSales();
      setSales(data);
      const pets = [...new Set(data.reduce((a, c) => [...a, c.petType], []))];
      var filtered = pets.filter(function (x) {
        return x !== undefined;
      });
      setPetList(filtered);
      setFilteredSales(data);
      setPaginationCount(Math.ceil(data.length / 2));
    } catch (error) {}
    setIsLoading(false);
  };

  // When the filter changes the sale items are set
  const handleChange = (event) => {
    setPetType(event.target.value);
    if (event.target.value !== "All") {
      var filteredSales = sales.filter(function (x) {
        return x.petType === event.target.value;
      });
      setFilteredSales(filteredSales);
      setPaginationCount(filteredSales.length / 2);
    } else {
      setFilteredSales(sales);
      setPaginationCount(sales.length / 2);
    }
  };

  // Loads the current user and sets the token
  const loadCurrentUser = () => {
    const token = localStorage.getItem("token");
    const tokenDetails = jwtDecode(token);
    setCurrentUser(tokenDetails?.user?.id);
  };

  // Handles the delete of a sale with the particular user
  const handleDelete = async (event) => {
    try {
      await deleteSale(event._id);
      await loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    loadData();
    loadCurrentUser();
  }, []);

  // Renders a dummy skeleton in the initial load of the screen
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

  return (
    <div className={classes.root}>
      <Typography className={classes.headingSpace} variant="h5" component="h5">
        Available Sales
        <Button
          className={classes.createSaleBtn}
          variant="contained"
          color="primary"
          onClick={() => navigate("/sale-form")}
        >
          Create Sale
        </Button>
      </Typography>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Select a Pet Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={petType}
          onChange={handleChange}
          style={{ minWidth: 300 }}
          label="Pet Type"
        >
          <MenuItem value="All">All Pets</MenuItem>
          {petList.map((val) => {
            return (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {filteredSales &&
        filteredSales.slice((page - 1) * 2, page * 2).map((value) => {
          return (
            <Paper key={value._id} className={classes.paper}>
              <Grid container spacing={2}>
                <Grid
                  item
                  onClick={() =>
                    currentUser === value.user &&
                    navigate(`/sale-form/${value._id}`)
                  }
                >
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={`https://pet-care-endpoint.herokuapp.com/${value.photoURL}`}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid
                      item
                      xs
                      onClick={() =>
                        currentUser === value.user &&
                        navigate(`/sale-form/${value._id}`)
                      }
                    >
                      <Typography gutterBottom variant="subtitle1">
                        {value.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {value.breed}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {value.location}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="primary"
                      >
                        Contact
                      </Button>
                      {currentUser === value.user ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(value)}
                        >
                          Delete Sale
                        </Button>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">${value.price}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          );
        })}

      <Pagination
        count={paginationCount}
        shape="rounded"
        page={page}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default Sale;
