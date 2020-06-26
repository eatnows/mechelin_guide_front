/*global kakao*/
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MainMapStyle.css";
import Axios from "util/axios";

//let closeBtn;
let createmap;
const MainMap = (props) => {
  const [latitude, setLatitude] = useState(37.49879629938368);
  const [longitude, setLongitude] = useState(127.03168720284643);
  const [map, setMap] = useState("");
  const [overlay, setOverlay] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
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
  const [myPinUrl, setMyPinUrl] = useState([]);
  const [myUserId, setMyUserId] = useState([]);
  const [myCategory, setMyCategory] = useState([]);
  const useTest = useRef();
  const [isOpen, setIsOpen] = useState(true);
  const [markers, setMarkers] = useState([]);
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
  const [friendMarkers, setFriendMarkers] = useState([]);
  // 마커에서 맛집 정보 출력할때 필요한 변수들
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [postCount, setPostCount] = useState("");
  const [placeName, setPlaceName] = useState("");
  // 리뷰글로 넘어갈때 필요한 변수
  const [UPId, setUPid] = useState("");

  const [category, setCategory] = useState(["한식", "양식", "중식", "일식"]);
  //const [closeBtn, setCloseBtn] = useState();
  //const [myFilterRender, setMyFilterRender] = useState(true);
  useEffect(() => {
    console.log(props.categoryFilter.koreanFilter);
    //setMyFilterRender(props.MyFilter);
  }, [props.MyFilter, props.FriendFilter, props.categoryFilter]);

  useEffect(() => {
    const url = `/place/allplace?user_id=${sessionStorage.getItem("userId")}`;
    const friendUrl = `/place/friendsplace?user_id=${sessionStorage.getItem(
      "userId"
    )}`;
    setUserId(sessionStorage.getItem("userId"));
    /*
     * 나의 맛집 정보를 받는 RESTful API
     */

    Axios.get(url)
      .then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data);
          myLatitude.push(response.data[i].latitude_x);
          myLongitude.push(response.data[i].longitude_y);
          myPlaceName.push(response.data[i].name);
          myPlaceAddress.push(response.data[i].address);
          myUPId.push(response.data[i].user_place_id);
          mySubject.push(response.data[i].subject);
          myContent.push(response.data[i].content);
          myRating.push(response.data[i].rating);
          myFrontImg.push(response.data[i].front_image);
          myPinUrl.push(response.data[i].pin_url);
          myUserId.push(response.data[i].user_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    /*
     * 친구들의 맛집 정보를 받는 RESTful API
     */

    // Axios.get(friendUrl)
    //   .then((res) => {
    //     for (let i = 0; i < res.data.length; i++) {
    //       friendLatitude.push(res.data[i].latitude_x);
    //       friendLongitude.push(res.data[i].longitude_y);
    //       friendPlaceName.push(res.data[i].name);
    //       friendPlaceAddress.push(res.data[i].address);
    //       friendSubject.push(res.data[i].subject);
    //       friendContent.push(res.data[i].content);
    //       friendRating.push(res.data[i].rating);
    //       friendFrontImg.push(res.data[i].front_image);
    //       friendUPId.push(res.data[i].user_place_id);
    //       friendUserId.push(res.data[i].user_id);
    //       friendPinUrl.push(res.data[i].pin_url);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        createmap = new kakao.maps.Map(mapContainer, mapOption);
      });
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4472c6938cce6e1016fcfd20f0c079e3&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        /*
         * 기존의 내 맛집 마커를 삭제
         */

        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        /*
         * 기존의 친구 맛집 마커를 삭제
         */
        // for (let i = 0; i < friendMarkers.length; i++) {
        //   friendMarkers[i].setMap(null);
        // }

        setMap(createmap);
        // // 나의 맛집 표시핀
        // let imageSrc = myPinUrl[0], // 마커이미지의 주소입니다
        //   // 마커이미지의 크기입니다
        //   imageSize = new kakao.maps.Size(64, 69),
        //   // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        //   imageOption = { offset: new kakao.maps.Point(27, 69) };

        // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        // let markerImage = new kakao.maps.MarkerImage(
        //     imageSrc,
        //     imageSize,
        //     imageOption
        //   ),
        //   markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

        // 이미지 태그 제거
        let imgTag = /<IMG(.*?)>/gi;

        let marker = [];
        let content = [];
        let pageBtn = [];
        let closeTag = [];
        /*
         * 지도의 나의 맛집 출력
         */
        for (let i = 0; i < myPlaceName.length; i++) {
          // 나의 맛집 표시핀
          let imageSrc = myPinUrl[i], // 마커이미지의 주소입니다
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

          marker[i] = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(myLatitude[i], myLongitude[i]),
            image: markerImage,
          });

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

          // 마커 위에 커스텀오버레이를 표시합니다
          // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다

          let overlay = [];
          let overlay2 = [];

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
          console.log(myUserId);

          //마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker[i], "click", function () {
            // 오버레이 표시
            overlay[i].setMap(createmap);
            // 닫기버튼 오버레이 표시
            overlay2[i].setMap(createmap);
          });

          setTimeout(() => {
            for (let j = 0; j < category.length; j++) {
              if (categoryFilter(myCategory[i])) {
                marker[i].setMap(createmap);
                markers.push(marker[i]);
              }
            }
            if (userIdFilter(myUserId[i])) {
              // 마커가 지도 위에 표시되도록 설정합니다
              marker[i].setMap(createmap);
              markers.push(marker[i]);
            }
          }, 5);
        }
      });
    };
  }, [props.MyFilter, props.FriendFilter]);
  const userIdFilter = (allUserId) => {
    return (
      (props.MyFilter && userId === allUserId.toString()) ||
      (props.FriendFilter && userId !== allUserId.toString())
    );
  };
  const categoryFilter = (food) => {
    return (
      (props.categoryFilter.koreanFilter && food === "한식") ||
      (props.categoryFilter.westernFilter && food === "양식") ||
      (props.categoryFilter.chineseFilter && food === "중식") ||
      (props.categoryFilter.japaneseFilter && food === "일식")
    );
  };

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
