<template>
  <div class="container">
    <header>
      <h1>进 校 凭 证</h1>
    </header>
    <div class="content">
      <div class="id-card">
        <img src="/xx.png" alt="logo" class="xx-png" />
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
          <img
            style="width: 50%"
            src="/qr-code.png"
            alt="二维码"
            @click="showInfoArea"
          />
        </div>

        <div class="car-number">{{ info.car }}</div>

        <div class="info-area" v-show="isShow">
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
          <div class="btn-group">
            <button class="submit-btn" @click="saveInfo">持久化</button>
            <button class="submit-btn" @click="resetInfo">重置</button>
            <button class="submit-btn" @click="hideInfoArea">隐藏</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
const formatDate = (date = new Date()) => {
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
};
const formateTime = ref(formatDate());
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

const defaultInfo = {
  name: "吴婷",
  id: "340827*********327",
  phone: "13524292716",
  date: formatDate().split(" ")[0],
  car: "沪A363U9",
};

const tempInfo = JSON.parse(localStorage.getItem("info") || "{}");
// 有缓存还需保证今天的时间
if (Object.keys(tempInfo).length > 0)
  tempInfo.date = formatDate().split(" ")[0];

const info = ref(Object.keys(tempInfo).length > 0 ? tempInfo : defaultInfo);

const isShow = ref(false);
const showInfoArea = () => {
  isShow.value = true;
};
const hideInfoArea = () => {
  isShow.value = false;
};
const resetInfo = () => {
  // 防止浅拷贝
  const tmp = {
    name: "吴婷",
    id: "340827*********327",
    phone: "13524292716",
    date: formatDate().split(" ")[0],
    car: "沪A363U9",
  };
  info.value = tmp;
  localStorage.removeItem("info");
  alert("信息已重置");
};
const saveInfo = () => {
  localStorage.setItem("info", JSON.stringify(info.value));
  alert("信息已持久化");
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
  font-weight: bolder;
}
.content {
  background-color: #ebebeb;
  padding: 20px;
  height: calc(100vh - 60px);
  width: 100%;
  overflow: scroll;
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
  height: 220px;
  width: 100%;
  padding: 25px;
  padding-top: 50px;
}
.xx-png {
  position: absolute;
  width: 140px;
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
  margin-top: 8px;
  font-size: 0.9rem;
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
  font-weight: 400;
  font-size: 1.2rem;
}
.time {
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: 400;
  font-size: 1.2rem;
}
.seconds {
  font-weight: 900;
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
  font-weight: 500;
  padding-top: 4px;
  padding-bottom: 8px;
  letter-spacing: 2px;
}
.info-area {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 20px;
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
.btn-group {
  padding: 10px 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
}
</style>
