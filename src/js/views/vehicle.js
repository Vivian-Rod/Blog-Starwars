import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Vehicles = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/vehicles")
            .then((result) => result.json())
            .then((data) => actions.setVehiclesData(data.results))
            .catch((error) => {
                console.error("Error fetching vehicle data:", error);
            });
    }, []);

    const handleAddFavorite = (name) => {
        actions.addFavorite(name);
    };

    const getVehicleImage = (uid) => {
        const defaultImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        const vehicleImage = `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
        return (
            <img
                src={vehicleImage}
                onError={(e) => e.target.src = defaultImage}
                className="card-img-top"
                alt="Vehicle"
            />
        );
    };

    return (
        <div className="container">
            <div className="row">
                <h3 className="text-danger">Vehicles</h3>
            </div>
            <div className="list-group list-group-horizontal inline-scroll" style={{ overflowX: "auto" }}>
                {store.vehicles.map((vehicle) => {
                    return (
                        <div key={vehicle.uid}>
                            <div className="card" style={{ width: "18rem", marginRight: "15px", background: "black", color: "white" }}>
                                {getVehicleImage(vehicle.uid)}
                                <div className="card-body">
                                    <h5 className="card-title">{vehicle.name}</h5>
                                    <p className="card-text">Model: {vehicle.model}</p>
                                    <p className="card-text">Manufacturer: {vehicle.manufacturer}</p>
                                    {vehicle.pilots && (
                                        <p className="card-text">Pilots: {vehicle.pilots.join(', ')}</p>
                                    )}
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to={`/singlevehicle/${vehicle.uid}`}>
                                            <span className="btn btn-outline-primary">Learn more!</span>
                                        </Link>
                                        <button className="btn btn-outline-danger" onClick={() => handleAddFavorite(vehicle.name)}>
                                            <i className="fa fa-heart" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <br />
        </div>
    );
};
