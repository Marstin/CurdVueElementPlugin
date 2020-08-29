<template>
  <el-container class="total-container">
    <el-header style="height:100px">
      <el-form :inline="true" :model="searchModel" class="search-form-inline" size="big">
        <el-form-item label="名称">
          <el-input v-model="searchModel.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="searchModel.telePhone"></el-input>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="sex" label="性别" width="200"></el-table-column>
        <el-table-column prop="telephone" label="手机号码"  width="200"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="240"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageNo"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        @size-change="pageSizeChanged"
        @current-change="pageNumChanged"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
        </el-pagination>
    </el-main>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="form" ref="appDataForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="form.sex" :rows="3" autocomplete="off"></el-input>
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
        <el-button @click="_hideDialog()">关闭</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import Services from '@/service/project'
const { list, add, update, del } = Services;
export default {
  data(){
    return {
      tableData:[],
      searchModel:{
        name:'',
        telephone:''
      },
      disabledModel:{
        editDisabled: true,
        delDisabled: true
      },
      form:{
        id:"",
        name:"",
        sex:"",
        email:"",
        age:"",
        address:"",
        telephone:""
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
      this._showDialog("新增",this.$refs.mainTable.selection[0])
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
      let saveFunc = this.form.id ? update : add;
      saveFunc(this.form)
      .then((mes) => this.showMessage(mes))
      .then(() => this.refreshTable())
    },
    showMessage(){
      return new Promise((resolve,reject) => {
        resolve(true)
      })
    },
    _showDialog(title,data){
      this.form = Object.assign({},data);
      this.dialogTitle = title;
      this.dialogVisible = true;
    },
    pageSizeChanged(size){
      this.pageSize = size;
      this.loadTableData()
    },
    pageNumChanged(num){
      this.pageNo = num;
      this.loadTableData()
    },
    refreshTable(params){
      return list(params||this._getQueryParams()).then(data => this.tableData = this.convertDataToTableData(data));
    },
    convertDataToTableData = (data) => [...ret] = [...data],
    _getQueryParams(){
      return Object.assign({},{...{pageNo:this.pageNo,pageSize:this.pageSize},...this.searchModel})
    }
  }
}
</script>