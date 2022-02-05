import { NstrumentaClient } from 'nstrumenta';
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './App.css';


const Home = () => {

    const { search } = useLocation();
    const nstClientRef = React.useRef<NstrumentaClient>(null);

    React.useEffect(() => {

        const wsUrlParam = new URLSearchParams(window.location.search).get("wsUrl");

        const wsUrl = wsUrlParam ? wsUrlParam : window.location.origin.replace('http', 'ws');

        nstClientRef.current = new NstrumentaClient({
            apiKey: "",
            wsUrl,
        });

        nstClientRef.current.init()
    }, [])

    return (
        <div>
            <Link to={`camera${search}`}>Camera</Link>{" "}
            <Link to={`viewer${search}`}>Viewer</Link>
        </div>
    );
};

export default Home;
