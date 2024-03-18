import axios from "axios";
async function upload(url, form) {
    try {
        const params = new FormData();
        for (const i in form) {
            params.append(i, form[i]);
        }
        const res = await axios.post(url, params, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
export default upload;