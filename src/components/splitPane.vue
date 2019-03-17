<template>
  <div class="split-pane"
       id="split-pane"
       @mousemove="lineMove">
    <div class="left-pane pane"
         id="left"
         ref="left">
      <slot name="left"></slot>
    </div>
    <div class="pane split-line"
         ref="line"
         @mousedown="beginMove"
         @mouseup="endMove"></div>
    <div class="right-pane pane"
         id="right"
         ref="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'splitPane',
  props: {
    value: {
      type: Number,
      default: 0.5,
      validator: value => {
        return 0 < value && value < 1
      }
    }
  },
  data() {
    return {
      canMove: false
    }
  },
  methods: {
    setWidth() {
      //根据传入的left right 计算宽度比例
      let leftWidth = `${this.value * 100}%`
      let rightWidth = `${(1 - this.value) * 100}%`
      this.$refs.left.style = `right:${rightWidth}`
      this.$refs.right.style = `left:${leftWidth}`
      this.$refs.line.style = `left:${leftWidth}`
    },
    beginMove() {
      console.log('beginMove')
      this.canMove = true
    },
    lineMove(e) {
      if (this.canMove) {
        let splitPane = this.splitPaneEl.getBoundingClientRect(),
          splitPaneWidth = splitPane.width,
          splitPaneX = splitPane.x

        let mouseX = e.pageX

        let value = (mouseX - splitPaneX) / splitPaneWidth,
          leftWidth = `${value * 100}%`,
          rightWidth = `${(1 - value) * 100}%`
        this.$refs.left.style = `right:${rightWidth}`
        this.$refs.right.style = `left:${leftWidth}`
        this.$refs.line.style = `left:${leftWidth}`
      }
    },
    endMove() {
      console.log('endMove')
      this.canMove = false
    }
  },
  mounted() {
    this.setWidth()
    this.splitPaneEl = document.getElementById('split-pane')
  }
}
</script>

<style lang="scss">
.split-pane {
  position: relative;
  width: 100%;
  height: 100%;
  .pane {
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .left-pane {
    left: 0;
  }
  .right-pane {
    right: 0;
    padding: 10px 10px 10px 16px;
  }
  .split-line {
    width: 6px;
    height: 100%;
    background: #eee;
    z-index: 10;
    cursor: col-resize;
  }
}
</style>

