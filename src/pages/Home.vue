<template>
  <div class="home">
    <div class="content">
      <!-- 运营状况 -->
      <div class="main-info">
        <h2 style="font-size: 50px;margin-top:30vh">欢迎{{ admin }}进入广东海洋大学人力资源管理系统</h2>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      admin: window.localStorage.getItem("username")
    };
  },

};
</script>

<style scoped>
.home {
  height: 100%;
}

.content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-info {
  flex: 1;
  display: flex;
  justify-content: space-around;
  background: white;
  min-width: 800px;
  border-radius: 8px;
}

.info {
  background: white;
  width: 18%;
  height: 60%;
  align-self: center;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info .num-info {
  margin: 10px 0px;
}

.info .desc {
  font-size: 10px;
  color: gray;
}

.chart {
  flex: 1;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  border-radius: 8px;
  width: 100%;
  height: 100%;
}

.e-chart {
  padding-top: 10px;
  width: 49%;
  height: auto;
  min-width: 500px;
}

@media (max-width: 1024px) {
  .main-info {
    flex-direction: column;
    min-width: 50%;
  }

  .info {
    width: 50%;
  }

  .chart {
    flex-direction: column;
  }

  .e-chart {
    width: 100%;
    height: 300px;
  }
}
</style>