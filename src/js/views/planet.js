import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planets = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/planets")
            .then((result) => result.json())
            .then((data) => actions.setPlanetsData(data.results))
            .catch((error) => {
                console.error("Error fetching planet data:", error);
            });
    }, []);

    const handleAddFavorite = (name) => {
        actions.addFavorite(name);
    };

    const getPlanetImage = (uid, name) => {
        const defaultImage = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        let planetImage = `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
        
        // Si Tatooine no se muestra correctamente, usa una imagen alternativa
        if (name === "Tatooine") {
            planetImage = "https://content.nationalgeographic.com.es/medio/2022/08/01/el-planeta-tierra_19950d74_1280x1280.jpg"; // imagen alternativa para Tatooine
        }

        return (
            <img
                src={planetImage}
                onError={(e) => e.target.src = defaultImage}
                className="card-img-top"
                alt="Planet"
            />
        );
    };

    return (
        <div className="container">
            <div className="row">
                <h3 className="text-danger">Planets</h3>
            </div>
            <div className="list-group list-group-horizontal inline-scroll" style={{ overflowX: "auto" }}>
                {store.planets.map((planet) => {
                    return (
                        <div key={planet.uid}>
                            <div className="card" style={{ width: "18rem", marginRight: "15px", background: "black", color: "white" }}>
                                {getPlanetImage(planet.uid, planet.name)}
                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>
                                    <p className="card-text">Climate: {planet.climate}</p>
                                    <p className="card-text">Population: {planet.population}</p>
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to={`/singleplanet/${planet.uid}`}>
                                            <span className="btn btn-outline-primary">Learn more!</span>
                                        </Link>
                                        <button className="btn btn-outline-danger" onClick={() => handleAddFavorite(planet.name)}>
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


