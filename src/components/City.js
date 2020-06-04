import React, { useEffect, useState } from 'react';
import firebase from '../firebase.js';

function City(props) {
    const db = firebase.firestore();

    useEffect(() => {
          
          db.collection("city").orderBy("dateSearched", "desc").limit(1)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  props.onCityChange(doc.data().name);
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });

      
      }, []);
    

    const [validationError, setValidationError] = useState(null);

    const validate = (event) => {
        const cityPattern = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        const valid = cityPattern.test(event.target.value);
        if (!valid) {
            setValidationError('Must be an NZ city name');
            props.clearResponse();
        } else {
            setValidationError('');
            props.onCityChange(event.target.value);
        }
    };

    return (
        <div className="col-sm-4">
            <div className="row">
                <div className="col-sm-10">
                    <style jsx="true">{`
                        .form-control::-webkit-input-placeholder {
                            color: #ddd;
                        }
                    `}
                    </style>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="usr" 
                        placeholder="NZ City Name"
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                validate(event);
                            }
                        }}
                    ></input>   
                </div>
            </div>
            <div className="pl-3 row">
                <div className="text-danger small"> { validationError }</div>
            </div>
        </div>
    );
}

export default City