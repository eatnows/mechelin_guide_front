/*global kakao*/
import React, { useState, useEffect } from "react";

const WriteFormMap2 = () => {
  const [latitude, setLatitude] = useState(37.505002);
  const [longitude, setLongitude] = useState(127.033617);
  const [keyword, setKeyword] = useState("");
  const [ps, setPs] = useState("");
  const [infowindow, setInfoWindow] = useState("");
  const [map, setMap] = useState("");
  console.log(latitude, longitude);
  useEffect(() => {
    /*
      GPS 받아오는 메소드
    */
    let getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
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

    /*
     * 지도 받아오는 메소드
     */
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=본인앱키&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        // 지도를 생성합니다
        //let map = new window.kakao.maps.Map(container, options);
        setMap(new window.kakao.maps.Map(container, options));
        // 장소 검색 객체를 생성합니다
        //let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        setInfoWindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
        // 장소 검색 객체를 생성합니다
        //let ps = new kakao.maps.services.Places();
        setPs(new kakao.maps.services.Places());
      });
    };
  }, [latitude, longitude]);
  /*
   * 키워드 검색 완료 시 호출되는 콜백함수 입니다
   */
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      let bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  };

  /*
   * 지도에 마커를 표시하는 함수입니다
   */
  const displayMarker = (place) => {
    // 마커를 생성하고 지도에 표시합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", () => {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
  };

  const searchKeyUp = (e) => {
    setKeyword(e.target.value);
    if (e.key === "Enter") {
      searchBtn();
    }
  };
  const searchBtn = () => {
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);
    setKeyword("");
  };

  return (
    <div>
      <div id="map" style={{ width: "600px", height: "600px" }}></div>
      <input type="text" id="keyword" onKeyUp={searchKeyUp} />
      <button type="button" onClick={searchBtn}>
        검색
      </button>
    </div>
  );
};

export default WriteFormMap2;
