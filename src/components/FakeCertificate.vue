<template>
  <div class="container">
    <header>
      <h1>进 校 凭 证</h1>
    </header>
    <div class="content">
      <div class="id-card">
        <span class="xx">崇德博学 砺志尚实</span>
        <!-- <img src="/xx.png" alt="logo" class="xx-png" /> -->
        <img src="/xh.png" alt="logo" class="xh-png" />
        <div class="name">
          {{ info.name }}
        </div>
        <div class="base-info">手机号码：{{ info.phone }}</div>
        <div class="base-info">证件号码：{{ info.id }}</div>
        <div class="base-info">进校日期：{{ info.date }}</div>
      </div>
      <div class="code-image">
        <div class="title">校外访客</div>
        <div class="time">
          {{ time1Part }}:<span class="seconds"> {{ time2Part }}</span>
        </div>
        <div class="qr-code">
          <img style="width: 50%" src="/qr-code.png" alt="二维码" />
        </div>

        <div class="car-number">{{ info.car }}</div>

        <div class="info-area" ref="infoArea">
          <div class="info-item">
            <span>姓名 </span>
            <input type="text" placeholder="请输入姓名" v-model="info.name" />
          </div>
          <div class="info-item">
            <span>手机号码 </span>
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="info.phone"
            />
          </div>
          <div class="info-item">
            <span>证件号码 </span>
            <input type="text" placeholder="请输入身份证号" v-model="info.id" />
          </div>
          <div class="info-item">
            <span>进校日期 </span>
            <input
              type="text"
              placeholder="请输入进校日期"
              v-model="info.date"
            />
          </div>
          <div class="info-item">
            <span>车牌 </span>
            <input type="text" placeholder="请输入车牌" v-model="info.car" />
          </div>
          <button class="submit-btn" @click="handleSubmit">隐藏</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
const formatDate = (date = new Date()) => {
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
};
const formateTime = ref("");
const time1Part = computed(() => {
  if (formateTime.value.split(":").length > 1) {
    return formateTime.value.split(":").slice(0, 2).join(":");
  }
  return "";
});
const time2Part = computed(() => {
  if (formateTime.value.split(":").length > 1) {
    return formateTime.value.split(":")[2];
  }
  return "";
});
const info = reactive({
  name: "吴婷",
  id: "340827*********327",
  phone: "13524292716",
  date: formatDate().split(" ")[0],
  car: "沪A363U9",
});
const infoArea = ref<HTMLDivElement>();
const handleSubmit = () => {
  if (infoArea.value) {
    infoArea.value.style.display = "none";
  }
};
setInterval(() => {
  formateTime.value = formatDate();
}, 1000);
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
header h1 {
  font-size: 1.4rem;
  font-family: "SYHT-Bold", sans-serif;
}
.content {
  background-color: #f5f5f5;
  padding: 20px;
  height: calc(100vh - 60px);
  width: 100%;
}
.id-card {
  position: relative;
  background-image: url("/bg.png");
  background-repeat: no-repeat; /* 不重复 */
  background-size: cover; /* 铺满容器 */
  background-position: center; /* 居中显示 */
  color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 230px;
  width: 100%;
  padding: 25px;
  padding-top: 50px;
}
.xx {
  position: absolute;
  font-family: "KaiTi", sans-serif;
  top: 20px;
  left: 10px;
}
.xh-png {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 120px;
}
.id-card .name {
  font-size: 1.4rem;
}
.id-card .base-info {
  margin-top: 10px;
}
.code-image {
  margin-top: 20px;
  background-color: #fff;
  width: 100%;
  border-radius: 20px;
}
.title {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.4rem;
}
.time {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.2rem;
}
.seconds {
  font-family: "SYHT-Bold", sans-serif;
  font-size: 1.2rem;
}
.qr-code {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
}
.car-number {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.6rem;
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 8px;
  letter-spacing: 2px;
}
.info-area {
  margin-top: 20px;
}
.info-item {
  display: flex;
  width: 100%;
  padding: 5px 10px;
}
.info-item span {
  width: 20%;
}
.info-item input {
  flex: 1;
}
.submit-btn {
  margin-top: 5px;
  width: 100%;
}
</style>
