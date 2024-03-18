import axios from "axios";
import { reactive, ref } from "vue";
const form = reactive({
    title: "",
    author: "",
    category: "",
    tags: [],
    cover: "",
    file: null,
    content: "",
    isPublish: false,
    lastEditTime: new Date(),
});
const formRules = reactive({
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    author: [{ required: true, message: "请输入作者", trigger: "blur" }],
    category: [{ required: true, message: "请选择分类", trigger: "change" }],
    tags: [{ required: true, message: "请选择标签", trigger: "change" }],
    cover: [{ required: true, message: "请选择封面", trigger: "change" }],
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
});
const getOptions = async (url, options) => {
    await axios.get(url).then((res) => {
        if (res.data.ActionType === "OK") {
            options.value = res.data.data.map((item) => {
                return {
                    label: item.tag || item.category,
                    value: item._id,
                };
            });
        }
    });
}

const getValue = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data.data[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {
    form, formRules, getOptions, getValue
}