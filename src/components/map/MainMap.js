/*global kakao*/
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MainMapStyle.css";
import Axios from "util/axios";

//let closeBtn;
const MainMap = (props) => {
  const [latitude, setLatitude] = useState(37.49879629938368);
  const [longitude, setLongitude] = useState(127.03168720284643);
  const [map, setMap] = useState("");
  const [overlay, setOverlay] = useState("");
  const [userId, setUserId] = useState("");
  // 나의 맛집 리스트들 필요한 변수
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
  // 내 친구들의 맛집 리스트들 필요한 변수
  const [friendLatitude, setFriendLatitude] = useState([]);
  const [friendLongitude, setFriendLongitude] = useState([]);
  const [friendPlaceName, setFriendPlaceName] = useState([]);
  const [friendPlaceAddress, setFriendPlaceAddress] = useState([]);
  const [friendSubject, setFriendSubject] = useState([]);
  const [friendContent, setFriendContent] = useState([]);
  const [friendRating, setFriendRating] = useState([]);
  const [friendFrontImg, setFriendFrontImg] = useState([]);
  const [friendUPId, setFriendUPId] = useState([]);
  const [friendUserId, setFriendUserId] = useState([]);
  const [friendPinUrl, setFriendPinUrl] = useState([]);
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
        console.log(response.data);
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

    const friendUrl = `/place/friendsplace?user_id=${sessionStorage.getItem(
      "userId"
    )}`;
    // 친구들 맛집
    Axios.get(friendUrl)
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length - 1; i++) {
          friendLatitude.push(res.data[i].latitude_x);
          friendLongitude.push(res.data[i].longitude_y);
          friendPlaceName.push(res.data[i].name);
          friendPlaceAddress.push(res.data[i].address);
          friendSubject.push(res.data[i].subject);
          friendContent.push(res.data[i].content);
          friendRating.push(res.data[i].rating);
          friendFrontImg.push(res.data[i].front_image);
          friendUPId.push(res.data[i].user_place_id);
          friendUserId.push(res.data[i].user_id);
          friendPinUrl.push(res.data[i].pin_url);
        }
      })
      .catch((err) => {
        console.log(err);
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
        // 나의 맛집 표시핀
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

        // 이미지 태그 제거
        let imgTag = /<IMG(.*?)>/gi;

        // 친구맛집 표시할 마커들
        let friendMarker = [];
        // 친구의 맛집 표시 핀
        let FriendimageSrc;
        let FriendimageSize;
        let FriendimageOption;
        let FriendPageBtn = [];
        let FriendCloseTag = [];
        let FriendContent = [];
        for (let i = 0; i < friendUserId.length; i++) {
          FriendimageSrc = friendPinUrl[i];
          // FriendimageSrc =
          //   "https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png";
          FriendimageSize = new kakao.maps.Size(64, 69);
          FriendimageOption = { offset: new kakao.maps.Point(27, 69) };
          // 마커 이미지 생성
          let markerImage = new kakao.maps.MarkerImage(
              FriendimageSrc,
              FriendimageSize,
              FriendimageOption
            ),
            markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

          friendMarker[i] = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              friendLatitude[i],
              friendLongitude[i]
            ),
            image: markerImage,
          });
          // 마커가 지도 위에 표시되도록 설정합니다
          friendMarker[i].setMap(createmap);
          /*
           * 오버레이에 들어갈 내용 만들기
           */
          // 이미지와 내용이 들어가는 오버레이
          FriendPageBtn[i] = document.createElement("div");
          FriendPageBtn[i].setAttribute("className", "page");
          // 닫기버튼 오버레이
          FriendCloseTag[i] = document.createElement("div");
          FriendCloseTag[i].insertAdjacentHTML(
            "afterbegin",
            '<div class="wrapTitle"><div class="infoTitle"><div class="title2">' +
              friendPlaceName[i] +
              '<div class="close" title="닫기"></div></div></div></div>'
          );

          document.body.appendChild(FriendPageBtn[i]);

          FriendPageBtn[i].setAttribute("style", "width: 10px; height: 10px;");
          FriendContent[i] =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            "        </div>" +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="' +
            friendFrontImg[i] +
            '" width="73px" height="70px">' +
            "           </div>" +
            '            <div class="desc">' +
            '                <div class="ellipsis">' +
            friendSubject[i] +
            "</span>" +
            "</div>" +
            '                <div class="jibun ellipsis">' +
            friendContent[i].replace(imgTag, "").substring(0, 15) +
            "</div>" +
            '                <span title="리뷰글로 이동" class="moreBtn">...더보기</span>' +
            "<span style='float: right; margin-bottom: 20px;'>평점: " +
            friendRating[i] +
            "점&nbsp;&nbsp;" +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>";
          let overlay = [];
          let overlay2 = [];

          FriendPageBtn[i].insertAdjacentHTML("afterbegin", FriendContent[i]);
          overlay[i] = new kakao.maps.CustomOverlay({
            content: FriendPageBtn[i],
            map: null,
            position: friendMarker[i].getPosition(),
          });
          overlay2[i] = new kakao.maps.CustomOverlay({
            content: FriendCloseTag[i],
            map: null,
            position: friendMarker[i].getPosition(),
            xAnchor: 0.3,
            yAnchor: 0.91,
          });

          /*
           * 오버레이를 클릭했을때 리뷰 페이지로 이동
           */
          FriendPageBtn[i].onclick = () => {
            //overlay[i].setMap(null);
            props.history.push(`/mechelin/review/${myUPId[i]}`);
          };

          /*
           * 오버레이2를 클릭했을때 오버레이 삭제
           */
          FriendCloseTag[i].onclick = () => {
            overlay[i].setMap(null);
            overlay2[i].setMap(null);
          };

          //마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(friendMarker[i], "click", function () {
            // 오버레이 표시
            overlay[i].setMap(createmap);
            // 닫기버튼 오버레이 표시
            overlay2[i].setMap(createmap);

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

        // 마커를 생성합니다
        // let marker = new kakao.maps.Marker({
        //   position: markerPosition,
        //   image: markerImage, // 마커이미지 설정
        // });
        let marker = [];
        let content = [];
        let pageBtn = [];
        let closeTag = [];

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
          /*
           * 오버레이에 들어갈 내용 만들기
           */
          // 이미지와 내용이 들어가는 오버레이
          pageBtn[i] = document.createElement("div");
          pageBtn[i].setAttribute("className", "page");
          // 닫기버튼 오버레이
          closeTag[i] = document.createElement("div");
          closeTag[i].insertAdjacentHTML(
            "afterbegin",
            '<div class="wrapTitle"><div class="infoTitle"><div class="title2">' +
              myPlaceName[i] +
              '<div class="close" title="닫기"></div></div></div></div>'
          );

          document.body.appendChild(pageBtn[i]);

          pageBtn[i].setAttribute("style", "width: 10px; height: 10px;");
          content[i] =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
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
            "</span>" +
            "</div>" +
            '                <div class="jibun ellipsis">' +
            myContent[i].replace(imgTag, "").substring(0, 15) +
            "</div>" +
            '                <span title="리뷰글로 이동" class="moreBtn">...더보기</span>' +
            "<span style='float: right; margin-bottom: 20px;'>평점: " +
            myRating[i] +
            "점&nbsp;&nbsp;" +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        }

        /*
         * 친구들의 맛집 출력
         */
        for (let i = 0; i < friendPlaceName.length; i++) {}

        // 커스텀 오버레이에 표시할 컨텐츠 입니다
        // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
        // 별도의 이벤트 메소드를 제공하지 않습니다

        //setpageBtn(document.createElement("div"));

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다

        let overlay = [];
        let overlay2 = [];
        for (let i = 0; i < myPlaceName.length; i++) {
          pageBtn[i].insertAdjacentHTML("afterbegin", content[i]);
          overlay[i] = new kakao.maps.CustomOverlay({
            content: pageBtn[i],
            map: null,
            position: marker[i].getPosition(),
          });
          overlay2[i] = new kakao.maps.CustomOverlay({
            content: closeTag[i],
            map: null,
            position: marker[i].getPosition(),
            xAnchor: 0.3,
            yAnchor: 0.91,
          });

          /*
           * 오버레이를 클릭했을때 리뷰 페이지로 이동
           */
          pageBtn[i].onclick = () => {
            //overlay[i].setMap(null);
            props.history.push(`/mechelin/review/${myUPId[i]}`);
          };

          /*
           * 오버레이2를 클릭했을때 오버레이 삭제
           */
          closeTag[i].onclick = () => {
            overlay[i].setMap(null);
            overlay2[i].setMap(null);
          };

          //마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker[i], "click", function () {
            // 오버레이 표시
            overlay[i].setMap(createmap);
            // 닫기버튼 오버레이 표시
            overlay2[i].setMap(createmap);

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
      });
    };
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
