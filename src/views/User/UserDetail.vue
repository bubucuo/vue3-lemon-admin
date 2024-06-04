<template>
    <div>
        <el-card>
            <el-input clearable v-model="searchForm.name" placeholder="根据用户姓名查询详情" class="input-with-select"
                @keyup.enter="searchUser">
                <template #append>
                    <el-button @click="searchUser">查询详情</el-button>
                </template>
            </el-input>

            <el-form v-if="form.id" :model="form">
                <el-form-item label="姓名:" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="年龄:" :label-width="formLabelWidth">
                    <el-input v-model="form.age" autocomplete="off" />
                </el-form-item>
                <el-form-item label="身份证:" :label-width="formLabelWidth">
                    <el-input v-model="form.code" autocomplete="off" />
                </el-form-item>
                <el-form-item label="地址:" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话:" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <el-button type="primary" @click="updateUser">更新用户信息</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import userApi from "../../api/user";
import { getIdCard, getMobile } from "../../utils/index"

const formLabelWidth = '140px'
const form = ref({
    id: '',
    username: '',
    age: '',
    code: '',
    address: '',
    phone: ''
})


const searchForm = reactive({
    name: '',
})

const searchUser = async () => {
    const res = await userApi.getUserDetail({ name: searchForm.name })
    const data = res.data
    form.value = data
    if (data) {
        ElMessage.success("查询成功")
        // form = data
        // form.id = data.id
        // form.username = data.username
        // form.age = data.age
        // form.code = data.code
        // form.address = data.address
        // form.phone = data.phone
    } else {
        ElMessage.error("查询失败")
    }
}


const updateUser = async () => {
    const res = await userApi.updateUserInfo(form.value)
    if (res.data.id) {
        ElMessage.success("更新成功")
    } else {
        ElMessage.error("更新失败")
    }

}

</script>


<style scoped>
.input-with-select {
    margin-bottom: 20px;
}
</style>