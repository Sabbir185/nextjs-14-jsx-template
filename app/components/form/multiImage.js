import { Form, Upload, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useAction, useActionConfirm } from "../../helpers/hooks";
import { deleteFile } from "../../helpers/backend";
import { useI18n } from "../../contexts/i18n";

//File Input Component
const MultipleImageInput = (props) => {
  let max = props.max || 1;
  let name = props.name || "img";
  let label = props.label;
  let onChange = props.onChange;
  let listType = props.listType || "picture-card";

  const i18n = useI18n()

  return (
    <div className="form-group">
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: props?.required,
            message: `${i18n?.t('Please upload')} ${!!label ? label : i18n?.t("an image")}`,
          },
        ]}
      >
        <Input
          max={max}
          listType={listType}
          pdf={props?.pdf}
          noWebp={props?.noWebp}
          onChange={onChange}
        />
      </Form.Item>
    </div>
  );
};

const Input = ({ value, onChange, listType, max, noWebp, pdf }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    if (max > 1) {
      const removedFiles = (value || []).filter(file => !fileList.includes(file));
  
  // Delete removed files
    removedFiles.forEach(removedFile => {
      if (removedFile.url) {
        // Perform delete action only for files with URLs (not local previews)
        useAction(deleteFile, { file: removedFile.url });
      }
    });

    } else {
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

    }

    onChange(fileList);
  };

  return (
    <>
      <Upload
        accept={`image/png, image/gif, image/jpeg, ${!noWebp && "image/webp"}${pdf ? ", application/pdf" : ""
          }`}
        listType={listType}
        onPreview={handlePreview}
        fileList={value || []}
        onChange={handleChange}
        maxCount={max}
      >
        {(value?.length || 0) < max && "+ upload"}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancel}
        title={"Preview"}
      >
        {previewImage.endsWith(".pdf") ? (
          <embed
            src={previewImage}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        )}
      </Modal>
    </>
  );
};

export default MultipleImageInput;

// Utility function to convert file to base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
