/*global kakao*/
import React, { useEffect, useState } from "react";

const MyMarker = (props) => {
  const [render, setRender] = useState([]);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4472c6938cce6e1016fcfd20f0c079e3&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        //setMap(props.createmap);
        // 나의 맛집 표시핀
        let imageSrc = props.myPinUrl[0], // 마커이미지의 주소입니다
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

        let marker = [];
        let content = [];
        let pageBtn = [];
        let closeTag = [];

        /*
         * 지도의 나의 맛집 출력
         */
        for (let i = 0; i < props.myPlaceName.length; i++) {
          marker[i] = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              props.myLatitude[i],
              props.myLongitude[i]
            ),
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
              props.myPlaceName[i] +
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
            props.myFrontImg[i] +
            '" width="73px" height="70px">' +
            "           </div>" +
            '            <div class="desc">' +
            '                <div class="ellipsis">' +
            props.mySubject[i] +
            "</span>" +
            "</div>" +
            '                <div class="jibun ellipsis">' +
            props.myContent[i].replace(imgTag, "").substring(0, 15) +
            "</div>" +
            '                <span title="리뷰글로 이동" class="moreBtn">...더보기</span>' +
            "<span style='float: right; margin-bottom: 20px;'>평점: " +
            props.myRating[i] +
            "점&nbsp;&nbsp;" +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        }

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다

        let overlay = [];
        let overlay2 = [];
        for (let i = 0; i < props.myPlaceName.length; i++) {
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
            props.history.push(`/mechelin/review/${props.myUPId[i]}`);
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
            overlay[i].setMap(props.createmap);
            // 닫기버튼 오버레이 표시
            overlay2[i].setMap(props.createmap);
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          render.push(marker[i].setMap(props.createmap));
        }
      });
    };
  }, []);
  return <div>{render}</div>;
};

export default MyMarker;
