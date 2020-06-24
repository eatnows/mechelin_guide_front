/*global kakao*/
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MainMapStyle.css";
import Axios from "util/axios";

//let closeBtn;
const MainMap = () => {
  const [latitude, setLatitude] = useState(37.49879629938368);
  const [longitude, setLongitude] = useState(127.03168720284643);
  const [map, setMap] = useState("");
  const [overlay, setOverlay] = useState("");
  const [userId, setUserId] = useState("");
  const [myLatitude, setMyLatitude] = useState([]);
  const [myLongitude, setMyLongitude] = useState([]);
  const [myPlaceName, setMyPlaceName] = useState([]);
  const [myPlaceAddress, setMyPlaceAddress] = useState([]);
  const [mySubject, setMySubject] = useState([]);
  const [myContent, setMyContent] = useState([]);
  const [myRating, setMyRating] = useState([]);
  const [myFrontImg, setMyFrontImg] = useState([]);
  const [myUPId, setMyUPId] = useState([]);
  const useTest = useRef();
  const [isOpen, setIsOpen] = useState(true);
  // 마커에서 맛집 정보 출력할때 필요한 변수들
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [postCount, setPostCount] = useState("");
  const [placeName, setPlaceName] = useState("");
  // 리뷰글로 넘어갈때 필요한 변수
  const [UPId, setUPid] = useState("");

  //const [closeBtn, setCloseBtn] = useState();
  useEffect(() => {
    const url = `/place/myplace?user_id=${sessionStorage.getItem("userId")}`;
    setUserId(sessionStorage.getItem("userId"));
    Axios.get(url)
      .then((response) => {
        console.log(response);
        console.log(`data`);
        console.log(response.data);
        console.log(`data`);
        for (let i = 0; i < response.data.length; i++) {
          myLatitude.push(response.data[i].latitude_x);
          myLongitude.push(response.data[i].longitude_y);
          myPlaceName.push(response.data[i].name);
          myPlaceAddress.push(response.data[i].address);
          myUPId.push(response.data[i].user_place_id);
          mySubject.push(response.data[i].subject);
          myContent.push(response.data[i].content);
          myRating.push(response.data[i].rating);
          myFrontImg.push(response.data[i].front_image);
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
          level: 4,
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
        let content = [];
        let closeBtn = [];
        let allTag = [];
        let wrap = [];
        let info = [];
        let titleTag = [];
        let closeTag = [];
        console.log(myLatitude.length);
        // 이미지 태그 제거
        let imgTag = /<IMG(.*?)>/gi;
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

          // 오버레이에 들어갈 내용 만들기
          closeBtn[i] = document.createElement("div");
          closeBtn[i].setAttribute("className", "close");
          closeBtn[i].insertAdjacentText("afterbegin", "X");
          allTag[i] = document.createElement("div");
          allTag[i].insertAdjacentHTML("afterbegin", closeBtn[i]);
          // titleTag[i] = document.createElement("div");
          // titleTag[i].setAttribute("className", "title");
          // titleTag[i].setAttribute("value", myPlaceName[i]);
          // titleTag[i].insertAdjacentHTML("beforeend", closeTag[i]);
          // info[i] = document.createElement("div");
          // info[i].setAttribute("className", "info");
          // info[i].insertAdjacentHTML("afterbegin", titleTag[i]);
          // wrap[i] = document.createElement("div");
          // wrap[i].setAttribute("className", "wrap");
          // wrap[i].insertAdjacentHTML("afterbegin", info[i]);
          // allTag[i].insertAdjacentHTML("afterbegin", wrap[i]);
          document.body.appendChild(closeBtn[i]);

          closeBtn[i].setAttribute("style", "width: 10px; height: 10px;");
          content[i] =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            myPlaceName[i] +
            '            <div class="close" title="닫기"></div>' +
            "        </div>" +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="' +
            myFrontImg[i] +
            '" width="73px" height="70px">' +
            "           </div>" +
            '            <div class="desc">' +
            '                <div class="ellipsis">' +
            mySubject[i] +
            "</div>" +
            '                <div class="jibun ellipsis">' +
            myContent[i].replace(imgTag, "").substring(0, 15) +
            "..." +
            "</div>" +
            '                <div onClick="location.href=http://localhost:3000/mechelin/review/7">더보기</div>' +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        }

        // 커스텀 오버레이에 표시할 컨텐츠 입니다
        // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
        // 별도의 이벤트 메소드를 제공하지 않습니다

        //setCloseBtn(document.createElement("div"));

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다

        let overlay = [];
        for (let i = 0; i < myPlaceName.length; i++) {
          closeBtn[i].insertAdjacentHTML("afterbegin", content[i]);
          overlay[i] = new kakao.maps.CustomOverlay({
            content: closeBtn[i],
            map: null,
            position: marker[i].getPosition(),
          });

          // 오버레이를 클릭했을때 오버레이 삭제
          closeBtn[i].onclick = () => {
            overlay[i].setMap(null);
          };

          //마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker[i], "click", function () {
            // 오버레이를 표시하기전에 열려있던 오버레이를 닫음
            overlay[i].setMap(null);
            // 오버레이 표시
            overlay[i].setMap(createmap);
            console.log("실행");
            console.log(myUPId[i]);
            const url = `/post/review?user_place_id=${myUPId[i]}&row=1`;
            Axios.get(url)
              .then((res) => {
                console.log(res.data);
                setSubject((prev) => ({ subject: res.data.subject }));
                setContent(res.data.content);
                setRating(res.data.rating);
                setPostCount(res.data.post_count);
                setUPid(res.data.user_place_id);
                setPlaceName(res.data.name);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
        // var overlay = new kakao.maps.CustomOverlay({
        //   content: content,
        //   map: createmap,
        //   position: marker.getPosition(),
        //   yAnchor: 1,
        // });
      });
    };

    //closeBtn.value = "닫기";
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{ width: "100%", height: "100vh", zIndex: "0" }}
      ></div>
    </div>
  );
};

export default MainMap;
