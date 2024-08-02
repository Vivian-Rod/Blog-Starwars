// Characters.js

import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/people")
            .then((result) => result.json())
            .then((data) => actions.setPeopleData(data.results));
    }, [actions]);

    const getImageUrl = (id) => {
        const imageMap = {
            // Mapeo de IDs a URLs de imágenes
            '1': 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
            '2': 'https://starwars-visualguide.com/assets/img/characters/2.jpg',
            '3': 'https://starwars-visualguide.com/assets/img/characters/3.jpg',
            '4': 'https://starwars-visualguide.com/assets/img/characters/4.jpg',
            '5': 'https://starwars-visualguide.com/assets/img/characters/5.jpg',
            '6': 'https://starwars-visualguide.com/assets/img/characters/6.jpg',
            '7': 'https://starwars-visualguide.com/assets/img/characters/7.jpg',
            '8': 'https://starwars-visualguide.com/assets/img/characters/8.jpg',
            '9': 'https://starwars-visualguide.com/assets/img/characters/9.jpg',
            '10': 'https://starwars-visualguide.com/assets/img/characters/10.jpg'
            // Añadir más mapeos según sea necesario
        };

        return imageMap[id] || 'URL_DEFECTO_PARA_IMAGEN';
    };

    return (
        <div className="container">
            <div className="row">
                <h3 className="text-danger">Characters</h3>
            </div>
            <div className="list-group list-group-horizontal inline-scroll" style={{ overflowX: "auto" }}>
                {store.people.map((person) => {
                    return (
                        <div key={person.uid}>
                            <div className="card" style={{ width: "18rem", marginRight: "15px", background: "black", color: "white" }}>
                                <img src={getImageUrl(person.uid)} className="card-img-top" alt={person.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{person.name}</h5>
                                    <p className="card-text">Gender: {person.gender}</p>
                                    <p className="card-text">Hair color: {person.hair_color}</p>
                                    <p className="card-text">Eye color: {person.eye_color}</p>
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to={"/single/" + person.uid}>
                                            <span className="btn btn-outline-primary">Learn more!</span>
                                        </Link>
                                        <button className="btn btn-outline-danger" onClick={() => actions.addFavorite(person.name)}>
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