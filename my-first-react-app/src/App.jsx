import './App.css';
import Header from './header';
import Footer from './footer';
import Reviews from './reviews';
import './samrat-khadka-A2Xd_AzRuZs-unsplash1.jpg';
import Main_Page from './main_page' ;

function App() {
  return (
    <>
      <Header />
      
      <Main_Page/>
      <div className="home-intro">
        <h1>YOUR NEXT ADVENTURE STARTS NOW</h1>
        <p>
          Welcome to EAGLERIDER—the world’s largest motorcycle rental and 
          touring company. Since 1992, we’ve helped millions of riders ignite and live 
          their passion for the open road. Whether you're chasing the thrill of 
          legendary highways or uncovering hidden gems, we make every ride one of a kind.
        </p>
      </div>

      <div className="hero">
        <div className="hero-content">
          <h1>DISCOVER MOTORCYCLE RENTAL & TOUR DESTINATIONS WORLDWIDE</h1>
          <p>
            Ride legendary routes, historic highways, and untamed landscapes across six continents—from 
            snow-capped peaks to sun-soaked coasts, bustling cities to pristine wilderness. Start planning today!
          </p>
        </div>
        <div className="hero-img">
          
        </div>
      </div>
      <Reviews/>
      <div className="hero-2">
  <div className="overlay"></div>
  <div className="hero-content2">
    <h1>READY TO RIDE INTO THE UNKNOWN?</h1>
    <p>
      From the cliffs of the Pacific Coast Highway to the wild passes of the Himalayas,
      chase the thrill on two wheels. Discover hidden trails, legendary routes, and
      unforgettable moments with our world-class motorcycle rentals and guided tours.
      Wherever the road takes you, adventure awaits.
    </p>
  </div>
</div>
      <Footer/>
    </>
  );
}

export default App;
