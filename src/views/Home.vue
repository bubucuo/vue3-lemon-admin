<template>
    <div>
        <el-container class="home-container">
            <!-- header -->
            <el-header>
                <el-row>
                    <el-col :span="4">
                        <p class="system-name">cms</p>
                    </el-col>
                    <el-col :offset="12" :span="8" style="min-width: 150px">
                        <el-dropdown style="float: right; margin: 20px 10px">
                            <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
                                {{ username }} <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-header>

            <el-container style="overflow: auto">
                <!-- 菜单 -->
                <el-aside>
                    <div class="toggle-button" @click="isCollapse = !isCollapse">
                        <el-icon :size="20">
                            <Expand v-if="isCollapse" />
                            <Fold v-if="!isCollapse" />
                        </el-icon>
                    </div>

                    <el-menu router :default-active="activePath" class="el-menu-vertical-demo" :collapse="isCollapse">
                        <template v-for="item in menus" :key="item.path">
                            <el-sub-menu v-if="item.children" :index="item.path">
                                <template #title>
                                    <el-icon :size="20">
                                        <component :is="item.icon" />
                                    </el-icon>
                                    <span>{{ item.title }}</span>
                                </template>
                                <el-menu-item v-for="_item in item.children" :key="_item.path" :index="_item.path">{{
                                    _item.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="item.path">
                                <el-icon :size="20">
                                    <component :is="item.icon" />
                                </el-icon>
                                <span>{{ item.title }} </span>
                            </el-menu-item>
                        </template>

                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <!-- 主要内容 -->
                        <router-view></router-view>
                    </el-main>
                    <!-- <el-footer>Copyright</el-footer> -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { menus } from '../utils/menus.js'
import userApi from "../api/user";

const router = useRouter();

// 挂载 DOM 之前
onBeforeMount(() => {
    activePath.value = router.currentRoute._rawValue.path
})

onMounted(() => {
    // getUserProfile()
})

const username = ref("")
const getUserProfile = async () => {
    const res = await userApi.getAuthProfile()
    username.value = res.data.username
}

let isCollapse = ref(false);
let activePath = ref("/");

const logout = () => {
    // 清除缓存
    sessionStorage.clear();
    router.push("/login");
}
</script>

<style scoped>
.home-container {
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #f2f3f5;
}

.el-header {
    background: #2661ef;
    padding: 0 10px;
    overflow: hidden;
}

.system-name {
    color: #fff;
    font-size: 18px;
}

.el-aside {
    background: white;
    width: auto !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-footer {
    color: #cccccc;
    text-align: center;
    line-height: 60px;
}

.el-footer:hover {
    color: #2661ef;
}

.toggle-button {
    background-color: #d9e0e7;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    color: black;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-item.is-active {
    color: #fff !important;
    font-size: 15px;
    font-weight: bold;
    background-color: #2661ef !important;
    border-radius: 2px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin: 2px 5px 0px 2px;
}
</style>
