<template>
  <div class="productlist">
    <search @searchForm="searchForm" :categoryData='categoryList'/>
    <table-list
    :data="tableData"
    :page='page'
    :loading='loading'
    @changePage='changePage'
    @deleteProduct='deleteProduct'
    @editProduct='editProduct'
    />
  </div>
</template>

<script>
import search from '@/components/search.vue';
import tableList from '@/components/tableList.vue';
import api from '@/api/products';
import searchApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchFrom: [],
      categoryList: [],
      catagoryObj: {},
      page: {
        current: 1,
        pageSize: 8,
        showSizeChanger: true,
        total: 0,
      },
      loading: true,
    };
  },
  components: {
    search,
    tableList,
  },
  async created() {
    await this.getCategoryList();
    this.getTableData();
  },
  methods: {
    // 获取类目列表数据
    getCategoryList() {
      searchApi
        .getCategoryList()
        .then((res) => {
          this.categoryList = res.data;
          res.data.forEach((item) => {
            this.catagoryObj[item.id] = item;
          });
        });
    },
    // 获取商品数据
    getTableData() {
      api.getProducts({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchFrom,
      }).then((res) => {
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.catagoryObj[item.category] ? this.catagoryObj[item.category].name : '',
        }));
        this.loading = false;
      });
    },
    // 编辑商品信息
    editProduct(record) {
      this.$router.push({
        name: 'edit',
        params: {
          id: record.id,
        },
      });
    },
    // 删除商品
    deleteProduct(record) {
      this.$confirm({
        title: `Do you Want to delete ${record.c_item}?`,
        content: () => <div style="color:red;">删除后商品将不再展示</div>,
        onOk() {
          api.deleteProducts({ id: record.id }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
    // 切换页码
    changePage(page) {
      this.page.current = page.current;
      this.page.pageSize = page.pageSize;
      this.getTableData();
    },
    searchForm(searchFrom) {
      this.searchFrom = searchFrom;
      this.getTableData();
    },
  },
};
</script>
