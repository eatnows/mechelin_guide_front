/*global kakao*/
import React, { useEffect, useState, useRef } from "react";
import "./MainMapStyle.css";
import Info from "./Info";
import Axios from "util/axios";

const MainMap = () => {
  const [latitude, setLatitude] = useState(37.54699);
  const [longitude, setLongitude] = useState(127.09598);
  const [map, setMap] = useState("");
  const [overlay, setOverlay] = useState("");
  const [userId, setUserId] = useState("");
  const [myLatitude, setMyLatitude] = useState([]);
  const [myLongitude, setMyLongitude] = useState([]);
  const [myPlaceName, setMyPlaceName] = useState([]);
  const [myPlaceAddress, setMyPlaceAddress] = useState([]);
  const useTest = useRef();
  useEffect(() => {
    console.log("시작");
    const url = `/place/myplace?user_id=${sessionStorage.getItem("userId")}`;
    setUserId(sessionStorage.getItem("userId"));
    Axios.get(url)
      .then((response) => {
        console.log(response);
        console.log(response.data[1]);
        for (let i = 0; i < response.data.length; i++) {
          myLatitude.push(response.data[i].latitude_x);
          myLongitude.push(response.data[i].longitude_y);
          myPlaceName.push(response.data[i].name);
          myPlaceAddress.push(response.data[i].address);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=본인앱키&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        let mapContainer = document.getElementById("map");
        let mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        // 지도를 생성합니다
        const createmap = new kakao.maps.Map(mapContainer, mapOption);

        setMap(createmap);
        let imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
          // 마커이미지의 크기입니다
          imageSize = new kakao.maps.Size(64, 69),
          // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          imageOption = { offset: new kakao.maps.Point(27, 69) };

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        // let marker = new kakao.maps.Marker({
        //   position: markerPosition,
        //   image: markerImage, // 마커이미지 설정
        // });
        let marker = [];
        console.log(myLatitude.length);
        /*
         * 지도의 나의 맛집 출력
         */
        for (let i = 0; i < myPlaceName.length; i++) {
          marker[i] = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(myLatitude[i], myLongitude[i]),
            image: markerImage,
          });
          // 마커가 지도 위에 표시되도록 설정합니다
          marker[i].setMap(createmap);
        }

        // 커스텀 오버레이에 표시할 컨텐츠 입니다
        // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
        // 별도의 이벤트 메소드를 제공하지 않습니다
        var content =
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="title">' +
          myPlaceName[2] +
          '            <div class="close" onclick="console.log(1)" title="닫기"></div>' +
          "        </div>" +
          '        <div class="body">' +
          '            <div class="img">' +
          '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
          "           </div>" +
          '            <div class="desc">' +
          '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
          '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
          '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>";

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        const aa = useRef.current;
        console.log(useRef.current);
        let overlay = [];
        for (let i = 0; i < myPlaceName.length; i++) {
          overlay[i] = new kakao.maps.CustomOverlay({
            content: content,
            map: createmap,
            position: marker[i].getPosition(),
            yAnchor: 1,
          });
        }
        // var overlay = new kakao.maps.CustomOverlay({
        //   content: content,
        //   map: createmap,
        //   position: marker.getPosition(),
        //   yAnchor: 1,
        // });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(map);
        });
      });
    };
  }, []);

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  const closeOverlay = () => {
    overlay.setMap(null);
    console.log("dsfsdfsdf");
  };

  return (
    <div>
      <div ref={useTest}>
        <Info closeOverlay={closeOverlay} />
      </div>
      <div
        id="map"
        style={{ width: "100%", height: "100vh", marginTop: "-10vh" }}
      ></div>
    </div>
  );
};

export default MainMap;
