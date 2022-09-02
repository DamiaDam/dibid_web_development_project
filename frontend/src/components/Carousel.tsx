import { Carousel } from "react-bootstrap";
import carousel1 from '../images/carousel/carousel1.png';
import carousel2 from '../images/carousel/carousel2.png';
import carousel3 from '../images/carousel/carousel3.png';

const MainCarousel: React.FC = () => {

    return(
        <Carousel className="w-75 mx-auto py-5">
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel1}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Buy and Sell anything</h3>
                <p>Here you can buy whatever are you looking for, and sell anything</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel2}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3 style={{ color: 'white' }}>Combine best prices and quality</h3>
                <p>Find smartphones, laptops and other electronic products on the best price!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel3}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h3>FREE SHIPPING</h3>
                <p>Find selected items with free shipping, wherever you are!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );

}

export default MainCarousel;