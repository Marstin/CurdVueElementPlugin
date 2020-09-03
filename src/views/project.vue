<template>
  <el-container class="total-container">
    <el-header style="height:100px">
    <el-form :inline="true" :model="searchModel" class="search-form-inline" size="big">
      <el-form-item label="姓名">
        <el-input v-model="searchModel.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="searchModel.telephone"></el-input>
      </el-form-item>
      <el-form-item class="el-form-search-button-item">
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </el-header>
  <el-divider></el-divider>
    <el-main>
      <div style="text-align: left;margin-bottom:20px;">
      <el-button @click="onAdd">新增</el-button>
      <el-button :disabled="disabledModel.editDisabled" @click="onEdit">修改</el-button>
      <el-button :disabled="disabledModel.delDisabled" @click="onDelete">删除</el-button>
    </div>
      <el-table
        ref="mainTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="telephone" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageModel.pageNo"
        :page-sizes="[10, 20, 50]"
        :page-size="pageModel.pageSize"
        @size-change="pageSizeChanged"
        @current-change="pageNumChanged"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageModel.pageTotal">
      </el-pagination>
    </el-main>
    <el-dialog
    :title="dialogModel.dialogTitle"
    :visible.sync="dialogModel.dialogVisible"
    width="30%">
    <el-form :model="form" ref="appDataForm" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    <el-form-item label="性别">
        <el-input v-model="form.sex" autocomplete="off"></el-input>
      </el-form-item>
    <el-form-item label="手机号码">
        <el-input v-model="form.telephone" autocomplete="off"></el-input>
      </el-form-item>
    <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
    <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogModel.dialogVisible=false">关闭</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </span>
  </el-dialog>
  </el-container>
</template>
  
<script>
  import Services from '@/services/project'
  const { list, add, update, del } = Services;
  export default {
    data(){
      return {
        tableData:[],
        searchModel:{
          name:"",
          telephone:""
        },
        disabledModel:{
          editDisabled: true,
          delDisabled: true
        },
        form:{
          id:"",
          name:"",
          sex:"",
          telephone:"",
          email:"",
          address:""
        },
        pageModel:{
          pageNo:1,
          pageSize:10,
          pageTotal:1
        },
        dialogModel:{
          dialogTitle:'',
          dialogVisible:false
        }
      }
    },
    mounted(){
      this.refreshTable();
    },
    methods:{
      onSearch(){
        this.refreshTable();
      },
      onEdit(){
        this._showDialog("编辑",this.$refs.mainTable.selection[0])
      },
      onAdd(){
        this._showDialog("新增",{})
      },
      onDelete(){
        del(this.$refs.mainTable.selection.map(d => d.id).join()) 
        .then((mes) => this.showMessage(mes))
        .then(() => this.refreshTable())
      },
      onSave(){
        const saveFunc = this.form.id ? update : add;
        saveFunc(this.form)
        .then((mes) => this.showMessage(mes))
        .then(() => this.refreshTable())
      },
       _showDialog(title,data){
        this.form = Object.assign({},data);
        this.dialogModel.dialogTitle = title;
        this.dialogModel.dialogVisible = true;
      },
      showMessage(){
        return new Promise((resolve,reject) => {
          resolve(true)
        })
      },
      handleSelectionChange(){
        const selectedLength = this.$refs.mainTable.selection.length;
        this.disabledModel.editDisabled = this.$refs.mainTable.selection.length !== 1;
        this.disabledModel.delDisabled = this.$refs.mainTable.selection.length  === 0;
      },
      pageSizeChanged(size){
        this.pageModel.pageSize = size;
        this.loadTableData()
      },
      pageNumChanged(num){
        this.pageModel.pageNo = num;
        this.loadTableData()
      },
      refreshTable(params){
        return list(params||this._getQueryParams()).then(data => this.setTableDataAndTotalNum(data));
      },
      setTableDataAndTotalNum(data){
        this.pageModel.pageTotal = data.total;
        this.tableData = this.convertDataToTableData(data.list)
      },
      convertDataToTableData (data) {
        return [...data];
      },
      _getQueryParams(){
        return Object.assign({},{...{pageNo:this.pageModel.pageNo,pageSize:this.pageModel.pageSize},...this.searchModel})
      }
    }
  }
</script>

<style>
  .total-container {
    position: absolute;
    left: 10px;
    right: 10px;
    padding: 10px;
  }
  .el-divider {
    width: 98%;
    margin: 0px auto 10px auto;
  }
  .el-header {
    height: 100px;
    align-items: center;
    display: flex;
  }
  .search-form-inline {
    padding: 20px 20px 0 20px;
  }
  .el-form--inline .el-form-item {
    margin-right: 50px;
  }
  .el-form-search-button-item {
    position: absolute;
    right: 20px;
  }
  .el-pagination {
    position: absolute;
    bottom: -30px;
    right: 70px;
  }
</style>