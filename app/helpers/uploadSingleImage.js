import { notification } from "antd";
import { uploadSingleFile } from "./backend";

const uploadSingleImage = async (
    files,
    file_name
) => {
    const url = [];
    if (files?.length > 0) {
        for (let i = 0; i < files.length; i++) {
            //check if file is already uploaded
            if (files[i].url) {
                url.push(files[i].url);
                continue;
            }
            const payload = { file: files[i].originFileObj, file_name: file_name };
            try {
                let {data, success, message, errorMessage} = await uploadSingleFile(payload);
                if(success){
                    notification.success({message: message || "File uploaded successfully"})
                    url.push(data?.data);
                }else{
                    notification.error({message: errorMessage || "Something went wrong!"})
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    return url;
};

export default uploadSingleImage;
