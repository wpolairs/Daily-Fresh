<template>
  <div class="productlist">
    <search @searchForm="searchForm" :categoryData='categoryList'/>
    <table-list :data="tableData" :page='page' @changePage='changePage' />
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
        pageSize: 5,
        showSizeChanger: true,
        total: 0,
      },
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
        console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.catagoryObj[item.category].name,
        }));
      });
    },
    // 切换页码
    changePage(page) {
      this.page.current = page.current;
      this.page.pageSize = page.pageSize;
      this.getTableData();
      console.log(page);
    },
    searchForm(searchFrom) {
      this.searchFrom = searchFrom;
      this.getTableData();
    },
  },
};
</script>
