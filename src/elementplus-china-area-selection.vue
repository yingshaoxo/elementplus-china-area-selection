<script lang="ts">
import {defineComponent, reactive, ref, unref, watch, onMounted, computed} from "vue";
import ChinaArea from "./ChinaArea";
import * as functions from "./functions"
import {list} from "postcss";

export default defineComponent({
  name: "ElementplusChinaAreaSelection", // vue component name
  props: {
    isall: Boolean,
    leave: {
      type: Number,
      default: 3,
    },
    theSelectedListInNumber: {
      type: Array,
      default: [],
    },
    theSelectedListInChinese: {
      type: Array,
      default: [],
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  setup(props: { leave: any; isall: any; theSelectedListInNumber: any[]; theSelectedListInChinese: any[] }, context: any) {
    const chinaArea = new ChinaArea({ leave: props.leave, isall: props.isall });
    const chinaData = unref(ref(chinaArea.chinaData()));
    const chinaFlatData = unref(chinaArea.chinaAreaflat);

    const dict = reactive({
      tempData: {
      },
      data: {
        province: '',
        city: '',
        county: '',
        theSelectedListInChinese: computed({
          get: () :string[] => {
            return props.theSelectedListInChinese
          },
          set: (newVal: string[]) => {
            if (newVal.length === 0) {
              dict.data.theSelectedListInChinese = []
              dict.data.theSelectedListInNumber = []
              return;
            }
            if (newVal != dict.data.theSelectedListInChinese) {
              dict.data.theSelectedListInNumber = functions.findTheKeyListFromAddressMap(chinaFlatData, newVal[0]??"", newVal[1]??"", newVal[2]??"")
            }
            context.emit(`update:theSelectedListInChinese`, newVal)
          }
        }),
        theSelectedListInNumber: computed({
          get: () :string[] => {
            const newVal = props.theSelectedListInChinese
            const newNumberList = functions.findTheKeyListFromAddressMap(chinaFlatData, newVal[0]??"", newVal[1]??"", newVal[2]??"")
            if (newNumberList != dict.data.theSelectedListInNumber) {
              dict.data.theSelectedListInNumber = newNumberList
            }
            return newNumberList
          },
          set: (list: string[]) => {
            context.emit(`update:theSelectedListInNumber`, list)
          }
        }),
      },
      functions: {
        onAddressChange: (e: any) => {
          const one = chinaFlatData[e[0]] ?? ''
          const two = chinaFlatData[e[1]] ?? ''
          const three = chinaFlatData[e[2]] ?? ''

          dict.data.province = one?.label ?? ''
          dict.data.city = two?.label ?? ''
          dict.data.county = three?.label ?? ''

          const newChineseList = [one.label, two.label, three.label]
          const newNumberList = [one.value, two.value, three.value]
          if (newNumberList != dict.data.theSelectedListInNumber) {
            // we change it only when changes happen
            dict.data.theSelectedListInChinese = newChineseList
            dict.data.theSelectedListInNumber = newNumberList
          }
        },
      }
    })

    onMounted(async () => {
    })

    return {
      dict,
      context,
      chinaData
    };
  },
});
</script>

<template>
<!--  <el-cascader {...ctx.attrs} :options={options} v-slots={$slots} />-->
  <el-cascader :placeholder="placeholder" :disabled="disabled" v-model="dict.data.theSelectedListInNumber" :options="chinaData" @change="dict.functions.onAddressChange" />
</template>


