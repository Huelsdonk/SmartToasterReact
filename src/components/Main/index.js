import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../utils/API";
import "./style.css";
import fire from "../../assets/fire.png";
import start from "../../assets/start-button.png";
import power from "../../assets/power-on.png";
import stopwatch from "../../assets/stopwatch.png";
import purpleToaster from "../../assets/purple-toaster.png";
import idea from "../../assets/idea.png";

export default function Main() {
  const [toasterState, setToasterState] = useState({
    Id: "",
    Name: "",
    On: false,
    Heat: 0,
    Time: 0,
  });

  const handleOnOff = (event) => {
    
    setToasterState({
      ...toasterState,
      On: event.target.checked,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      
        setToasterState({
        ...toasterState,
        On: false,
      });
    }, toasterState.Time * 1000);
    return () => clearTimeout(timer);
  }, [toasterState, toasterState.On]);

  const handleToasterChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setToasterState({
      ...toasterState,
      [name]: value,
    });
  };

  useEffect(() => {
    API.getToasters()
      .then((response) => {
        setToasterState({
          Id: response.data[0].Id,
          Name: response.data[0].Name,
          On: response.data[0].On,
          Heat: response.data[0].Heat,
          Time: response.data[0].Time,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (toasterState.Id !== "") {
      API.updateToaster(toasterState, toasterState.Id)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }, [toasterState]);

  return (
    <div>
      <div>
        <div className="jumbotron jumbotron-fluid bg-primary text-center">
          <img src={idea} alt="smart" />
          <img src={purpleToaster} alt="toaster" />
          {/* <h1 className="display-4 text-center">SMART TOASTER</h1> */}
        </div>

        <div className="container">
          <div className="row p-4 mb-4">
            <div className="col text-center">
              <h2 className="">Controls</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-12 m-4">
              <div className="card">
                {toasterState.On ? (
                  <motion.img
                    src={power}
                    className="card-img-top pt-4 onButtonIcon"
                    id="powerOn"
                    alt="..."
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 2, yoyo: Infinity }}
                  />
                ) : (
                  <img
                    src={start}
                    id="powerOff"
                    className="card-img-top pt-4 onButtonIcon"
                    alt="..."
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">On/Off</h5>
                  <div className="custom-control custom-switch pb-3 pt-3">
                    <motion.input
                      type="checkbox"
                      className="custom-control-input"
                      checked={toasterState.On}
                      name="On"
                      onChange={handleOnOff}
                      data={toasterState.Id}
                      id="onButton"
                      whileTap={{ scale: 1.3 }}
                    />
                    <label className="custom-control-label" htmlFor="onButton">
                      Toggle On/Off
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 m-4">
              <div className="card">
                <img src={fire} className="card-img-top pt-4" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Temperature</h5>
                  <label htmlFor="tempRange" id="tempLabel">
                    {toasterState.Heat}
                  </label>
                  <motion.input
                    type="range"
                    data={toasterState.Id}
                    value={toasterState.Heat}
                    name="Heat"
                    onChange={handleToasterChange}
                    className="custom-range"
                    min="0"
                    max="10"
                    id="tempRange"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-12 m-4">
              <div className="card">
                <img src={stopwatch} className="card-img-top pt-4" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Time</h5>
                  <p className="card-text">
                    <label htmlFor="timeRange" id="timeLabel">
                      {toasterState.Time}
                    </label>
                    <motion.input
                      type="range"
                      data={toasterState.Id}
                      value={toasterState.Time}
                      name="Time"
                      onChange={handleToasterChange}
                      className="custom-range"
                      min="0"
                      max="120"
                      id="timeRange"
                      whileHover={{ scale: 1.1 }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
