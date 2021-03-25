import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import './profile.css';
import { updateUser } from '../../store/session';


const Account = ({ isSelected, setIsSelected }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [city, setCity] = useState(user.city);
    // const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState([]);
    const id = user.id;

    // useEffect(() => {
    //     // dispatch(updateUser(user.id))
    // }, [dispatch])

    // if (isSelected) {

    // }

    const handleAccountView = (e) => {
        setIsSelected("Account")
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleCity = (e) => {
        setCity(e.target.value)
    }

    // const handleEmail = (e) => {
    //     setEmail(e.target.value)
    // }

    const handleUpdateAccount = async (e) => {
        e.preventDefault();

        const error = []
        if (user.first_name === first_name &&
            user.last_name === last_name &&
            user.city === city) {
            error.push("No changes have been made! Please make an update.")
        }
        if (first_name === "" ||
            last_name === "" ||
            city === "" /*||
            email === ""*/) {
            error.push("Please fill out all fields");
        }
        setErrors(error)

        const data = {
            id: id,
            first_name: first_name,
            last_name: last_name,
            city: city,
            // email: email,
        }
        console.log("FIRSTNAME-->", data)
        await dispatch(updateUser(data))
    }

    let view;
    if (isSelected === "Account") {
        view = (
            <form className="inner-account-info-container">
                <ul>
                    {errors.map((error, idx) => <li className="error-li" key={idx}>{error}</li>)}
                </ul>
                <div className="input-wrapper">
                    <div className="profile-label">
                        <label>First Name</label>
                    </div>
                    <div className="profile-input">
                        <input
                            name="first_name"
                            value={first_name}
                            onChange={handleFirstName}
                        />
                    </div>
                </div>
                <div className="input-wrapper">
                    <div className="profile-label">
                        <label>Last Name</label>
                    </div>
                    <div className="profile-input">
                        <input
                            name="last_name"
                            value={last_name}
                            onChange={handleLastName}
                        />
                    </div>
                </div>
                <div className="input-wrapper">
                    <div className="profile-label">
                        <label>City</label>
                    </div>
                    <div>
                        <div className="profile-input">
                            <input
                                name="city"
                                value={city}
                                onChange={handleCity}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="input-wrapper">
                    <div className="profile-label">
                        <label>Email</label>
                    </div>
                    <div>
                        <div className="profile-input">
                            <input
                                name="email"
                                value={email}
                                onChange={handleEmail}
                            />
                        </div>
                    </div>
                </div> */}
                <button type="button" onClick={handleUpdateAccount}>Update</button>
            </form>
        )
    }


    return (
        <div className="outer-account-info-container">
            <button className="account-btn" type="button" onClick={handleAccountView}>Account Info</button>
            {view}
        </div>
    )
}

export default Account;