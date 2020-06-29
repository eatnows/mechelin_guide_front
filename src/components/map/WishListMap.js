/*global kakao*/
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./WishListMapStyle.css";
import Axios from "util/axios";

let createmap;
const WishListMap = () => {
  const [latitude, setLatitude] = useState(37.49879629938368);
  const [longitude, setLongitude] = useState(127.03168720284643);

  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=본인앱키&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        let mapContainer = document.getElementById("wishListMap");
        let mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 5,
        };
        // 지도를 생성합니다
        createmap = new kakao.maps.Map(mapContainer, mapOption);

        // setTimeout(() => {
        //   markerLoad();
        // }, 50);
      });
    };
  }, []);

  return (
    <div>
      <div
        id="wishListMap"
        style={{ width: "800px", height: "650px", zIndex: "0" }}
      ></div>
    </div>
  );
};

export default WishListMap;
