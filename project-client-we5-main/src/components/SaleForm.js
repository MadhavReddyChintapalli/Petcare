import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Remove";
import { saleFeed, getSaleData, updateSale } from "../api/sale";
import { navigate, useLocation } from "@reach/router";
import "../styles/feeds.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const SaleForm = () => {
  const [uploadedDataImageSource, setUploadedDataImageSource] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);
  const [title, setTitle] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saleId, setSaleId] = useState(null);
  const { pathname } = useLocation();

  // Loads the data with the sale id for the edit sale
  const loadPostData = async (saleId) => {
    try {
      const resp = await getSaleData(saleId);
      setUploadedDataImageSource(
        `https://pet-care-endpoint.herokuapp.com/${resp?.[0]?.photoURL}`
      );
      setTitle(resp?.[0]?.title);
      setPetType(resp?.[0]?.petType);
      setBreed(resp?.[0]?.breed);
      setColor(resp?.[0]?.color);
      setAge(resp?.[0]?.age);
      setDescription(resp?.[0]?.description);
      setLocation(resp?.[0]?.location);
      setPrice(resp?.[0]?.price);
      setPhoneNumber(resp?.[0]?.phoneNumber);
    } catch (error) {}
  };

  // Gets the sale id from the url on initial load
  useEffect(() => {
    const splitPathName = pathname.split("/");
    if (splitPathName.length > 2) {
      setSaleId(splitPathName[splitPathName.length - 1]);
      loadPostData(splitPathName[splitPathName.length - 1]);
    }
  }, []);

  // Handles the image upload
  const handleOnFileUpload = (event) => {
    const { target } = event;
    const { files } = target;
    if (files && files[0]) {
      setChosenFile(files[0]);
      let reader = new FileReader();
      reader.onload = (event) => {
        console.log("event", event.target.result);
        setUploadedDataImageSource(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // On sumbit adds a new sale to the listing
  const handleSubmit = async () => {
    try {
      if (saleId) {
        const body = new FormData();
        body.append("title", title);
        body.append("petType", petType);
        body.append("breed", breed);
        body.append("color", color);
        body.append("age", age);
        body.append("description", description);
        body.append("location", location);
        body.append("price", price);
        body.append("phoneNumber", phoneNumber);
        if (chosenFile) {
          body.append("feedImage", chosenFile);
        }
        await updateSale(saleId, body);
        navigate("/sales");
      } else {
        const body = new FormData();
        body.append("title", title);
        body.append("petType", petType);
        body.append("breed", breed);
        body.append("color", color);
        body.append("age", age);
        body.append("description", description);
        body.append("location", location);
        body.append("price", price);
        body.append("phoneNumber", phoneNumber);
        body.append("feedImage", chosenFile);
        await saleFeed(body);
        navigate("/sales");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCreateBtnEnabled =
    title &&
    petType &&
    breed &&
    color &&
    age &&
    location &&
    price &&
    phoneNumber &&
    description &&
    uploadedDataImageSource;

  return (
    <div>
      <Paper className="paper-container">
        <div className="form-banner form-flex-container">
          <ArrowBackIosIcon
            className="back-arrow"
            onClick={() => navigate("/sales")}
          />

          <span>{saleId ? "Edit Sale" : "Create Sale"}</span>
        </div>
        <label>Title</label>
        <input
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className="custom-form-text-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Pet Type</label>
        <input
          id="outlined-basic"
          label="Pet Type"
          variant="outlined"
          className="custom-form-text-input"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
        />
        <label>Breed</label>
        <input
          id="outlined-basic"
          label="Breed"
          variant="outlined"
          className="custom-form-text-input"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <label>Color</label>
        <input
          id="outlined-basic"
          label="Color"
          variant="outlined"
          className="custom-form-text-input"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label>Age</label>
        <input
          id="outlined-basic"
          label="Age"
          variant="outlined"
          className="custom-form-text-input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Description</label>
        <textarea
          aria-label="description"
          rowsMin={3}
          className="custom-text-area-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Location</label>
        <input
          id="outlined-basic"
          label="Location"
          variant="outlined"
          className="custom-form-text-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Price</label>
        <input
          id="outlined-basic"
          label="price"
          variant="outlined"
          className="custom-form-text-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Phone Number</label>
        <input
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          className="custom-form-text-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />
        {uploadedDataImageSource ? (
          <div className="upload-image-container">
            <Fab
              color="secondary"
              aria-label="add"
              className="edit-btn"
              size="small"
              onClick={() => {
                setUploadedDataImageSource(null);
                setChosenFile(null);
              }}
            >
              <EditIcon />
            </Fab>
            <img
              src={uploadedDataImageSource}
              className="uploaded-image"
              alt="uploaded"
            />
          </div>
        ) : (
          <input
            type="file"
            className="add-new-image"
            onChange={handleOnFileUpload}
          />
        )}
        <Button
          color="primary"
          variant="contained"
          className="create-btn"
          onClick={handleSubmit}
          disabled={!isCreateBtnEnabled}
        >
          {saleId ? "Update" : "Create"}
        </Button>
      </Paper>
    </div>
  );
};

export default SaleForm;
