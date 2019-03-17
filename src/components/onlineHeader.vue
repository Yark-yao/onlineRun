<template>
  <div class="ol-header">
    <div class="ol-header-title">
      <span class="ol-header-title-icon"></span>
      <span class="ol-header-title-text">online Vue</span>
    </div>
    <div class="ol-header-action">
      <div class="ol-header-action-button run"
           @click="handleAction('run')">
        <img src="@/assets/icon/run.svg"
             alt>
        运行
      </div>
      <div class="ol-header-action-button reset"
           @click="handleAction('reset')">
        <img src="@/assets/icon/reset.svg"
             alt>
        重置
      </div>
    </div>
    <div class="ol-header-help"
         @click="handleAction('help')">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'onlineHeader',
  data() {
    return {}
  },
  methods: {
    handleAction(type) {
      this.$emit(type)
    }
  }
}
</script>

<style lang="scss" scoped>
.ol-header {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  &-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 200px;
    height: 100%;
    vertical-align: middle;
    text-align: left;
    cursor: default;
    &-icon {
      display: inline-block;
      width: 36px;
      height: 36px;
      background: url('../assets/icon/title.svg') no-repeat;
      background-size: 100%;
    }
    &-text {
      padding-left: 8px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  &-action {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    &-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      font-size: 12px;
      vertical-align: middle;
      margin-right: 32px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
    }
    &-button:hover {
      color: #1296db;
    }
  }
  &-help {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url('../assets/icon/help.svg') no-repeat;
      background-size: 100%;
    }
    span:hover {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url('../assets/icon/help-active.svg') no-repeat;
      background-size: 100%;
    }
  }
}
</style>

