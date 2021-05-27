import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Remove";
import { postService, getServiceData, updateService, deleteService } from "../api/services";
import { navigate, useLocation } from "@reach/router";
import "../styles/services.css";

const ServiceForm = () => {
  const [uploadedDataImageSource, setUploadedDataImageSource] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [postId, setPostId] = useState(null);
  const { pathname } = useLocation();

  const loadPostData = async (postId) => {
    try {
      const resp = await getServiceData(postId);
      setUploadedDataImageSource(
        `http://localhost:5000/${resp?.[0]?.imageUrl}`
      );
      setTitle(resp?.[0]?.title);
      setDescription(resp?.[0]?.description);
      setPrice(resp?.[0]?.price);
    } catch (error) {}
  };

  useEffect(() => {
    const splitPathName = pathname.split("/");
    if (splitPathName.length > 2) {
      setPostId(splitPathName[splitPathName.length - 1]);
      loadPostData(splitPathName[splitPathName.length - 1]);
    }
  }, []);

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

  const handleSubmit = async () => {
    try {
      if (postId) {
        const body = new FormData();
        body.append("title", title);
        body.append("description", description);
        body.append("price", price);
        if (chosenFile) {
          body.append("postImage", chosenFile);
        }
        await updateService(postId, body);
        navigate("/service");
      } else {
        const body = new FormData();
        body.append("title", title);
        body.append("description", description);
        body.append("price", price);
        body.append("postImage", chosenFile);
        await postService(body);
        navigate("/service");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (postId) {
        await deleteService(postId);
        navigate("/service");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCreateBtnEnabled = title && description && uploadedDataImageSource && price;

  return (
    <div>
      <Paper className="paper-container">
        <div className="form-banner">
          {postId ? "Edit Service" : "Create Service"}
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
        <label>Description</label>
        <textarea
          aria-label="description"
          rowsMin={3}
          className="custom-text-area-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price</label>
        <input
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className="custom-form-text-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
          {postId ? "Update" : "Create"}
        </Button>
        <Button
          color="primary"
          variant="contained"
          className="create-btn"
          onClick={handleDelete}
        > Delete
        </Button>
      </Paper>
    </div>
  );
};

export default ServiceForm;
