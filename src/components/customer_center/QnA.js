import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Mentions, Form, Button, Modal, Collapse } from "antd";
import Axios from "util/axios";

const { Option, getMentions } = Mentions;

const QnAComponent = () => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;
  const [result, setResult] = useState([]);
  const [render, setRender] = useState(0);

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    const url = `/ask/askdata?user_id=${sessionStorage.getItem("userId")}`;
    Axios.get(url)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submit:", values);
      console.log(values.subject);
      const url = `/ask/add`;
      Axios.post(url, {
        user_id: sessionStorage.getItem("userId"),
        subject: values.subject,
        content: values.content,
      })
        .then((res) => {
          // console.log(res.data);
          // console.log(form.setFields.subject);
          success();
          form.resetFields();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (errInfo) {
      console.log("Error:", errInfo);
    }
  };

  function success() {
    Modal.success({
      content: "문의 신청이 완료되었습니다.",
    });
    setRender(render + 1);
  }

  const checkMention = async (rule, value, callback) => {
    const mentions = getMentions(value);
  };
  function callback(key) {
    console.log(key);
  }

  return (
    <div>
      {" "}
      <caption
        style={{
          fontWeight: "bold",
          fontSize: "1.5vw",
          width: "10vw",
          marginBottom: "1.3vw",
          backgroundColor: "white",
          color: "rgba(245,145,45)",
        }}
      >
        1:1 문의하기
      </caption>
      <div
        style={{
          width: "50vw",
          padding: "1vw 0",
          textAlign: "center",
        }}
      >
        <Form form={form} layout="horizontal" onFinish={onFinish}>
          {" "}
          <Form.Item
            name="subject"
            label="제목"
            style={{ textAlign: "left" }}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            rules={[
              {
                validator: checkMention,
              },
            ]}
          >
            <Mentions rows="1">
              <Option value="afc163">afc163</Option>
              <Option value="zombieJ">zombieJ</Option>
              <Option value="yesmeck">yesmeck</Option>
            </Mentions>
          </Form.Item>
          <Form.Item
            name="content"
            label="문의 내용"
            style={{ textAlign: "left" }}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Mentions rows="3" placeholder="문의 내용을 자세히 기입해주세요">
              <Option value="afc163">afc163</Option>
              <Option value="zombieJ">zombieJ</Option>
              <Option value="yesmeck">yesmeck</Option>
            </Mentions>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 14,
              offset: 6,
            }}
          >
            <Button htmlType="submit" type="primary">
              전송
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              취소
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: "50vw" }}>
        <caption
          style={{
            fontWeight: "bold",
            fontSize: "1.5vw",
            width: "40vw",
            marginBottom: "1.3vw",
            backgroundColor: "white",
            color: "rgba(245,145,45)",
          }}
        >
          내가 한 문의 내역
        </caption>
        <Collapse onChange={callback} style={{ marginBottom: "3vw" }}>
          {result.map((contact, i) => {
            return (
              <Panel header={contact.subject} key={i}>
                <p>{contact.content}</p>
                <Collapse defaultActiveKey={i}>
                  <Panel header="답변" key={i}>
                    <p>{contact.reply}</p>
                  </Panel>
                </Collapse>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};

export default QnAComponent;
