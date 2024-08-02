import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Characters } from "./views/character";
import { Planets } from "./views/planet";
import { Vehicles } from "./views/vehicle";
import { Single } from "./views/single";
import { SingleVehicle } from "./views/singlevehicle";
import { SinglePlanet } from "./views/singleplanet";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/characters" element={<Characters />} /> 
                        <Route path="/planets" element={<Planets />} /> 
                        <Route path="/vehicles" element={<Vehicles />} /> 
                        <Route path="/single/:charId" element={<Single />} />
                        <Route path="/singlevehicle/:vehicleId" element={<SingleVehicle />} />
                        <Route path="/singleplanet/:planetId" element={<SinglePlanet />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
