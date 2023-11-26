import React from 'react';
import './index.css';
import aboutVid from '../../video/about-vid.mp4';

const About = () => {
    return (
        <main className='about-main main-con flex-col'>
            <div className="about-con flex-col">
                <h1>About Us</h1>
                <div className="about-sec flex">
                    <div className="about-paraphrase flex-col">
                        <div className="phrases flex-col">
                            <h3>Here's our story</h3>
                            <p>
                                <span>Real Estate Agencies </span> 
                                play a crucial role in the property 
                                market, providing valuable services to buyers, sellers, 
                                landlords and tenants. 
                                Whether you're looking to buy your first home or invest in a 
                                commercial property, a real estate agency can help you achieve 
                                your goals. 
                                Our team of professionals has the expertise and 
                                experience to guide you through the buying, selling or renting 
                                process, ensuring that you make informed decisions.  
                                So, if you're in the market for a property, consider working 
                                with our real estate agency to make the process smoother 
                                and more efficient.
                            </p>
                        </div>
                        <div className="phrases flex-col">
                            <h3>Our Goal</h3>
                            <p> As a <span> Real Estate Agency </span> 
                                we specialize in connecting our buying clients to our selling 
                                clients, and our rent seeking clients to our clients who are 
                                intent on renting out their properties. 
                                Our agency have a team of professionals who are trained to 
                                assist clients in finding their dream homes or selling and 
                                renting out their properties, whichever the case.  
                                These properties could be investment properties, 
                                commercial spaces or residencial homes. 
                                We provide a wide range of services, including property 
                                valuations, property management, and marketing campaigns to 
                                attract potential buyers or tenants. Our Real estate agency 
                                is essential in the property market as we help buyers, 
                                sellers, landlords and tenants navigate the complex process of 
                                buying, selling, renting out or finding well suited properties.  
                                With our expertise and experience, 
                                we can help clients make informed decisions and achieve 
                                their real estate goals.
                            </p>
                        </div>
                    </div>
                    <div className="about-vid-illust">
                        <video autoPlay loop muted controls >
                            <source src={aboutVid} alt='about-vid' />
                        </video>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default About;