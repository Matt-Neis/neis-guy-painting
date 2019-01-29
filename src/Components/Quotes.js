import React from 'react';
import {Formik} from 'formik' // forms library
// import {Yup} from 'yup' // object schema validation
import '../Client/CSS/Quotes.css';
import Axios from 'axios';

class Quotes extends React.Component {
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
                  // TODO: Make this work
                  onReset={(initialValues, actions) => {
                      actions.resetForm(initialValues);
                  }}
                  onSubmit={(values, actions, initialValues) => { // this is where json values can be accessed
                    setTimeout(() => {

                        // api post call
                        Axios.post('http://localhost:3001/API/send', {
                            name: values.name,
                            email: values.email,
                            phone: values.phone,
                            address: values.address,
                            city: values.city,
                            desc: values.desc
                        })
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        });

                        // reset the form
                        alert("Thank you for requesting a quote. You will hear from me shortly!");
                        actions.resetForm(initialValues); // have to pass in the initial blank values
                        
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