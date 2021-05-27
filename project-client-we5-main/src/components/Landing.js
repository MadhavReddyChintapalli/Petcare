import Grid from "@material-ui/core/Grid";
import ImgDogIntro from "../assets/dog.jpg";
import "../styles/landing.css";

const Landing = () => {
  return (
    <div id="LandingPage">
      <div></div>
      <div className="back-drop">&nbsp;</div>
      <Grid container spacing={3} className="intro-card">
        <Grid item sm={12} md={6} className="intro-left-card">
          <div className="tag-line">
            Give Endless <span>Love</span> to your pet.
            <div className="hashtag">#PetCare</div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="intro-left-card">
          <img src={ImgDogIntro} alt="Dog intro" className="dog-intro-image" />
        </Grid>
      </Grid>
      <div className="landing-inner-container">
        <div className="our-services-title">
          Our Services<span>...</span>
        </div>
        <div className="services-card">
          <div className="service-title">Bring yourself a new pet today</div>
          <div className="service-definition">
            To get the latest information on pet adoption and pet care,{" "}
            <a href="/login">Login</a> to access more information on pet sales
            around the world with different classifications and different price
            ranges.
          </div>
          <div className="service-definition">
            Also find a responsible and ethical breeder will be happy to show
            you around the breeding facility and allow you to ask as many
            questions as you can think of.
          </div>
        </div>
        <div className="services-card right-align">
          <div className="service-title">
            Get to know the latest pet services around you
          </div>
          <div className="service-definition">
            Know more about the services like Dog Walking Services, Cat Sitting,
            Dog Grooming,cat grooming, Bunny Grooming,Bird Boarding.
          </div>
        </div>
        <div className="services-card">
          <div className="service-title">
            Sell your pet in private to make sure it reaches the safest hands
          </div>
          <div className="service-definition">
            Post an Ad to sell your pet at your desired price and you rest
            assured that the puppy is going to safest and responsible hands.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
