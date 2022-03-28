<template>
    <div>

        <div class="analyse">
            <div style="">
                <span style="display: block;color: #00000073"><strong>总销售额</strong>
                </span>
                <span style="font-family: -apple-system,serif;font-size:30px">
                    ￥{{allSale}}
                </span>
            </div>
            <div class="day">
                <span style="font-family: -apple-system,serif;font-size:14px;color:black">日销售总额&nbsp;&nbsp;￥{{currentSale}}</span>
            </div>

        </div>
        <div class="analyse">
            <div style=" border-bottom: 1px;
        border-style: solid;
        border-color: darkgrey;
        border-top: none;
        border-left: none;
        border-right: none;">
                <span style="display: block;color: #00000073"><strong>日销售量</strong>
                </span>
                <span style="font-family: -apple-system,serif;font-size:30px">
                  {{currentSale}}
                </span>

            </div>
            <div class="day">
                <span style="font-family: -apple-system,serif;font-size:14px;color:black">日销售量&nbsp;&nbsp; {{currentSale}}</span>
            </div>

        </div>
        <div class="analyse">
            <div style=" border-bottom: 1px;
        border-style: solid;
        border-color: darkgrey;
        border-top: none;
        border-left: none;
        border-right: none;">
                <span style="display: block;color: #00000073"><strong>一周内销售总额</strong>
                </span>
                <span style="font-family: -apple-system,serif;font-size:30px">
                    ￥{{weeklySale}}
                </span>
                <div>

                </div>
            </div>
            <div class="day">
                <span style="font-family: -apple-system,serif;font-size:14px;color:black">一周内销售总额&nbsp;&nbsp;￥{{weeklySale}}</span>
            </div>

        </div>
        <div style="width: 1266px;height:400px;display: inline-block;
        margin:5px;background: #fff;">
            <a-row>
                <a-col :span="14">
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="一周内每周销售额">
                            <ve-histogram :data="chartData1"></ve-histogram>

                        </a-tab-pane>
                    </a-tabs>
                </a-col>

            </a-row>

        </div>

    </div>
</template>

<script>

    import {sales, weeklySales} from '../api/admin'

    export default {
        name: "Analyse",
        components: {},
        methods: {


            getChartData() {
                weeklySales().then(res => {
                    let arr = res.data.data;
                    let index = 1;
                    arr.forEach(item => {
                        this.weeklySale+=item;
                        this.chartData1.rows.push({'日期': index, '销售额': item});
                        index++;
                    })
                    console.log(JSON.stringify(this.chartData1));
                });
            },


            getAllSale() {
                sales().then(res => {
                    this.allSale = res.data.data;
                })
            },
            getCurrentSale() {

                sales({
                    beginTime: this.getCurrentDate(),
                    endTime: this.getCurrentDate()
                }).then(res => {
                    this.currentSale = res.data.data;
                });
            },
            getCurrentDate() {
                const nowDate = new Date();
                const year = nowDate.getFullYear();
                const month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
                    : nowDate.getMonth() + 1;
                const day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
                    .getDate();
                return year + "-" + month + "-" + day;
            }


        },
        created() {
            this.getChartData();
            this.getCurrentSale();
            this.getAllSale();
        },
        data() {
            this.chartSettings = {
                dimension: '日期',
                metrics: '访问用户'
            }
            return {



                weeklySale:0,

                allSale: '',
                currentSale: '',

                chartData1: {
                    columns: ['日期', '销售额'],
                    rows: []
                },

                chartData: {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
                        {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
                        {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
                        {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
                        {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
                        {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

    div.day {

        line-height: 170px
    }

    a {
        color: #000000A6;
        font-size: 15px;


    }

    a:hover {
        color: #1890ff;
    }

    div.analyse {

        background: #fff;
        width: 415px;
        height: 181px;
        display: inline-block;
        margin: 5px;
        /* margin: '24px 16px'; padding: '24px', background: '#fff', minHeight: '630px'*/
    }
</style>
