<template>
<div class="tableData">
  <a-table
    :columns="columns"
    :data-source="tableData"
    @change="changePage"
    :pagination="page"
    :loading="loading"
    >
    <div slot="operation" slot-scope="text, record">
        <a-button class="editProduct" @click="editProduct(record)">编辑</a-button>
        <a-button type="danger" class="deleteProduct" @click="deleteProduct(record)">删除</a-button>
    </div>
  </a-table>
</div>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量 ',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态 ',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '未上架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 200,
  },
];

export default {
  props: ['data', 'page', 'loading'],
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(pagination) {
      this.$emit('changePage', pagination);
    },
    deleteProduct(record) {
      this.$emit('deleteProduct', record);
    },
    editProduct(record) {
      this.$emit('editProduct', record);
    },
  },
};
</script>

<style scoped lang='less'>
.tableData{
  margin-top: 20px;
}
</style>
