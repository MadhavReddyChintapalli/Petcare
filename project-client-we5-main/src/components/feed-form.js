import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Remove";
import { postFeed, getFeedData, updateFeed } from "../api/feeds";
import { navigate, useLocation } from "@reach/router";
import "../styles/feeds.css";

const FeedForm = () => {
  const [uploadedDataImageSource, setUploadedDataImageSource] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postId, setPostId] = useState(null);
  const { pathname } = useLocation();

  const loadPostData = async (postId) => {
    try {
      const resp = await getFeedData(postId);
      setUploadedDataImageSource(
        `https://pet-care-endpoint.herokuapp.com/${resp?.[0]?.imageUrl}`
      );
      setTitle(resp?.[0]?.title);
      setDescription(resp?.[0]?.description);
    } catch (error) { }
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
        if (chosenFile) {
          body.append("feedImage", chosenFile);
        }
        await updateFeed(postId, body);
        navigate("/");
      } else {
        const body = new FormData();
        body.append("title", title);
        body.append("description", description);
        body.append("feedImage", chosenFile);
        await postFeed(body);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCreateBtnEnabled = title && description && uploadedDataImageSource;

  return (
    <div>
      <Paper className="paper-container">
        <div className="form-banner">
          {postId ? "Edit Feed" : "Create Feed"}
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
      </Paper>
    </div>
  );
};

export default FeedForm;
