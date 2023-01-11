import React, { useState } from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import speedingBus from "./redbus.png";
import Bus from "./blackbus.png";

const Mypage = () => {
  const [speed, setSpeed] = useState("");
  const [route, setRoute] = useState("");
  const [Routedata, setRouteData] = useState([]);
  const [Speeddata, setSpeedData] = useState([]);
  const [check, setCheck] = useState(false);

  const searchRoute = async () => {
    const res = await axios.get(`http://localhost:4040/veh/rtveh/${route}`);

    setRouteData(res.data);
    setCheck(false);
  };

  const searchSpeed = async () => {
    const res1 = await axios.get(`http://localhost:4040/veh/spdveh/${speed}`);

    setSpeedData(res1.data);
    setCheck(true);
  };

  const stopped = async () => {
    setCheck(false);
  };

  return (
    <div>
      <div>
        <h1>busTracker App</h1>
      </div>
      <div>
        <h2>Map</h2>
        <MapContainer
          center={[40.6331, -89.3985]}
          zoom={5}
          style={{ height: "600px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {check !== true &&
            Routedata.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [65, 65],
                  iconUrl: Bus,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  Vid: {item.vid} {<br></br>}
                  Time: {item.tmstmp} {<br></br>}
                  Speed: {item.speed} Mph {<br></br>}
                </Popup>
              </Marker>
            ))}

          {check === true &&
            Speeddata.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [65, 65],
                  iconUrl: speedingBus,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  Vid: {item.vid} {<br></br>}
                  Time: {item.tmstmp} {<br></br>}
                  Speed: {item.speed} Mph {<br></br>}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      <div>
        {Routedata.length > 0 && check === false && (
          <p>Number of Buses On the Map rightnow are {Routedata.length}</p>
        )}

        {Speeddata.length > 0 && check === true && (
          <p>
            Number of Buses Speeding On the Map rightnow are {Speeddata.length}
          </p>
        )}
      </div>
      <div>
        <h2>Routes & Report</h2>
        <p>
          Here you can search the routes and then report for speeding by
          entering the values and pressing buttons.Press Stop to go Back.{" "}
        </p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <form>
            <input
              placeholder="Route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
            <input
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </form>
          <button onClick={searchRoute}>Start</button>
          <button onClick={stopped}>Stop</button>
          <button onClick={searchSpeed}>Report</button>
        </div>
      </div>
      <div>
        <h2>Bus Data</h2>
        {check ? (
          <table border="2px">
            <tr>
              <th>Bus id</th>
              <th>Route:{route}</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Speed</th>
              <th>Distance</th>
            </tr>
            {Speeddata.map((item) => (
              <tr>
                <td>{item.vid}</td>
                <td>{item.des}</td>
                <td>{item.lat}</td>
                <td>{item.lon}</td>
                <td>{item.speed}</td>
                <td>{item.pdist}</td>
              </tr>
            ))}
          </table>
        ) : (
          <table border="2px">
            <tr>
              <th>Bus id</th>
              <th>Route:{route}</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Speed</th>
              <th>Distance</th>
            </tr>
            {Routedata.map((item) => (
              <tr>
                <td>{item.vid}</td>
                <td>{item.des}</td>
                <td>{item.lat}</td>
                <td>{item.lon}</td>
                <td>{item.speed}</td>
                <td>{item.pdist}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Mypage;
