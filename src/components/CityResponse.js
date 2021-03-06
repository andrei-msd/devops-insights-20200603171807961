import React from 'react';
import firebase from '../firebase.js';

function CityResponse(props) {
    const db = firebase.firestore();

    if(props.responseData === null || props.responseData === '') {
        return null;
    }

    if(props.responseData.cod === '400' || props.responseData.cod === '404') {
        setTimeout(function() { props.clearResponse();}, 20000);
        return (
            <div className="col-sm-8">
                <div className="text-danger">{ props.responseData.message }</div>
            </div>
        );
    }

    if(props.responseData.cod === 200) {
        if(props.responseData.sys.country === 'NZ'){
            db.collection("city").doc(props.responseData.name).set({
                name: props.responseData.name,
                country: props.responseData.sys.country,
                dateSearched: firebase.firestore.Timestamp.now()},
                {merge: true})
                .catch(function(error) {
                    console.error("Error writing document city: ", error);
                });
        return (
            <div className="col-sm-8">
                <table className="table table-info table-hover">
                    <tbody>
                        <tr>
                            <td>City</td>
                            <td>{props.responseData.name}</td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>{props.responseData.main.temp}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td>{props.responseData.main.pressure}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{props.responseData.main.humidity}</td>
                        </tr>
                        <tr>
                            <td>Temperature (Min)</td>
                            <td>{props.responseData.main.temp_min}</td>
                        </tr>
                        <tr>
                            <td>Temperature (Max)</td>
                            <td>{props.responseData.main.temp_max}</td>
                        </tr>
                        <tr>
                            <td>Conditions</td>
                            <td>{props.responseData.weather[0].description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    else{
        return(
            <div className="text-danger big">{"City not found. Must be an NZ location"}</div>
        )
    }
}
    return null
}
  
export default CityResponse