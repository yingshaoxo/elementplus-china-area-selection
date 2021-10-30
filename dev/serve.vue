<script lang="ts">
import { defineComponent, reactive } from "vue";
import ElementplusChinaAreaSelection from "@/elementplus-china-area-selection.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    ElementplusChinaAreaSelection,
  },
  setup: (_props) => {
    // console.log(ElementplusChinaAreaSelection)

    const dict = reactive({
      data: {
        chineseList: [] as string[],
        idList: [] as string[],
      },
    });

    return {
      dict,
    };
  },
});
</script>

<template>
  <div id="app">
    <elementplus-china-area-selection
        placeholder="请选择"
        v-model:theSelectedListInChinese = "dict.data.chineseList"
        v-model:theSelectedListInNumber = "dict.data.idList"
        style="width: 38vw"
    />
    <div>v-model:theSelectedListInNumber {{dict.data.idList}}</div>
    <div>v-model:theSelectedListInChinese {{dict.data.chineseList}}</div>

    <br>
    <br>
    <br>
    <button @click="()=>{
      dict.data.chineseList = [ '香港特别行政区', '香港岛', '湾仔区' ]
    }">click me to change</button>

    <br>
    <br>
    <br>
    <button @click="()=>{
      dict.data.chineseList = [  ]
    }">click me to reset</button>
  </div>
</template>
