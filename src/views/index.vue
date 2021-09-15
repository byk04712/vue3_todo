<!--
 * @Author: 秦真
 * @Date: 2021-09-13 07:28:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-09-15 23:55:25
 * @Description: 主界面
 * @FilePath: /vue3_todo/src/views/index.vue
-->
<template>
  <a-list
    class="index"
    size="small"
    item-layout="horizontal"
    bordered
    :data-source="navList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a-button type="link" :href="item.path">{{ item.label }}</a-button>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
    <template #header>TodoList App</template>
  </a-list>
</template>

<script lang="ts" setup>
interface NavListItem {
  label: string;
  path: string;
  description?: string;
}

const navList: Array<NavListItem> = [
  {
    label: "TodoList 基础版",
    path: "/simple",
    description:
      "仅完成功能，代码未做抽离和封装，缺点可想而知，不利于扩展和维护",
  },
];
</script>

<style lang="less">
.index {
  width: 600px;
  margin: 80px auto 0 !important;
  .ant-list-item-meta-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .ant-btn-link {
      padding-left: 0px;
      color: #1890ff;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
