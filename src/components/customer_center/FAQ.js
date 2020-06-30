import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Collapse } from "antd";

const { Panel } = Collapse;

const FAQComponent = () => {
  return (
    <div>
      <h1 style={{ color: "rgba(0, 0, 0, 0.5)" }}>FAQ</h1>
      <Collapse accordion>
        <Panel header="내슐랭 가이드는 어떤 사이트인가요?" key="1">
          <p>
            <b>나만의 맛집</b>을 저장하고, 그때의 추억을 간직하는 일종의
            다이어리와 같은 서비스입니다. <br />
            또, 나의 친구들과 <b>맛집을 공유</b>할 수도 있습니다.
          </p>
        </Panel>
        <Panel header="내슐랭 가이드는 무료인가요?" key="2">
          <p>
            네, 맞습니다. <br />
            내슐랭 가이드는 <b>무료</b>로 이용하실 수 있습니다.
          </p>
        </Panel>
        <Panel header="맛집과 상관없는 글을 올려도 되나요?" key="3">
          <p>
            내슐랭 가이드는 기본적으로 나만의 맛집에 관한 포스팅을 권장하고
            있습니다. <br />
            맛집, 음식과 관련 없는 리뷰 작성 시 게시글 삭제와 같은 제재를 받으실
            수 있다는 점 안내드립니다.
          </p>
        </Panel>
        <Panel header="친구 등록을 하려면 어떻게 해야 하나요?" key="4">
          <p>
            친구 등록을 하시려면 <b>메인 메뉴</b>에 있는 <b>친구 등록 버튼</b>을
            누른 뒤 상대방의 <b>이메일을 입력</b>하시거나, <br />
            상대방의 <b>타임라인</b>으로 페이지 이동한 후에{" "}
            <b>친구 신청 버튼</b>을 이용하시면 됩니다.
          </p>
        </Panel>
        <Panel header="맛집 정보가 잘못되었어요!" key="5">
          <p>
            맛집의 정보가 틀릴 경우, 고객센터의 <b>맛집 수정 요청 게시판</b>으로
            문의를 주시면 확인 후 수정하도록 하겠습니다.
          </p>
        </Panel>
        <Panel header="회원탈퇴는 어떻게 하나요?" key="6">
          <p>
            회원 정보 수정 페이지에서 회원 탈퇴 버튼을 클릭하면 탈퇴하실 수
            있습니다.
            <br /> 탈퇴 신청 후 한 달간의 유예 기간이 있으며, 개인 정보 약관에
            의해 3년 동안 개인 정보를 수집하고 있습니다.
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};
export default FAQComponent;
