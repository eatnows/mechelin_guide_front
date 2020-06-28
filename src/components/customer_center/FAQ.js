import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { Collapse } from "antd";

const { Panel } = Collapse;

const FAQComponent = () => {
  return (
    <div>
      <h1>FAQ</h1>
      <Collapse accordion>
        <Panel header="내슐랭 가이드는 무료인가요?" key="1">
          <p>네 맞습니다. 내슐랭 가이드는 무료로 즐기실 수 있습니다.</p>
        </Panel>
        <Panel header="친구 등록을 하려면 어떻게 해야하나요?" key="2">
          <p>
            친구등록을 하시려면 메인 메뉴에 있는 친구등록 버튼을 이용하여
            상대방의 이메일을 기입하시거나 상대방의 타임라인으로 페이지
            이동하셔서 친구신청 버튼을 누르셔야합니다.
          </p>
        </Panel>
        <Panel header="맛집 정보가 잘못되었어요!" key="3">
          <p>
            맛집에 정보가 틀리다면 고객센터에 맛집수정 요청 게시판으로 문의를
            주시면 확인 후 수정하겠습니다.
          </p>
        </Panel>
        <Panel header="내슐랭 가이드는 어떤 사이트인가요?" key="4">
          <p>
            나만의 맛집을 저장하고, 그때의 추억을 간직하는 일종의 다이어리와
            같은 서비스를 제공하고 있습니다. 나와 친한 특정 인물들과 맛집을
            공유할 수도 있습니다.
          </p>
        </Panel>
        <Panel header="회원탈퇴는 어떻게 하나요?" key="5">
          <p>
            회원 탈퇴에 경우 회원정 보수정 페이지에서 회원 탈퇴 버튼을 클릭하면
            하실 수 있습니다. 탈퇴 신청 후 한 달간 유예기간이 있으며, 개인 정보
            약관에 의해 3년 동안 개인 정보를 수집하고 있습니다.
          </p>
        </Panel>
        <Panel header="맛집과 상관없는 사진을 올려도 되나요?" key="6">
          <p>
            내슐랭 가이드는 기본적으로 나만의 맛집에 관한 포스팅을 권장하고
            있습니다. 맛집, 음식과 관련 없는 리뷰글을 작성 시 게시글 삭제와 같은
            제재를 받으실 수 있다는 점 안내드립니다.
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};
export default FAQComponent;
