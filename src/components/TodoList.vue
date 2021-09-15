<template>
  <a-card class="todo-list" bordered>
    <!-- 头部栏 -->
    <template #title>
      <a-input-search
        v-model:value="todo"
        placeholder="在此输入待办事项"
        enter-button="添加待办"
        size="large"
        @search="handlePush"
      />
    </template>
    <!-- 内容区域 -->
    <a-list :data-source="filteredTodoList">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <a-checkbox v-model:checked="item.done">
            {{ item.todo }}
          </a-checkbox>
          <template #actions>
            <a-button type="text" @click="handleRemove(index)">
              <template #icon>
                <delete-outlined />
              </template>
            </a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
    <!-- 底部过滤栏 -->
    <template #actions>
      <a-button
        block
        size="large"
        :type="filter === 'all' ? 'primary' : 'default'"
        @click="filter = 'all'"
        >全部({{ all }})</a-button
      >
      <a-button
        block
        size="large"
        :type="filter === 'completed' ? 'primary' : 'default'"
        @click="filter = 'completed'"
        >已完成({{ completed }})</a-button
      >
      <a-button
        block
        size="large"
        :type="filter === 'uncompleted' ? 'primary' : 'default'"
        @click="filter = 'uncompleted'"
        >未完成({{ uncompleted }})</a-button
      >
    </template>
  </a-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";

interface TodoListItem {
  todo: string; // 事项标题
  done: boolean; // 是否已完成
}

export default defineComponent({
  components: {
    DeleteOutlined,
  },
  setup() {
    // 待办输入项文本值
    const todo = ref<string>("");
    // 当前过滤项
    const filter = ref<string>("all");
    // 事项列表
    const todoList: Ref<Array<TodoListItem>> = ref([
      {
        todo: "做早餐",
        done: true,
      },
      {
        todo: "健身两小时",
        done: false,
      },
    ]);

    // 计算属性，获取过滤后的待办事项
    const filteredTodoList = computed(() => {
      if (filter.value === "all") return todoList.value;
      if (filter.value === "completed")
        return todoList.value.filter((e) => e.done);
      if (filter.value === "uncompleted")
        return todoList.value.filter((e) => !e.done);
      return todoList.value;
    });
    // 计算属性，获取所有状态的待办事项数量
    const all = computed(() => todoList.value.length);
    // 计算属性，获取已完成的待办事项数量
    const completed = computed(
      () => todoList.value.filter((e) => e.done === true).length
    );
    // 计算属性，获取未完成的待办事项数量
    const uncompleted = computed(
      () => todoList.value.filter((e) => e.done === false).length
    );

    // 添加待办事项
    function handlePush() {
      const todoItem: TodoListItem = {
        todo: todo.value,
        done: false,
      };
      todoList.value.push(todoItem);
      // 添加后清空
      todo.value = "";
    }

    // 删除待办事项
    function handleRemove(index: number) {
      todoList.value.splice(index, 1);
    }

    return {
      // data
      filter,
      todo,
      filteredTodoList,
      all,
      completed,
      uncompleted,

      // method
      handlePush,
      handleRemove,
    };
  },
});
</script>

<style lang="less">
.todo-list {
  margin: 0 auto !important;
  width: 600px;
  .ant-checkbox-wrapper {
    &-checked {
      text-decoration: line-through;
    }
  }
}
</style>
