import { Button, Form, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAction } from "../../helpers/hooks";
import { deleteFile } from "../../helpers/backend";
import { useI18n } from "../../contexts/i18n";

const singleImageInput = (props) => {
  let max = props.max || 1;
  let name = props.name || "image";
  let label = props.label;
  let onChange = props.onChange;
  let listType = props.listType || "file-image";
  const i18n = useI18n()
  return (
    <div >
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: props?.required,
            message: `${i18n?.t('Please upload')} ${!!label ? label : `${i18n?.t("an image")}`}`,
          },
        ]}
        className="single-image"
      >
        <Input max={max} listType={listType} onChange={onChange}/>
      </Form.Item>
    </div>
  );
};

export default singleImageInput;

const Input = ({ value, onChange, listType, max, noWebp, pdf }) => {
  const i18n = useI18n()
  const handleChange = ({ fileList }) => {
    if (fileList.length < (value?.length || 0)) {
      // Find the removed file
      const removedFile = value.find(file => !fileList.includes(file));
      if (removedFile) {
        useAction(
          deleteFile,
          { file: removedFile?.url },
        );
      }
    }

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
        accept={`image/png, image/gif, image/jpeg, ${!noWebp && "image/webp"}`}
        listType={listType}
        fileList={value || []}
        onChange={handleChange}
        maxCount={max}
        customRequest={customUpload}
        style={{width: "100%"}}
      >
        {(value?.length || 0) < max && <Button style={{height: "42px", width: "100%"}} icon={<UploadOutlined />}>{i18n?.t('Upload Image')}</Button> }
        
      </Upload>
    </>
  );
};
