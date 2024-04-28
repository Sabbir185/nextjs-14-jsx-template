import { Button, Form, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

const UploadVideo = (props) => {
  let max = props.max || 1;
  let name = props.name || "video";
  let label = props.label;
  let listType = props.listType || "video-card";
  return (
    <div >
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: props?.required,
            message: `Please upload ${!!label ? label : "a video"}`,
          },
        ]}
      >
        <Input max={max} listType={listType} />
      </Form.Item>
    </div>
  );
};

export default UploadVideo;

const Input = ({ value, onChange, listType, max, noWebp, pdf }) => {
  

  const handleChange = ({ fileList }) => {
    onChange(fileList);
  };
  const customUpload = async ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  return (
    <>
      <Upload
        accept="video/*"
        listType={listType}
        fileList={value || []}
        onChange={handleChange}
        maxCount={max}
        customRequest={customUpload}
      >
        {(value?.length || 0) < max && <Button icon={<UploadOutlined />}>Upload Video</Button>}
      </Upload>
    </>
  );
};
