"use client"
import '@ant-design/v5-patch-for-react-19'
import Header from '@/components/Admin/Header'
import Sidebar from '@/components/Admin/Sidebar'
import { Button, Form, Input, Modal, Popover, Spin, Table } from 'antd'
import { Check, Delete, DeleteIcon, Edit, Edit2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { message } from '@/components/app components/message'
import dummy from "../../../../public/assets/dummy.png"
import Image from 'next/image'
import UploadProfilePicture from '@/components/Admin/imageUploader'

const AdminsPage = () => {



    const [admins, setAdmins] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [form] = Form.useForm();
    const [form_update] = Form.useForm();
    const itemsPerPage = 10;
    const router = useRouter();
    const [loader, setLoader] = useState(false)

    const [uploadedImage, setUploadedImage] = useState(null);
    const [blob, setBlob] = useState(null);

    const totalPages = Math.ceil(admins?.length / itemsPerPage);
    const paginatedData = admins?.length ? admins?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];


    const handleUpdateFinish = async (values) => {

        console.log({ uploadedImage })
        try {

            if (uploadedImage[0]?.file) {
                const formData = new FormData();
                uploadedImage?.forEach(({ file }) => formData.append("image", file))
                setLoader(true)
                let response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/util/upload?route_id=${1}&id=${selectedAdmin?.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem("access_token"),
                            "Content-Type": "multipart/form-data"
                        }
                    }
                ).then(async res => {
                    setLoader(true)
                    await axios.put(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-admin/${selectedAdmin?.id}`,
                        {
                            ...values,
                            profile_pic_url: res?.data?.path
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem("access_token")
                            }
                        }
                    ).then(() => {
                        setLoader(false)
                        setisUpdateModalOpen(false);
                        form_update.resetFields();
                        setSelectedAdmin(null)
                        fetchAdmins()
                        message("Admin updated", "success");
                        setUploadedImage(null);
                        setBlob(null);
                    })
                })
            }
            else {
                setLoader(true)
                let res = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/update-admin/${selectedAdmin?.id}`,
                    {
                        ...values,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem("access_token")
                        }
                    }
                )
                if (res?.status === 200) {
                    setLoader(false)
                    setisUpdateModalOpen(false);
                    form_update.resetFields();
                    setSelectedAdmin(null)
                    message("Admin updated", "success");
                    setUploadedImage(null);
                    setBlob(null);
                    setTimeout(() => {
                        fetchAdmins()
                    }, 1000);
                }
            }

        } catch (error) {
            console.error("Error in /update admin: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
            setLoader(false)
        }
    }

    console.log(uploadedImage)
    const handleFinish = async (values) => {

        try {
            setLoader(true)
            const formData = new FormData();
            uploadedImage?.forEach(({ file }) => formData.append("image", file))

            let response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/util/upload?route_id=${100}`,
                formData,
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token"),
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(async res => {
                setLoader(true)
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/create-admin`,
                    {
                        ...values,
                        profile_pic_url: res?.data?.path
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem("access_token")
                        }
                    }
                ).then(() => {
                    fetchAdmins()
                    setIsModalOpen(false);
                    form.resetFields();
                    setUploadedImage(null);
                    setBlob(null);
                    message("Admin created", "success");
                    setLoader(false)
                })
            })

        } catch (error) {
            setLoader(false)
            console.error("Error in /create admin: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
        }

    };

    const handlePrev = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };


    const fetchAdmins = async () => {
        setLoader(true)
        let res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/list`,
            {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            }
        );
        setLoader(false)
        setAdmins(res?.data?.admins)

    }

    useEffect(() => {
        fetchAdmins()
    }, []);

    useEffect(() => {
        if (selectedAdmin) {
            form_update.setFieldsValue({
                name: selectedAdmin?.name,
            });
        }
    }, [selectedAdmin]);

    const deleteAdmin = async () => {
        try {
            setLoader(true)
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/delete-admin/${selectedAdmin?.id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token")
                    }
                }
            );
            fetchAdmins()
            setSelectedAdmin(null)
            message("Admin deleted", "success");
            setLoader(false)

        }
        catch (error) {
            console.error("Error in /delete admin: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
            setLoader(false)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            message("User not authorized. Redirecting to login page.", "error");
            router.push("/admin/login"); // Redirect to login page
        }
        if (JSON.parse(localStorage.getItem("user"))?.role_id !== 1) {
            message("You are not authorized to view this page.", "error");
            router.push("/admin/dashboard"); // Redirect to dashboard if not admin
        }
    }, [])


    return (
        <Spin spinning={loader}>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <Header />

                    <main className='flex-1 w-full px-10 mx-auto py-6'>
                        <div className='flex flex-col gap-10'>
                            <div className='flex items-center justify-end'>
                                <Button className='!bg-purple-500 !text-white !h-10 !font-semibold' onClick={() => setIsModalOpen(true)}>Create Admin</Button>
                            </div>

                            <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }} >
                                <div className="py-6 px-6 flex justify-between items-center">
                                    <h3 className="text-2xl font-semibold">Smooth AI Admins</h3>
                                </div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#eee] text-left text-sm text-gray-500">
                                            <th className="px-6 py-3 font-medium"></th>
                                            <th className="px-6 py-3 font-medium">Admin Name</th>
                                            <th className="px-6 py-3 font-medium">Email</th>
                                            <th className="px-6 py-3 font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins?.length > 0 ? paginatedData.map((lead, i) => (
                                            <tr key={i} className="border-b border-[#eee]">
                                                <td className='pl-6 py-4'>
                                                    {lead?.profile_pic_url
                                                        ? <img key={i} src={`https://api.smoothcx.ai/node/images/${lead?.profile_pic_url?.replace("/uploads", "")}`} className='object-cover rounded-full !w-[40px] !h-[40px]' />
                                                        : <Image src={dummy} className='object-cover rounded-full' width={40} height={40} />}
                                                </td>
                                                <td className="px-6 py-4">{lead?.name}</td>
                                                <td className="px-6 py-4">{lead?.email_address}</td>
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <button
                                                        onClick={() => {
                                                            setisUpdateModalOpen(true)
                                                            setSelectedAdmin(lead)
                                                            setBlob(lead?.profile_pic_url ? [{ data_url: `https://api.smoothcx.ai/node/images/${lead?.profile_pic_url?.replace("/uploads", "")}` }] : null)
                                                            setUploadedImage(lead?.profile_pic_url ? [{ path: `https://api.smoothcx.ai/node/images/${lead?.profile_pic_url?.replace("/uploads", "")}` }] : null)
                                                        }}
                                                        className={`bg-purple-500 text-white px-4 py-1  rounded-md text-sm `}
                                                    >
                                                        <Edit2 />
                                                    </button>
                                                    <Popover onOpenChange={(open) => !open ? setSelectedAdmin(null) : () => { }} trigger={"click"} content={<div className='flex flex-col gap-2 p-4'>
                                                        <p className='text-sm text-gray-600'>Are you sure you want to delete this admin?</p>
                                                        <div className='flex gap-2 items-center justify-center'>
                                                            <Button type='primary' danger onClick={deleteAdmin}>Yes</Button>
                                                        </div>
                                                    </div>}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedAdmin(lead)
                                                            }}
                                                            className={`bg-red-500 text-white px-4 py-1  rounded-md text-sm `}
                                                        >
                                                            <Delete />
                                                        </button>
                                                    </Popover>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr className="border-b border-[#eee]">
                                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Pagination Controls */}
                                {admins?.length > itemsPerPage && (
                                    <div className="flex justify-end gap-4 items-center mt-4 px-6">
                                        <button
                                            onClick={handlePrev}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 border rounded disabled:opacity-50"
                                        >
                                            Prev
                                        </button>
                                        <span className="text-sm text-gray-600">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={handleNext}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 border rounded disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </main>
                </div >

                <Modal open={isModalOpen} onCancel={() => {
                    setIsModalOpen(false)
                    form.resetFields()
                    setUploadedImage(null)
                    setBlob(null)
                }} footer={null} title="Create Admin">
                    <UploadProfilePicture setUploadedImage={setUploadedImage} blob={blob} setBlob={setBlob} routeType={1} />
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        className='my-5'
                        autoComplete='off'
                    >
                        <Form.Item
                            label="Email Address"
                            name="email_address"
                            rules={[
                                { required: true, message: 'Please enter an email address' },
                                { type: 'email', message: 'Enter a valid email' },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter a name' }]}
                        >
                            <Input placeholder="Enter name" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter a password' },
                                {
                                    min: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Enter password" autoComplete="new-password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className='!h-10 !bg-purple-500 !text-white !font-semibold'>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    open={isUpdateModalOpen}
                    onCancel={() => {
                        setisUpdateModalOpen(false)
                        form_update.resetFields()
                        setSelectedAdmin(null)
                        setUploadedImage(null)
                        setBlob(null)
                    }}
                    footer={null}
                    title="Update Admin">
                    <UploadProfilePicture setUploadedImage={setUploadedImage} blob={blob} setBlob={setBlob} routeType={1} />
                    <Form
                        form={form_update}
                        layout="vertical"
                        onFinish={handleUpdateFinish}
                        className='my-5'
                    >

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter a name' }]}
                        >
                            <Input placeholder="Update name" />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className='!h-10 !bg-purple-500 !text-white !font-semibold'>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Spin>
    )
}

export default AdminsPage
