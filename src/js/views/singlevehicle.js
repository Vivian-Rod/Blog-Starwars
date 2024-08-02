import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleVehicle = () => {
    const { store, actions } = useContext(Context);
    const { vehicleId } = useParams();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/vehicles/${vehicleId}`)
            .then((result) => result.json())
            .then((data) => actions.setVehicleData(vehicleId, data.result.properties))
            .catch((error) => {
                console.error("Error fetching vehicle data:", error);
            });
    }, [vehicleId]); 

    const vehicle = store.vehicles.find(vehicle => vehicle.uid === vehicleId);

    return (
        <div className="container">
            <div>
                {vehicle ? (
                    <div className="row d-flex bg-black text-light" key={vehicle.uid}>
                        <div className="col-sm-12 col-md-6">
                        <img src="" className="card-img-top" alt="..." />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h4 className="">{vehicle.name}</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores itaque
                                nesciunt suscipit alias architecto voluptates fuga cupiditate, accusamus
                                exercitationem, expedita non perferendis error autem neque reiciendis, minus
                                iusto? Minima, natus.
                            </p>
                            <hr className="text-danger" />
                            <div className="row d-flex">
                                <div className="col-4 text-light">
                                    <p>Name</p>
                                    <p>{vehicle.name}</p>
                                </div>
                                <div className="col-4 text-light">
                                    <p>Model</p>
                                    <p>{vehicle.model}</p>
                                </div>
                                <div className="col-4 text-light">
                                    <p>Manufacturer</p>
                                    <p>{vehicle.manufacturer}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Link to="/">
                <button className="btn btn-primary mt-3" href="#" role="button">
                    Back home
                </button>
            </Link>
        </div>
    );
};
