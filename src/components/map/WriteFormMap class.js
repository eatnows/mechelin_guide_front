/*global kakao*/
import React, { Component } from "react";

class WriteFormMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      ps: "",
      infowindow: "",
      map: "",
      latitude: 37.506502,
      longitude: 127.053617,
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
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=본인앱키&autoload=false&libraries=services,clusterer,drawing";
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

        this.setState({
          map: new window.kakao.maps.Map(container, options),
        });
        this.setState({
          infowindow: new kakao.maps.InfoWindow({ zIndex: 1 }),
        });

        // 장소 검색 객체를 생성합니다
        this.setState({
          ps: new kakao.maps.services.Places(),
        });
      });
    };
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      let bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        this.displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.state.map.setBounds(bounds);
    }
  };

  // 지도에 마커를 표시하는 함수입니다
  displayMarker = (place) => {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: this.state.map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", () => {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      this.state.infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      this.state.infowindow.open(this.state.map, marker);
    });
  };

  searchKeyUp = (e) => {
    this.setState({
      keyword: e.target.value,
    });
    if (e.key === "Enter") {
      this.searchBtn();
    }
  };
  searchBtn = () => {
    // 키워드로 장소를 검색합니다
    this.state.ps.keywordSearch(this.state.keyword, this.placesSearchCB);
    this.setState({
      keyword: "",
    });
  };

  render() {
    return (
      <div>
        <div id="map" style={{ width: "600px", height: "600px" }}></div>
        <input
          type="text"
          id="keyword"
          ref="keyword"
          onKeyUp={this.searchKeyUp.bind(this)}
        />
        <button type="button" onClick={this.searchBtn.bind(this)}>
          검색
        </button>
      </div>
    );
  }
}

export default WriteFormMap;
