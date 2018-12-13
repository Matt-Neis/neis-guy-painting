import React from 'react';
import {Formik} from 'formik' // forms library
import {Yup} from 'yup' // object schema validation
import '../Client/CSS/Quotes.css';

class Quotes extends React.Component {
    render() {
        return (
            <div>
                <h2>Request A Quote...</h2>
                <p>
                    If you would like to receive an online quote, please fill out the information below. 
                    We ask that you be as descriptive as possible.
                    Please note that quotes requested online will take time to review. 
                </p>
                <Formik
                  initialValues={{ name: '', 
                                   email: '',
                                   phone: '',
                                   city: '',
                                   desc: ''}}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
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
                                <input
                                  type="text"
                                  placeholder="Enter email address here"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.email}
                                  name="email"/>
                            </li>
                            <li>
                                <label>Phone Number</label>
                                <input
                                  type="number"
                                  placeholder="Enter phone number (with area code)"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.phone}
                                  name="phone"/>
                            </li>
                            <li>
                                <label>City</label>
                                <input
                                  type="text"
                                  placeholder="Enter City"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.city}
                                  name="city"/>
                            </li>
                            <li>
                                <label>Description</label>
                                <textarea
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
                />
            </div>
        );
    }
}

export default Quotes;