import { Button } from "antd";
import axios from "axios";
import Image from "next/image";
import ImageUploading from "react-images-uploading";

const UploadProfilePicture = ({ setUploadedImage, routeType, setBlob, blob, fileType = 'image' }) => {

    const onChange = async (imageList) => {
        if (!imageList?.length) {
            setBlob(null)
            setUploadedImage(null)
            return
        }
        setBlob(imageList)
        if (imageList?.length) {
            setUploadedImage(imageList)
        }
    }
    return <ImageUploading
        multiple={false}
        value={blob}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={["jpg", 'png', "jpeg"]}
        maxFileSize={20000000}

        onError={(error) => {
            if (error?.maxFileSize) return Message?.error(t("IMAGE_FAILED"))
            if (error?.acceptType) return Message?.error(t("IMAGES_ALLOWED_2"))

        }}
    >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            <>
                {!imageList?.length || !blob?.length
                    ? <div className="flex items-center gap-3 justify-end w-full">
                        <Button
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Upload Image
                        </Button>
                    </div>
                    : imageList.map((image, index) => (
                        <div key={index} className="flex items-center justify-between w-full">
                            <img src={image.data_url} className="rounded-full object-cover !w-[55px] !h-[55px] border-2 border-gray-200 " />
                            <div className="flex items-center gap-2">
                                <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                <Button onClick={() => onImageRemove(index)}>Remove</Button>
                            </div>
                        </div>
                    ))
                }
            </>
        )}
    </ImageUploading >

}

export default UploadProfilePicture