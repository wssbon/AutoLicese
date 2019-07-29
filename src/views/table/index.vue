<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchData" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button type="primary" @click="isShow = true">增加</el-button>
    </div>
    <el-table v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
    >
      <el-table-column align="center" width="95" label="姓名" >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="ID"  width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="Title"  width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="ID"  width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="Title"  width="350" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="150" align="center">
        <el-button type="primary"  @click="isShownode = true">生成特征码</el-button>
      </el-table-column>
    </el-table>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="page" :page-sizes="[1, 2,5, 10]" :page-size="limit"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!--点击增加 弹框-->
    <el-dialog :visible.sync="isShow">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="特征码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--生成特征码 弹框-->
    <el-dialog :visible.sync="isShownode">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="特征码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getList } from '@/api/table'

export default {
  data() {
    //弹框表单
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    return {
      data: [],
      limit: 5,
      total: null,
      page: 1,
      searchData: "",
      listLoading: true,
      list: null,
      input: '',
      restaurants: [],
      state: '',
      timeout: null,
      isShow: false,
      formData: '',
      isShownode:false,
      //
      ruleForm: {
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.pageList()
  },
  methods: {
    //弹框
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据
      getList().then(response => {
        console.log(response)
        this.listLoading = false
        this.data = response.data.items
        this.getList()
      })
    },
    // 处理数据
    getList() {
      // 过滤得到满足搜索条件的展示数据list
      let list = this.data.filter((item, index) =>
        item.id.includes(this.searchData)
      )
      this.list = list.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.total = list.length
    },
    // 当每页数量改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.getList()
    },
    // 当当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getList()
    },
    handleItem() {

    },
    // 搜索过滤数据
    search() {
      this.page = 1
      this.getList()
    }
  }
}
</script>
<style lang="scss">
  .filter-container{
    margin-bottom: 20px;
  }
  .filter-container .el-input{
    display: inline-block;
    width: 20%;
  }
  .el-pagination{
    margin-top: 20px;
  }
</style>
