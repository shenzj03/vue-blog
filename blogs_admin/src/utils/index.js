import axios from "axios";
import { ref } from "vue";
const dialogVisible = ref(false);
const handleDialog = ref(false);
const tableData = ref([]);
const ruleFormRef = ref();
const getList = async (url) => {
    const res = await axios.get(url);
    tableData.value = res.data.data;
}
const handleSame = () => {
    handleDialog.value = true;
    dialogVisible.value = true;
};
const exclusiveOr = () => {
    // 处理互斥逻辑
    dialogVisible.value = true;
    handleDialog.value = false;
}
export {
    dialogVisible, handleDialog, tableData, ruleFormRef, getList, handleSame,exclusiveOr
}