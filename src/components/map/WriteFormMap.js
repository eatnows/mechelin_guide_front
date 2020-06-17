/*global kakao*/
import React, { useState, useEffect, createRef } from "react";
import "./WriteFormMapStyle.css";
import LocationIcon from "images/location-02.png";
import Axios from "axios";

const WriteFormMap2 = (props) => {
  const [latitude, setLatitude] = useState(37.505002);
  const [longitude, setLongitude] = useState(127.033617);
  const [keyword, setKeyword] = useState("");
  const [ps, setPs] = useState("");
  const [infowindow, setInfoWindow] = useState("");
  const [map, setMap] = useState("");
  const [markers, setMarkers] = useState([]);
  const [clickMarkers, setClickmarkers] = useState([]);
  const [script, setScript] = useState("");
  const [addPlaceName, setaddPlaceName] = useState(() => createRef());
  const [placeName, setPlaceName] = useState("");
  const [moveLatLon, setMoveLatLon] = useState("");
  const [geoCoder, setGeoCoder] = useState("");
  const [content, setContent] = useState("");
  const [mouseLatlng, setMouseLatlng] = useState("");
  const [address, setAddress] = useState("");
  const [latitudeX, setLatitudeX] = useState("");
  const [longitudeY, setLongitudeY] = useState("");
  const [xx, setXx] = useState([]);
  const [yy, setYy] = useState([]);
  const [place_Name, setPlace_Name] = useState([]);
  const [road_Address_Name, setRoad_Address_Name] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    //let latitude = 37.505002;
    //let longitude = 127.033617;
    /*
      GPS 받아오는 메소드
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
    getLocation();

    /*
     * 지도 받아오는 메소드
     */

    const script = document.createElement("script");
    setScript(script);
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
        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        setInfoWindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
        // 장소 검색 객체를 생성합니다
        setPs(new kakao.maps.services.Places());

        // 주소-좌표 변환 객체를 생성합니다
        setGeoCoder(new kakao.maps.services.Geocoder());

        // 지도를 클릭한 위치에 표출할 마커입니다
        // 지도 중심좌표에 마커를 생성합니다
        setClickmarkers(
          new kakao.maps.Marker({
            position: createmap.getCenter(),
          })
        );
      });
    };
  }, []);
  /*
   * 클릭하면 핀 생성되는 메소드
   * 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
   */
  const clickMap = () => {
    script.onload = (() => {
      kakao.maps.load(() => {
        kakao.maps.event.addListener(map, "click", function clickEvent(
          mouseEvent
        ) {
          searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
            setLatitudeX(mouseEvent.latLng.Ha);
            setLongitudeY(mouseEvent.latLng.Ga);
            setPlaceName("");
            if (status === kakao.maps.services.Status.OK) {
              let detailAddr = !!result[0].road_address
                ? "<div>도로명주소 : " +
                  result[0].road_address.address_name +
                  "</div>"
                : "";
              detailAddr +=
                "<div>지번 주소 : " + result[0].address.address_name + "</div>";

              if (!!result[0].road_address) {
                setAddress(result[0].road_address.address_name);
              } else {
                setAddress(result[0].address.address_name);
              }

              let content = '<div class="bAddr">' + detailAddr + "</div>";

              // 마커를 클릭한 위치에 표시합니다
              clickMarkers.setPosition(mouseEvent.latLng);
              clickMarkers.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, clickMarkers);

              // 지도를 클릭했을때 좌표값으로 DB에 근처 맛집 출력
              const url = `http://localhost:9000/mechelin/place/around/place?x=${mouseEvent.latLng.Ha}&y=${mouseEvent.latLng.Ga}`;
              Axios.get(url)
                .then((res) => {
                  setDbData(res.data);
                  if (res.data.length !== 0) {
                    setVisible(true);
                  } else {
                    setVisible(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
          //add한 이벤트 리스너 삭제
          kakao.maps.event.removeListener(map, "click", clickEvent);
        });
      });
    })();
  };
  /*
   * 좌표로 주소 요청
   */
  const searchDetailAddrFromCoords = (coords, callback) => {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geoCoder.coord2Address(coords.getLng(), coords.getLat(), callback);
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
  /*
   * 키워드 검색 완료 시 호출되는 콜백함수 입니다
   */
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
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

  // 키워드 검색을 요청하는 함수입니다
  const searchPlaces = () => {
    var keyword = document.getElementById("keyword").value;

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
  };

  const displayPlaces = (places) => {
    let listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(),
      bounds = new kakao.maps.LatLngBounds(),
      listStr = "";

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
      let placesX = places[i].y;
      let placesY = places[i].x;
      let placesAddress = places[i].road_address_name;
      let placesName = places[i].place_name;
      xx.push({ placesX });
      setXx([...xx, placesX]);
      yy.push({ placesY });
      setYy([...yy, placesY]);

      road_Address_Name.push({ placesAddress });
      setRoad_Address_Name([...road_Address_Name, placesAddress]);
      place_Name.push({ placesName });
      setPlace_Name([...place_Name, placesName]);
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);
      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      ((marker, title) => {
        kakao.maps.event.addListener(marker, "mouseover", () => {
          displayInfowindow(marker, title);
        });

        kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close();
        });
        itemEl.onmouseover = () => {
          displayInfowindow(marker, title);
          for (let j = 0; j < xx.length; j++) {
            if (place_Name[j].placesName === title) {
              setMoveLatLon(
                new kakao.maps.LatLng(xx[j].placesX, yy[j].placesY)
              );
            }
          }

          // 지도 중심을 부드럽게 이동시킵니다
          // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        };

        itemEl.onclick = () => {
          clickMarkers.setMap(null);
          setVisible(false);
          for (let j = 0; j < xx.length; j++) {
            if (place_Name[j].placesName === title) {
              setLatitudeX(xx[j].placesX);
              setLongitudeY(yy[j].placesY);
              setPlaceName(place_Name[j].placesName);
              setAddress(road_Address_Name[j].placesAddress);
              map.panTo(moveLatLon);
            }
          }
        };

        itemEl.onmouseout = () => {
          infowindow.close();
        };
      })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };

  const getListItem = (index, places) => {
    var el = document.createElement("li"),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

    if (places.road_address_name) {
      itemStr +=
        "    <span>" +
        places.road_address_name +
        "</span>" +
        '   <span class="jibun gray">' +
        places.address_name +
        "</span>";
    } else {
      itemStr += "    <span>" + places.address_name + "</span>";
    }

    itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

    document.body.appendChild(el);
    el.innerHTML = itemStr;
    el.className = "item";
    return el;
  };

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  const addMarker = (position, idx, title) => {
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  const removeMarker = () => {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  const displayPagination = (pagination) => {
    var paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = ((i) => {
          return () => {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  };

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  const displayInfowindow = (marker, title) => {
    let content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  const searchBtn = () => {
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);
    setKeyword("");
  };

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  const removeAllChildNods = (el) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  /*
   * 상호명 입력칸
   */
  const onChangeName = (e) => {
    let name = e.target.value;
    setPlaceName(name);
  };
  /*
   * 상호명 입력 버튼
   */
  const onClickName = () => {
    // 부모 컴포넌트에 값을 넘겨줄때 사용하자
    props.mapData(latitudeX, longitudeY, placeName, address);
  };
  /*
   * 상호명 입력 칸 취소 버튼
   */
  const onClickCancle = () => {
    setLatitudeX("");
    setLongitudeY("");
    setAddress("");
    setPlaceName("");
  };
  /*
   * 근처 맛집 리스트를 누를때 실행되는 메소드
   */
  const onClickDbList = (e) => {
    setLatitudeX(e.target.getAttribute("x"));
    setLongitudeY(e.target.getAttribute("y"));
    setPlaceName(e.target.getAttribute("name"));
    setAddress(e.target.getAttribute("address"));
    setVisible(false);
  };

  /*
   * sumit 버튼
   */
  const onSubmitBtn = (e) => {
    e.preventDefault();
    // 키워드로 장소를 검색합니다
    searchPlaces();
  };
  return (
    <div className="map_wrap">
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: " hidden",
        }}
        onMouseDown={clickMap}
      ></div>
      <div
        style={{
          width: "220px",
          height: "130px",
          position: "absolute",
          right: "0",
          bottom: "0",
          zIndex: "1",
          margin: "10px 10px 230px 0",
          padding: "5px",
          opacity: "0.9",
          overflow: "auto",
          display: visible ? "block" : "none",
        }}
        className="bg_white"
      >
        <p style={{ fontSize: "1.5em", textAlign: "center" }}>근처 맛집</p>
        <br />
        <ul id="dbDataList">
          {dbData.map((contact, i) => (
            <li
              key={i}
              className="dbDataList"
              name={contact.name}
              address={contact.address}
              x={contact.latitude_x}
              y={contact.longitude_y}
              style={{
                cursor: "pointer",
                width: "180px",
              }}
              onClick={onClickDbList}
            >
              {contact.name}
              <br />
              {contact.address}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <div
        id="gps"
        onClick={panTo}
        onMouseDown={panTo}
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          zIndex: "1",
          margin: "10px 10px 30px 0",
          padding: "5px",
          opacity: "0.8",
        }}
        className="bg_white"
      >
        <img src={LocationIcon} alt="" style={{ width: "20px" }} />
      </div>
      <div
        id="addPlaceName"
        style={{
          width: "220px",
          height: "130px",
          position: "absolute",
          right: "0",
          bottom: "0",
          zIndex: "1",
          margin: "10px 10px 30px 0",
          padding: "5px",
          opacity: "0.8",
        }}
        className="bg_white"
      >
        <p align="center" style={{ fontSize: "12pt" }}>
          맛집등록
        </p>
        상호명 :&nbsp;
        <br />
        <input
          type="text"
          name="placeName"
          ref={addPlaceName}
          onChange={onChangeName}
          value={placeName}
        />
        <br />
        주소 : <br />
        {address}
        <br />
        <div style={{ textAlign: "center" }}>
          <button type="button" onClick={onClickName}>
            확인
          </button>
          &nbsp;
          <button type="button" onClick={onClickCancle}>
            취소
          </button>
        </div>
      </div>
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form onSubmit={onSubmitBtn}>
              키워드 :{" "}
              <input
                type="text"
                id="keyword"
                size="15"
                placeholder="지역명, 키워드"
              />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default WriteFormMap2;
