"use client"
import { Bell, Edit, Search, Settings } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react";
import dummy from "../../../public/assets/dummy.png"
import { Button, Form, Input, message, Modal, Popover, Spin } from "antd";
import ImageUploading from "react-images-uploading";
import axios from "axios";



const Header = () => {

    const [form] = Form.useForm();
    const [user, setUser] = useState({ id: "", name: "", email_address: "", profile_pic_url: null, role_id: 0 });
    const [blob, setBlob] = useState(null);
    const [settingsModal, setSettingsModal] = useState(false)
    const [loader, setLoader] = useState(false)

    const onUpdateAdmin = async (values) => {
        try {
            setLoader(true)
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/update-admin/${user?.id}`,
                {
                    name: values?.name,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token")
                    }
                })
            setLoader(false)
            
            if (res?.status === 200) {
                message.success("Profile updated successfully!")
                setUser(prev => ({ ...prev, name: values?.name }))
                localStorage.setItem("user", JSON.stringify({ ...user, name: values?.name }))
                setSettingsModal(false)
                form.resetFields();
            }



        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("Parsed user:", { parsedUser });
                    setUser({
                        role_id: parsedUser.role_id || 0,
                        id: parsedUser.id || "",
                        name: parsedUser.name || "",
                        email_address: parsedUser.email_address || "",
                        profile_pic_url: parsedUser.profile_pic_url || "",
                    });

                } catch (e) {
                    console.error("Failed to parse user", e);
                }
            }
        }
    }, []);



    const onChange = async (imageList) => {
        if (!imageList?.length) {
            setBlob(null)
            return
        }
        if (imageList?.length) {
            setBlob(imageList)
            const formData = new FormData();
            imageList?.forEach(({ file }) => formData.append("image", file))

            setLoader(true)
            let res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/util/upload?route_id=${1}`,
                formData,
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token"),
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            setLoader(false)

            if (res?.status === 200) {
                console.log("Image uploaded successfully:", res?.data);
                message.success("Profile picture updated successfully!");
                console.log(res?.data?.path)
                const updatedUser = { ...user, profile_pic_url: res?.data?.path };
                setUser(updatedUser); // Use updatedUser directly
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }

        }
    }



    const popOverContent = <div className="flex flex-col gap-2">
        {user?.role_id === 2 ? <Button onClick={() => {
            setSettingsModal(true)
            form.setFieldsValue({ name: user?.name })
        }}>Settings</Button> : <></>}
        <ImageUploading
            multiple={false}
            value={blob}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
            acceptType={["jpg", 'png', "jpeg"]}
            maxFileSize={20000000}

            onError={(error) => {
                if (error?.maxFileSize) return message?.error("Image cannot be greater than 20mb")
                if (error?.acceptType) return message?.error("Images allowed are jpg, png, jpeg")
            }}
        >

            {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => {
                return imageList?.length
                    ? imageList?.map((image, index) =>
                        <div className="text-xs cursor-pointer">
                            <Button
                                style={isDragging ? { color: "red" } : null}
                                onClick={() => onImageUpdate(index)}
                                {...dragProps}
                            >
                                Change Profile Picture
                            </Button>
                        </div>)
                    : <div className="text-xs cursor-pointer">
                        <Button
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Upload Profile Picture
                        </Button>
                    </div>
            }}
        </ImageUploading>
    </div>

    console.log({ user })

    return (
        <header className="w-full z-10">
            <Spin spinning={loader}>
                <div className="flex items-center justify-between px-10 py-4">
                    <h2 className="text-2xl font-semibold">
                        <span className="text-2xl">👋</span> Hello {user?.name},
                    </h2>
                    <div className="flex items-center space-x-2 md:space-x-6">
                        <Popover content={popOverContent} arrow={false} align={{ offset: [-20, -10] }}>
                            <div className="h-14 w-14 rounded-full overflow-hidden bg-white cursor-pointer">
                                <Image
                                    key={Math.random()}
                                    src={user?.profile_pic_url ? `http://192.168.18.24:4006${user?.profile_pic_url}` : dummy}
                                    alt="Profile"
                                    width={56}
                                    height={56}
                                    className="object-cover w-full h-full "
                                />
                            </div>
                        </Popover>
                    </div>
                </div>
            </Spin>
            <Modal
                open={settingsModal}
                onCancel={() => {
                    setSettingsModal(false)
                    form.resetFields();
                }}
                footer={null}
                title="Settings"
            >
                <div className="flex flex-col mt-5">
                    <Form form={form} onFinish={onUpdateAdmin}>
                        <Form.Item name={"name"}>
                            <Input placeholder="Enter name" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Modal>
        </header >
    )
}

export default Header
