/*global kakao*/
import React, { Component } from "react";

class WriteFormMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  componentWillMount() {
    /*
      GPS 받아오는 메소드
    */
    let getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다.");
      }
    };
    getLocation();
  }
  // 지도 정보를 가져와서 출력하는 메소드
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=본인앱키&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(
            this.state.latitude,
            this.state.longitude
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }

  render() {
    return <div id="map" style={{ width: "600px", height: "600px" }}></div>;
  }
}

export default WriteFormMap;
