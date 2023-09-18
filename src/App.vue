<template>
  <div class="app">
    <header>
      <div class="header">
        <!-- <img
          class="logo"
          src="https://fm.01234.fun/logo.png"
          @click="$router.back(-1)"
        /> -->
        <div class="logo" @click="$router.back(-1)">TV Online</div>
        <button>查看源码</button>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
.app {
  max-width: 760px;
  margin: 0 auto;
}

header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.8rem 0.8rem 0;
  background: #fff;
  box-shadow: 0 -1px #ffffff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  .logo {
    width: 120px;
    max-height: 30px;
    font-size: 26px;
  }
  button {
    background: #f00;
    border: none;
    color: #fff;
    padding: 0.3rem 0.5rem;
  }
}
</style>
