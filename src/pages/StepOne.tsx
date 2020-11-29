import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "../store";
import { ArrowRightOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function StepOne() {
  // const setStepOne = useStoreActions((actions) => actions.abcs.setStepOne);
  const fetchData = useStoreActions((actions) => actions.abcs.fetchData);
  const data = useStoreState((state) => state.abcs.data);
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const onFinish = (values: any) => {
    // setStepOne(values);
    history.push("/secondstep");
  };
  console.log(data);

  return (
    <>
      {/* <Helmet>
        <title>Step One</title>
        <meta name="description" content="First Step" />
      </Helmet>

      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item
          name={"projectName"}
          label="Project Name"
          rules={[
            { required: true, message: "Please write project name" },
            {
              max: 50,
              message: "Project name cannot be more than 50 characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"projectDescription"}
          label="Project Description"
          rules={[
            { required: true, message: "Please write project description" },
            {
              max: 255,
              message: "Project description cannot be more than 255 characters",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={"client"}
          label="Client"
          rules={[
            { required: true, message: "Please write client name" },
            {
              max: 50,
              message: "Client name cannot be more than 50 characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"contractor"}
          label="Contractor"
          rules={[
            { required: true, message: "Please write contractor name" },
            {
              max: 50,
              message: "Contractor name cannot be more than 50 characters",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{float:"right"}}>
          <Button type="primary" htmlType="submit">
          <ArrowRightOutlined /> Next
          </Button>
        </Form.Item>
      </Form> */}
    </>
  );
}
