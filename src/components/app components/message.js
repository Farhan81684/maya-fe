import { message as AntdMessage } from 'antd';
import '@ant-design/v5-patch-for-react-19'


export const message = (text, type = "info") => {
    switch (type) {
        case "success":
            AntdMessage.destroy()
            AntdMessage.success(`${text}`);
            break;
        case "error":
            AntdMessage.destroy()
            AntdMessage.error(`${text}`);
            break;
        case "warning":
            AntdMessage.destroy()
            AntdMessage.warning(`${text}`);
            break;
        default:
            AntdMessage.destroy()
            AntdMessage.info(`${text}`);
    }
}