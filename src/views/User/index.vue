<template>
    <div>
        <el-card>
            <el-input style="width:240px" @clear="getUserList" clearable v-model="searchForm.name"
                placeholder="根据用户姓名查询详情" class="input-with-select" @keyup.enter>
                <template #append>
                    <el-button icon="Search" @click="searchUser" />
                </template>
            </el-input>

        </el-card>
        <el-card>
            <el-button type="primary" @click="addUserDialogVisible = true">
                添加用户
            </el-button>

            <el-dialog v-model="addUserDialogVisible" title="添加用户" width="500">
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
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="addUserDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="addUser">
                            确认
                        </el-button>
                    </div>
                </template>
            </el-dialog>

            <!-- ! table -->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column label="操作" width="330">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-if="searchForm.name == ''" style="margin-top:20px" :current-page="searchForm.pageNo"
                :page-size="searchForm.pageSize" :page-sizes="[10, 20, 30, 40]"
                layout="->,total, sizes, prev, pager, next, jumper" :total="searchForm.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>


    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import userApi from "../../api/user";
import { getIdCard, getMobile } from "../../utils/index"

const addUserDialogVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
    username: 'sy' + Math.floor(Math.random() * 10),
    age: 100,
    code: getIdCard(),
    address: '杭州市萧山区' + Math.floor(Math.random() * 10) + '号',
    phone: getMobile(),
})


const addUser = async () => {
    const res = await userApi.addUser(form)
    if (res.data.id) {
        ElMessage.success("添加成功")
        getUserList()
        addUserDialogVisible.value = false
    } else {
        ElMessage.error("添加失败")
    }

}

onMounted(() => {
    getUserList()
})

let tableData = ref([])
const searchForm = reactive({
    total: 0,
    pageNo: 1,
    pageSize: 10,
    name: '',
})

const getUserList = async () => {
    const res = await userApi.getUserList(searchForm)
    const data = res.data
    tableData.value = data.content
    searchForm.total = data.total
}

const handleSizeChange = (pageSize) => {
    searchForm.pageSize = pageSize;
    getUserList();
}
const handleCurrentChange = (pageNo) => {
    searchForm.pageNo = pageNo;
    getUserList();
}

const searchUser = async () => {
    const res = await userApi.getUserDetail({ name: searchForm.name })
    const data = res.data
    tableData.value = [data]
}

// 删除用户
const deleteUser = (id) => {
    ElMessageBox.confirm(
        '确定要删除该用户信息吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        const res = await userApi.delUser({ id: id });
        if (res.data.id) {
            ElMessage.success("删除成功")
            getUserList();
        } else {
            ElMessage.error("删除失败")
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消删除',
        })
    })
}

</script>


<style scoped></style>