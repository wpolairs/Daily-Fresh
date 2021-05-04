<template>
  <div class="page-line-chart">
    <!-- <h4>简单折线图</h4> -->
    <a-button
    class="exportExcel"
     @click="handleDownload"
     :loading='loading'
     type="primary" >
      导出
    </a-button>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: Object.freeze([
          {
            日期: '1/1',
            访问用户: 1393,
            下单用户: 1093,
            下单率: 0.32,
          },
          {
            日期: '1/2',
            访问用户: 3530,
            下单用户: 3230,
            下单率: 0.26,
          },
          {
            日期: '1/3',
            访问用户: 2923,
            下单用户: 2623,
            下单率: 0.76,
          },
          {
            日期: '1/4',
            访问用户: 1723,
            下单用户: 1423,
            下单率: 0.49,
          },
          {
            日期: '1/5',
            访问用户: 3792,
            下单用户: 3492,
            下单率: 0.323,
          },
          {
            日期: '1/6',
            访问用户: 4593,
            下单用户: 4293,
            下单率: 0.78,
          },
        ]),
      },
      exportData: Object.freeze([
        ['1/1', '1393', '1093', '0.32'],
        ['1/2', '1393', '1093', '0.26'],
        ['1/3', '1393', '1093', '0.76'],
        ['1/4', '1393', '1093', '0.349'],
        ['1/5', '1393', '1093', '0.323'],
        ['1/6', '1393', '1093', '0.78'],
      ]),
      loading: false,
    };
  },
  methods: {
    handleDownload() {
      import('@/excel/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: this.chartData.columns,
          data: this.exportData,
          filename: 'filenamewang',
          autoWidth: true,
          bookType: 'xlsx',
        });
      });
    },
  },
};
</script>

<style scoped lang='less'>
.page-line-chart {
  padding-top: 20px;
  .exportExcel{
    position: absolute;
    z-index: 100;
    right: 20px;
    margin-right: 20px;
  }
}
</style>
