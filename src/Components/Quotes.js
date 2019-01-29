import React from 'react';
import {Formik} from 'formik' // forms library
// import {Yup} from 'yup' // object schema validation
import '../Client/CSS/Quotes.css';
import 'gmail-send';
import Axios from 'axios';
const btoa = require('btoa');

class Quotes extends React.Component {

    // handleChange = event => {
    //     this.setState({emailString: event.target.value});
    // }

    // // api post call
    // handleSubmit = event => {
    //     event.preventDefault();

    //     const emailString = this.state.message;

    //     Axios.post(`http://localhost3001:/API/send`, {emailString})
    //     .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //     });
    // }

    render() {
        return (
            <div>
                <h2>Request A Quote...</h2>
                <p>
                    If you would like to receive a quote, please fill out the form below. You will be contacted
                    within 48 hours.
                </p>
                <Formik
                  initialValues={{ name: '', 
                                   email: '',
                                   phone: '',
                                   address: '',
                                   city: '',
                                   desc: ''}}
                  onSubmit={(values, actions) => { // this is where json values can be accessed
                    setTimeout(() => {

                        // create the message with the json string
                        var message = `To: neismj12@gmail.com\n` + // this will change
                                      `Subject: Request for Quote Received\n` +
                                      `Date:\r\n` + // Removing timestamp
                                      `Message-Id:\r\n` + // Removing message id
                                      `From:\r\n` + // Removing from
                                      `Name - ${values.name}\nEmail - ${values.email}\nPhone - ${values.phone}\nAddress - ${values.address}\nCity - ${values.city}\n\n${values.desc}` // Adding our actual message - has to be all one line so it looks ugly af

                        // convert the json object to b64 so the gmail api can use it
                        var b64String = btoa(message);
                        //console.log(b64String);
                        // alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);

                        console.log(`http://localhost:3001/API/send/${b64String}`);

                        // api call
                        Axios.post(`http://localhost:3001/API/send/${b64String}`)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });

                    }, 1000);
                  }}
                  render={props => (
                    <form onSubmit={props.handleSubmit}>
                        <ul class="flex-outer">
                            <li>
                            <label>Name</label>
                                <input id="txtName"
                                  type="text"
                                  size="16"
                                  placeholder="Enter First and Last Name"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.name}
                                  name="name"/>
                            </li>
                            <li>
                                <label>E-mail Address</label>
                                <input id="txtEmail"
                                  type="text"
                                  placeholder="Enter email address here"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.email}
                                  name="email"/>
                            </li>
                            <li>
                                <label>Phone Number</label>
                                <input id="txtPhone"
                                  type="text"
                                  placeholder="xxx-xxx-xxxx"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.phone}
                                  name="phone"/>
                            </li>
                            <li>
                            <label>Street Address</label>
                                <input id="txtAddress"
                                  type="text"
                                  size="16"
                                  placeholder="Enter street address"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.address}
                                  name="address"/>
                            </li>
                            <li>
                                <label>City</label>
                                <input id="txtCity"
                                  type="text"
                                  placeholder="Enter City"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.city}
                                  name="city"/>
                            </li>
                            <li>
                                <label>Description</label>
                                <textarea id="txtDesc"
                                  type="text"
                                  rows="6"
                                  placeholder="Enter a brief description of the service you are requesting"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.desc}
                                  name="desc"/>
                            </li>
                            <li>
                                <button type="submit">Submit</button>          
                            </li>
                        </ul>
                      {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    </form>
                  )}
                /> {/* End formik */}
                <p>
                    <b>"Let me think on that"</b>
                </p>
                
            </div>
        );
    }
}

export default Quotes;