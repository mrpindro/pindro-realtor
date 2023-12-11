import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './index.css';
import useTitle from '../../hooks/useTitle';

const Contact = () => {
    useTitle('How to contact us');
    
    return (
        <main className='contact-main flex-col main-con'>
            <div className="contact-con flex-col">
                <h1>Contact Us</h1>
                <hr />
                <div className="contact-sec flex-col">
                    <p className='flex-col'>Seeking assistance? 
                        <span>Click the customer assistant icon on the webpage,</span>
                        <span>OR</span>
                        <span>
                            You can reach us on one of the contact infos listed below
                        </span>
                    </p>

                    <div className="contacts-form flex-cen">
                        <div className="contacts flex-col">
                            <div className="contact flex-col">
                                <h4>Head Office</h4>
                                <p>street 123, Abuja, FCT</p>
                            </div>
                            <div className="contact flex-col">
                                <h4>Other Offices</h4>
                                <p>street 456, Ikeja, Lagos</p>
                                <p>street 789, Benin City, Edo</p>
                                <p>street 000, Asaba, Delta</p>
                            </div>
                            <div className="contact flex-col">
                                <h4>Email Address</h4>
                                <a href='mailto:pindrorealtor@mail.com' rel="noreferrer">
                                    pindrorealtor@mail.com
                                </a>
                            </div>
                            <div className="contact flex-col">
                                <h4>Phone Number</h4>
                                <a href='tel:+234123456789' target='_blank' rel="noreferrer">
                                    +234 123456789
                                </a>
                            </div>
                        </div>

                        <form className="cont-form flex-col">
                            <h4>Send us a message</h4>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    id='contact-name'
                                    name='name'
                                    placeholder='Your Full Name'
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email"
                                    id='contact-email'
                                    name='email'
                                    placeholder='Your Email'
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    name="message" 
                                    id="contact-message" 
                                    placeholder='Your Message'
                                ></textarea>
                            </div>
                            <button type='submit' title='Send'>
                                <FaPaperPlane className='messenger-icon' />                              
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Contact;