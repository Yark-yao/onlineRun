<template>
  <div class="online-run">
    <online-header class="online-run-header"
                   @run="handleRun"
                   @reset="handleReset"
                   @help="handleHelp"></online-header>
    <div class="main">
      <split-pane :value="0.5">
        <template v-slot:left>
          <codemirror v-model="code"
                      :options="cmOptions"></codemirror>
        </template>
        <template v-slot:right>
          <div class="mount-el"
               id="mount-el"></div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
//codemirror相关
import { codemirror } from 'vue-codemirror'
import '@/codeMirror/index.js'
import codeTemplate from '@/codeMirror/codeTemplate.js'
import '@/codeMirror/myCodeMirror.css'

//导入自定义组件
import OnlineHeader from '@/components/onlineHeader.vue'
import SplitPane from '@/components/splitPane.vue'
//导入utils中分割字符串方法
import { getSource, getUuid } from '@/utils/util'
import Vue from 'vue'

export default {
  name: 'onlineRun',
  components: {
    codemirror,
    OnlineHeader,
    SplitPane
  },
  data() {
    return {
      code: codeTemplate,
      cmOptions: {
        mode: 'htmlmixed',
        lineNumbers: !0,
        // scrollbarStyle: "simple",
        autoCloseBrackets: !0,
        matchBrackets: !0,
        showCursorWhenSelecting: !0,
        autoCloseTags: !0,
        tabSize: 2,
        foldGutter: !0,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-lint-markers'
        ],
        autofocus: !0,
        styleActiveLine: !0
      },
      userCode: {
        template: '',
        script: '',
        style: '',
        uuid: '',
        component: null
      },
      mountEl: ''
    }
  },
  methods: {
    handleRun() {
      this.unMountUserCode()
      this.splitCode()
      this.mountUserCode()
    },
    handleReset() {
      this.code = codeTemplate
      this.unMountUserCode()
    },
    handleHelp() {
      this.$Modal.info({
        title: '什么是online Vue',
        content: `<p>online Vue 是一个集成了 iView 环境的在线运行 iView 示例的工具，您可以直接编写一个 .vue 文件，它包含了 template、script、style 三部分。</p>
                         <br/>
                         <p>online Vue 目前仅支持 iView 环境，不支持 Less、部分 ES6 语法（取决于浏览器）。</p>
                         <br/>
                         <p>本页面是仿写iview Run页面，iview Run的访问地址：https://run.iviewui.com/</p>`
      })
    },
    mountUserCode() {
      this.userCode.uuid = getUuid()
      // 生成vue组件挂载
      const parseStrToObj = new Function(this.userCode.script)()
      parseStrToObj.template = this.userCode.template

      let userCodeComponent = Vue.extend(parseStrToObj)
      this.userCode.component = new userCodeComponent().$mount()
      this.mountEl.appendChild(this.userCode.component.$el)
      // 挂载样式
      if (this.userCode.css !== '') {
        let styleEl = document.createElement('style')
        styleEl.type = 'text/css'
        styleEl.id = this.userCode.uuid
        styleEl.innerHTML = this.userCode.style
        document.head.appendChild(styleEl)
      }
    },
    unMountUserCode() {
      // 销毁vue组件
      if (this.userCode.component) {
        this.mountEl.removeChild(this.userCode.component.$el)
        this.userCode.component.$destroy
        this.userCode.component = null
      }
      //清楚style样式
      let userStyle = document.getElementById(this.userCode.uuid)
      if (userStyle) {
        document.head.removeChild(userStyle)
      }
    },
    splitCode() {
      this.userCode.template = getSource(this.code, 'template')
      this.userCode.style = getSource(this.code, 'style')
      this.userCode.script = getSource(this.code, 'script').replace(
        /export default/,
        'return '
      )
    }
  },
  mounted() {
    this.mountEl = document.getElementById('mount-el')
    this.handleRun()
  }
}
</script>

<style lang="scss" scoped>
.online-run {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // background-color: rgb(248, 248, 249);
  &-header {
    width: 100%;
    height: 50px;
    padding: 0 40px;
    margin-bottom: 1px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>

