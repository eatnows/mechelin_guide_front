/*global kakao*/
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./MainMapStyle.css";
import Axios from "util/axios";
import LocationIcon from "images/location-02.png";

//let closeBtn;
let createmap;
const MainMap = (props) => {
  const [latitude, setLatitude] = useState(37.49879629938368);
  const [longitude, setLongitude] = useState(127.03168720284643);
  const [map, setMap] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [moveLatLon, setMoveLatLon] = useState("");
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
  const [myBlackList, setMyBlackList] = useState([]);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // gps 받아오는 메소드 실행
    getLocation();
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
          myPinUrl.push(response.data[i].pin_url);
          myUserId.push(response.data[i].user_id);
          myCategory.push(response.data[i].category);
          myBlackList.push(response.data[i].blacklist);
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
          level: 5,
        };
        // 지도를 생성합니다
        createmap = new kakao.maps.Map(mapContainer, mapOption);

        setTimeout(() => {
          markerLoad();
        }, 50);
      });
    };
  }, []);

  const markerLoad = () => {
    /*
     * 기존의 맛집 마커를 삭제
     */
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMap(createmap);

    // 이미지 태그 제거
    // let imgTag = /<IMG(.*?)>/gi;
    let imgTag = /(<([^>]+)>)/gi;

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
        props.reivewPageMove(myUPId[i]);
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
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      if (
        userIdFilter(myUserId[i]) &&
        categoryFilter(myCategory[i]) &&
        myBlackList[i] === false
      ) {
        // 마커가 지도 위에 표시되도록 설정합니다
        marker[i].setMap(createmap);
        markers.push(marker[i]);
      }
      if (blacklistFilter(myUserId[i], myBlackList[i])) {
        // 마커가 지도 위에 표시되도록 설정합니다
        marker[i].setMap(createmap);
        markers.push(marker[i]);
      }
    }
  };

  /*
   *  GPS 받아오는 메소드
   */
  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //latitude = position.coords.latitude;
          //longitude = position.coords.longitude;
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

  /*
   * 좌표로 화면 부드럽게 이동
   */
  const panTo = () => {
    // 이동할 위도 경도 위치를 생성합니다
    setMoveLatLon(new kakao.maps.LatLng(latitude, longitude));

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다

    map.panTo(moveLatLon);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=본인앱키&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        /*
         * 기존의 맛집 마커를 삭제
         */
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        setMap(createmap);

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
          if (blacklistFilter(myUserId[i], myBlackList[i])) {
            imageSrc =
              "https://mechelinbucket.s3.ap-northeast-2.amazonaws.com/images/profle/blacklist_marker.png";
          }

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
            props.reivewPageMove(myUPId[i]);
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
          });

          setTimeout(() => {
            if (
              userIdFilter(myUserId[i]) &&
              categoryFilter(myCategory[i]) &&
              myBlackList[i] === false
            ) {
              // 마커가 지도 위에 표시되도록 설정합니다
              marker[i].setMap(createmap);
              markers.push(marker[i]);
            }
            if (blacklistFilter(myUserId[i], myBlackList[i])) {
              // 마커가 지도 위에 표시되도록 설정합니다
              marker[i].setMap(createmap);
              markers.push(marker[i]);
            }
          }, 50);
        }
      });
    };
  }, [
    props.MyFilter,
    props.FriendFilter,
    myPlaceName,
    props.categoryFilter,
    props.blacklistFilter,
  ]);
  const userIdFilter = (allUserId) => {
    return (
      (props.MyFilter && userId === allUserId.toString()) ||
      (props.FriendFilter && userId !== allUserId.toString())
    );
  };
  const categoryFilter = (food) => {
    let result = false;
    for (let i = 0; i < props.categoryFilter.length; i++) {
      if (props.categoryFilter[i] === food) {
        result = true;
      }
    }
    return result;
  };
  const blacklistFilter = (myUserId, blacklist) => {
    return (
      userId === myUserId.toString() &&
      blacklist === true &&
      props.blacklistFilter
    );
  };

  return (
    <div>
      <div
        id="map"
        style={{ width: "100%", height: "100vh", zIndex: "0" }}
      ></div>
      <div
        id="gps"
        onClick={panTo}
        onMouseDown={panTo}
        style={{
          width: "2.1vw",
          height: "2.1vw",
          position: "absolute",
          right: "1%",
          bottom: "2.5%",
          zIndex: "0.2",
          cursor: "pointer",
          padding: "0.3vw 0px 0px 0.31vw",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,.7)",
        }}
      >
        <img src={LocationIcon} alt="" style={{ width: "1.5vw" }} />
      </div>
    </div>
  );
};

export default MainMap;
