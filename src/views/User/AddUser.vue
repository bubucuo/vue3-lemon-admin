<template>
        <el-card>
            <el-form :model="form">
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
            </el-form>

            <el-button type="primary" @click="addUser">
                添加用户
            </el-button>

    </el-card>
</template>

<script setup>
import { onMounted,ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import userApi from "../../api/user";
import {getIdCard , getMobile} from "../../utils/index"


const formLabelWidth = '140px'

const form = reactive({
    username: 'sy' + Math.floor(Math.random()*10),
    age: 100,
    code: getIdCard(),
    address: '杭州市萧山区' + Math.floor(Math.random()*10) + '号',
    phone: getMobile(),
})

  const addUser = async ()=>{
    const res = await userApi.addUser(form)
    if(res.data.id){
        ElMessage.success("添加成功")
        getUserList()
    }else{
        ElMessage.error("添加失败")
    }
  
  }

</script>