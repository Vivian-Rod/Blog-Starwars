const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            person: [],
            favorites: []
        },
        actions: {
            setPeopleData: (results) => {
                const store = getStore();
                setStore({ ...store, people: results });
            },
            setPlanetsData: (results) => {
                const store = getStore();
                setStore({ ...store, planets: results });
            },
            setVehiclesData: (results) => {
                const store = getStore();
                setStore({...store, vehicles: results });
            },
            setPersonData: (uid, properties) => {
                const store = getStore();
                const newPeopleArray = store.people.map(person => {
                    if (person.uid === uid) {
                        person.properties = properties;
                    }
                    return person;
                });
                setStore({ ...store, people: newPeopleArray });
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            addFavorite: (name) => {
                const store = getStore();
                setStore({ ...store, favorites: [...store.favorites, name] });
            },
            removeFavorite: (name) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(favorite => favorite !== name);
                setStore({ ...store, favorites: updatedFavorites });
            }
        }
    };
};

export default getState;
