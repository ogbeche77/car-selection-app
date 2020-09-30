import React, { useState, useEffect } from 'react';
import empty from './empty.svg';
import './App.css';

const App = () => {

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [model, setModel] = useState("id", "model", "value", "#");
  const [vehicle, setVehicle] = useState("id", "vehicle", "value", "#");
  const [display, setDisplay] = useState({ "spinner": "display-none", "models": "display-none", "vehicle": "display-none" });
  const [emptyDisplay, setEmptyDisplay] = useState("display-none")


  const fetchVehicleHandler = (event) => {
    event.preventDefault();
    if (event.target.value === "#") {
      setDisplay({ "spinner": "display-none", "models": "row", "vehicle": "display-none" })
    } else {
      const url = `http://localhost:8080/api/vehicles?make=${model.value}&model=${event.target.value}`;
      console.log(url)

      fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((response) => {
          if (response.length > 0) {
            setEmptyDisplay("display-none");
            setDisplay({ "spinner": "display-none", "models": "row", "vehicle": "row" })
            setVehicles(response);
          } else {
            setEmptyDisplay("row");
            setDisplay({ "spinner": "display-none", "models": "row", "vehicle": "display-none" })
          }
        })
    }

  }


  const fetchModelHandler = (event) => {
    event.preventDefault();
    if (event.target.value === "#") {
      setDisplay({ "spinner": "display-none", "models": "display-none", "vehicle": "display-none" })
    } else {
      setDisplay({ "spinner": "", "models": "display-none", "vehicle": "display-none" })
      const url = `http://localhost:8080/api/models?make=${event.target.value}`;
      setModel({ id: "model", value: event.target.value });
      fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((response) => {
          if (response.length > 0) {
            setEmptyDisplay("display-none");
            setDisplay({ "spinner": "display-none", "models": "row", "vehicle": "display-none" })
            setModels(response);
          } else {
            setDisplay({ "spinner": "display-none", "models": "display-none", "vehicle": "display-none" })
            setEmptyDisplay("row");
          }

        })

    }

  }



  const setMakesHandller = () => {
    const url = "http://localhost:8080/api/makes";
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((response) => {
        setMakes(response)
        //console.log(response);
      })
  }

  const makeOption = makes.map((make) => {
    //console.log(make)
    return <option value={make}>{make}</option>;
  })

  const modelOption = models.map((model) => {
    return <option value={model}>{model}</option>;
  })

  const vehiclesCard = vehicles.map((vehicle) => {

    return <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-3">
      <div className="card">
        <div className="card-body" data-testid="vehicle-body" data-testid="vehicle-fuel" data-testid="vehicle-capacity" data-testid="vehicle-engine">
          <p><b>bodyType</b> - {vehicle.bodyType}</p>
          <p><b>fuelType</b> - {vehicle.fuelType}</p>
          <p><b>engineCapacity</b> - {vehicle.engineCapacity}</p>
          <p><b>enginePowerKW</b> - {vehicle.enginePowerKW}</p>
          <p><b>enginePowerPS</b> - {vehicle.enginePowerPS}</p>
        </div>
      </div>
    </div>
  })

  useEffect(() => {
    setMakesHandller();
  })

  return (
    <div className="container-fluid bg-blue min-height">
      <div className="row">
        <div className="col-12 offset-0 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
          <div className="card  bg-blue border-light mt-5">
            <div className="card-body">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h1>Select your favourite car make</h1>
                    <form>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="form-group" data-testid="vehicle-model">
                            <label>Car Makes</label>
                            <select className="form-control" onChange={(event) => fetchModelHandler(event, model.id)}>
                              <option value="#">Select a car</option>
                              {makeOption}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className={display.models}>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="form-group" data-testid="vehicle-model">
                            <label>Models</label>
                            <select className="form-control" onChange={(event) => fetchVehicleHandler(event, vehicle.id)}>
                              <option value="#">Select a car</option>
                              {modelOption}
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className={emptyDisplay}>
                      <img className="offset-4 offset-sm-0" src={empty} width="50%" alt="online payment transfer" />
                      <div className="col-12 col-md-6 mt-5">
                        <h1 className="">No Models found for this car make</h1>
                        <small className="offset-0 offset-md-4">PLEASE SELECT ANOTHER CAR MAKE</small>
                      </div>
                    </div>
                    <div className={display.spinner}>
                      <i className='fa fa-spinner fa-spin fa-3x text-dark offset-6'></i>
                    </div>
                    <div className={display.vehicle}>
                      <div className="col-12">
                        <h3>Vehicle Description</h3>
                        <i className="fa fa-car fa-2x"></i>
                      </div>
                      {vehiclesCard}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
