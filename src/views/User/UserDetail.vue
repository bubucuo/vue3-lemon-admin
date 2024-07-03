<template>
    <div>
        <el-card>
            <el-input clearable v-model="searchForm.name" placeholder="根据用户姓名查询详情" class="input-with-select"
                @keyup.enter="searchUser">
                <template #append>
                    <el-button @click="searchUser">查询详情</el-button>
                </template>
            </el-input>

            <el-input clearable v-model="searchForm.id" placeholder="根据用户id查询详情" class="input-with-select"
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
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus';
import userApi from "../../api/user";

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
    id: null
})

const searchUser = async () => {
    let res
    if (searchForm.id) {
        res = await userApi.getUserDetail(searchForm.id)
    } else {
        res = await userApi.getUserDetailByName(searchForm.name)
    }
    const data = res.data
    form.value = Array.isArray(data) ? data[0] : data
    if (data) {
        ElMessage.success("查询成功")
    } else {
        ElMessage.error("数据为空，查询失败")
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