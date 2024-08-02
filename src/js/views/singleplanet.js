import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SinglePlanet = () => {
    const { store, actions } = useContext(Context);
    const { planetId } = useParams();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${planetId}`)
            .then((result) => result.json())
            .then((data) => actions.setPlanetData(planetId, data.result.properties))
            .catch((error) => {
                console.error("Error fetching planet data:", error);
            });
    }, [planetId]);

    const planet = store.planets.find(planet => planet.uid === planetId);

    return (
        <div className="container">
            <div>
                {planet ? (
                    <div className="row d-flex bg-black text-light" key={planet.uid}>
                        <div className="col-sm-12 col-md-6">
                        <img src="" className="card-img-top" alt="..." />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h4 className="">{planet.name}</h4>
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
                                    <p>{planet.name}</p>
                                </div>
                                <div className="col-4 text-light">
                                    <p>Climate</p>
                                    <p>{planet.climate}</p>
                                </div>
                                <div className="col-4 text-light">
                                    <p>Population</p>
                                    <p>{planet.population}</p>
                                </div>
                                {/* Agrega más campos según sea necesario */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Link to="/">
                <button className="btn btn-primary" href="#" role="button">
                    Back home
                </button>
            </Link>
        </div>
    );
};
