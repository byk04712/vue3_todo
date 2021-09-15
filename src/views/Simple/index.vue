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
      <template #renderItem="{ item }">
        <a-list-item>
          <a-checkbox v-model:checked="item.done">
            <a-input
              v-if="item.editable"
              :default-value="item.todo"
              @change="handleChange(item, $event)"
              @keydown.enter="item.editable = false"
              @blur="item.editable = false"
            ></a-input>
            <template v-else>{{ item.todo }}</template>
          </a-checkbox>
          <template #actions>
            <!-- 编辑按钮 -->
            <a-button type="text" @click="handleEdit(item)">
              <template #icon>
                <edit-outlined />
              </template>
            </a-button>
            <!-- 删除按钮 -->
            <a-button type="text" @click="handleRemove(item)">
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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";

interface TodoListItem {
  id: number; // 数据唯一ID
  todo: string; // 事项标题
  done: boolean; // 是否已完成
  editable?: boolean; // 是否可编辑
}

export default defineComponent({
  name: "Simple",

  components: {
    EditOutlined,
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
        id: 1631719673260,
        todo: "做早餐",
        done: true,
      },
      {
        id: 1631719673261,
        todo: "健身2小时",
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
        id: Date.now(),
        todo: todo.value,
        done: false,
      };
      todoList.value.push(todoItem);
      // 添加后清空
      todo.value = "";
    }

    // 输入框文本变更事件
    function handleChange(item: TodoListItem, evt: InputEvent) {
      const current = todoList.value.find(
        (e: TodoListItem) => e.id === item.id
      );
      if (current) {
        current.todo = (evt.target as HTMLInputElement).value;
      }
    }

    // 编辑代办事项
    function handleEdit(item: TodoListItem) {
      const index = todoList.value.findIndex(
        (e: TodoListItem) => e.id === item.id
      );
      todoList.value[index].editable = true;
    }

    // 删除待办事项
    function handleRemove(item: TodoListItem) {
      const index = todoList.value.findIndex(
        (e: TodoListItem) => e.id === item.id
      );
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
      handleChange,
      handleEdit,
      handleRemove,
    };
  },
});
</script>

<style lang="less">
.todo-list {
  margin: 80px auto 0 !important;
  width: 600px;
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    &-checked {
      text-decoration: line-through;
    }
  }
}
</style>
