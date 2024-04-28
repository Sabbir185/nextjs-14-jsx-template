"use client";
import { Form, Modal, Spin, Tooltip } from 'antd';
import React, { useState } from 'react';
import { deleteVehicleCategory, fetchVehicleCategories, postVehicleCategory, updateVehicleCategory } from '../../../helpers/backend';
import PageTitle from '../../../components/common/title';
import { useAction, useFetch } from '../../../helpers/hooks';
import FormInput, { HiddenInput } from '../../../components/form/input';
import Button from '../../../components/common/button';
import Table, { TableImage } from '../../../components/common/table';
import uploadSingleImage from '../../../helpers/uploadSingleImage';
import MultipleImageInput from '../../../components/form/multiImage';

const Category = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [data, getData, { loading }] = useFetch(fetchVehicleCategories);
    const [isEdit, setIsEdit] = useState(false);
    const [imageUrl, setImageUrl] = useState("")
    const [imgLoading, setImgLoading] = useState(false)

    const handleImageUpload = async (image) => {
        setImgLoading(true)
        if (image[0]?.status !== "uploading") {
            let img = await uploadSingleImage(image, 'category');
            setImageUrl(img.length > 0 ? img[0] : "");
            setImgLoading(false)
        }
    }

    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (_, d) => (
                <div className="flex space-x-1">
                    <TableImage url={d?.image ? d?.image : "/images/no-image.png"} />
                </div>
            ),
        },
        { text: "Name", dataField: "name" },
        {
            text: "Description",
            dataField: "description",
            formatter: (d) => (
                d ? <>
                    {
                        <Tooltip title={d?.length > 30 ? d : ""}>
                            <span className="">
                                {d?.length > 30 ? d?.slice(0, 30) + "..." : d}
                            </span>
                        </Tooltip>
                    }
                </> : "N/A"
            ),
        },
    ];
    
    return (
        <div>
            <PageTitle title={"Categories"} />
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                action={
                    <Button
                        onClick={() => {
                            form.resetFields();
                            setOpen(true);
                            setIsEdit(false);
                        }}
                    >
                        {"Add New"}
                    </Button>
                }
                onEdit={(values) => {
                    setImageUrl(values?.image)
                    form.resetFields();
                    form.setFieldsValue({
                        ...values,
                        image:
                            values?.image && values?.image.length > 0
                                ? [
                                    {
                                        uid: "-1",
                                        name: "image.png",
                                        status: "done",
                                        url: values?.image,
                                    },
                                ]
                                : [],
                    });
                    setOpen(true);
                    setIsEdit(true);
                }}
                onDelete={deleteVehicleCategory}
                indexed
                pagination
            /> 

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={"Category Details"}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        if(values.image){
                            values.image = imageUrl;
                        }
                        return useAction(
                            values?._id ? updateVehicleCategory : postVehicleCategory,
                            {
                                ...values,
                            },
                            () => {
                                setOpen(false);
                                getData();
                            }
                        );
                    }}
                >
                {
                    isEdit && <HiddenInput name="_id" />
                }
                    <FormInput label={"Name"} name="name" required />
                    <FormInput label={"Description"} name="description" textArea />
                    <MultipleImageInput
                        name="image"
                        label={"Image"}
                        onChange={handleImageUpload}
                        onReload={getData}
                    />
                    {
                        imgLoading && <Spin fullscreen />
                    }
                    <Button className="mt-2.5">{"Submit"}</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default Category;