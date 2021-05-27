import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Remove";
import { postEvent, getEventData, updateEvent } from "../api/events";
import { navigate, useLocation } from "@reach/router";
import "../styles/events.css";
import TextField from '@material-ui/core/TextField';
import moment from "moment";


const EventForm = () => {
    const [uploadedDataImageSource, setUploadedDataImageSource] = useState(null);
    const [chosenFile, setChosenFile] = useState(null);
    const [eventName, seteventName] = useState("");
    const [eventLocation, seteventLocation] = useState("");
    const [eventLimit, seteventLimit] = useState("");
    const [eventPrice, seteventPrice] = useState("");
    const [eventId, seteventId] = useState(null);
    const [eventDescription, seteventDescription] = useState("");
    const [eventDate, setEventDate] = useState("")
    const { pathname } = useLocation();

    const loadEventData = async (eventId) => {
        try {
            const resp = await getEventData(eventId);
            setUploadedDataImageSource((resp?.[0]?.eventImageUrl) ?
                `https://pet-care-endpoint.herokuapp.com/${resp?.[0]?.eventImageUrl}` : ''
            );
            seteventName(resp?.[0]?.eventName);
            seteventDescription(resp?.[0]?.eventDescription);
            seteventLocation(resp?.[0]?.eventLocation);
            setEventDate(moment(resp?.[0]?.eventDate).format("YYYY-MM-DD"));
            seteventPrice(resp?.[0]?.eventPrice)
            seteventLimit(resp?.[0]?.eventLimit)
            console.log(eventDate)
        } catch (error) { }
    };

    useEffect(() => {
        const splitPathName = pathname.split("/");
        if (splitPathName.length > 2) {
            seteventId(splitPathName[splitPathName.length - 1]);
            loadEventData(splitPathName[splitPathName.length - 1]);
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
            if (eventId) {
                const body = new FormData();
                body.append("eventName", eventName);
                body.append("eventLocation", eventLocation);
                body.append("eventDescription", eventDescription)
                body.append("eventDate", eventDate)
                body.append("eventPrice", eventPrice)
                body.append("eventLimit", eventLimit)

                if (chosenFile) {
                    body.append("file", chosenFile);
                }
                body.append("id", eventId)
                await updateEvent(eventId, body);
                navigate("/events");
            } else {
                const body = new FormData();
                body.append("eventName", eventName);
                body.append("eventLocation", eventLocation);
                body.append("eventDescription", eventDescription)
                body.append("eventDate", eventDate)
                body.append("eventPrice", eventPrice)
                body.append("eventLimit", eventLimit)
                body.append("file", chosenFile);
                await postEvent(body);
                navigate("/events");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isCreateBtnEnabled = eventName && eventLocation && eventDescription;

    return (
        <div>
            <Paper className="paper-container">
                <div className="form-banner">
                    {eventId ? "Edit Event" : "Create Event"}
                </div>
                <label>Event Name *</label>
                <input
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    className="custom-form-text-input"
                    value={eventName}
                    onChange={(e) => seteventName(e.target.value)}
                />
                <label>Event Description *</label>
                <textarea
                    aria-label="Event Description"
                    rowsMin={3}
                    className="custom-text-area-input"
                    value={eventDescription + ''}
                    onChange={(e) => seteventDescription(e.target.value)}
                />
                <label>Event Location *</label>
                <input
                    id="outlined-basic"
                    label="Event Location"
                    variant="outlined"
                    className="custom-form-text-input"
                    value={eventLocation}
                    onChange={(e) => seteventLocation(e.target.value)}
                />

                <label>Event Limit </label>

                <input
                    id="outlined-basic"
                    label="Event Location"
                    variant="outlined"
                    className="custom-form-text-input"
                    value={eventLimit}
                    onChange={(e) => seteventLimit(e.target.value)}
                />

                <label>Event Price </label>

                <input
                    id="outlined-basic"
                    label="Event Location"
                    variant="outlined"
                    className="custom-form-text-input"
                    value={eventPrice}
                    onChange={(e) => seteventPrice(e.target.value)}
                />
                <TextField
                    id="date"
                    label="Event Date"
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(moment(e.target.value).format("YYYY-MM-DD"))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {uploadedDataImageSource ? (
                    <div >
                        <Fab

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
                    {eventId ? "Update" : "Create"}
                </Button>
            </Paper>
        </div>
    );
};

export default EventForm;