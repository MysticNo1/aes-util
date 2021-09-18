<template>
	<div class="hello">
		<el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<span>密码:</span>
					<el-input class="text-input" placeholder="请输入密码" v-model="key" clearable>
					</el-input>
					<span>偏移量:</span>
					<el-input class="text-input iv" placeholder="请输入内容" v-model="iv" clearable>
					</el-input>
					<el-button type="danger" @click="EncryptData()">加密</el-button>
					<el-button type="warning" @click="DecryptData()">解密</el-button>
					<el-button type="success" v-clipboard:copy="resultData" v-clipboard:success="onCopy"
						v-clipboard:error="onError">复制结果文本</el-button>
          <el-button type="success" v-clipboard:copy="resultJsonData" v-clipboard:success="onCopyJSON"
                     v-clipboard:error="onError">复制JSON文本</el-button>
					<el-button type="primary" v-clipboard:copy="resultData" v-clipboard:success="copyToRawData"
						v-clipboard:error="onError">结果复制到输入框</el-button>
          <el-button type="info" @click="clearRawData()">清空输入框</el-button>
          <el-button type="info" @click="clearResultData()">清空JSON文本</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-input class="textarea" type="textarea" :autosize="{ minRows: 40}" placeholder="请输入加密/解密内容"
						v-model="rawData">
					</el-input>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-light">
					<vue-json-editor style="height: 852px" v-model="resultJsonData" :showBtns="false" :mode="mode" />
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import vueJsonEditor from 'vue-json-editor'
	import {
		Encrypt,
		Decrypt
	} from '@/common/aes.js'
	export default {
		components: {
			vueJsonEditor
		},
		data() {
			return {
        mode: 'text',
				key: '1raa70xiea6r1qm0',
				iv: '83h8ew1kx0gcsn4x',
				rawData: '',
				resultData: '',
				resultJsonData: null
			}
		},
		methods: {
			// 判断是否为json字符串
			isJSON(str) {
				if (typeof str == 'string') {
					try {
						var obj = JSON.parse(str);
						if (typeof obj == 'object' && obj) {
							return true;
						} else {
							return false;
						}
					} catch (e) {
						return false;
					}
				}
				console.log('It is not a string!')
			},
			// 加密
			EncryptData() {
				this.resultData = Encrypt(this.rawData, this.key, this.iv)
				if (this.isJSON(this.resultData)) {
					this.resultJsonData = JSON.parse(this.resultData)
				} else {
					this.resultJsonData = this.resultData
				}
			},
			// 解密
			DecryptData() {
				this.resultData = Decrypt(this.rawData, this.key, this.iv)
				if (this.isJSON(this.resultData)) {
					this.resultJsonData = JSON.parse(this.resultData)
				} else {
					this.resultJsonData = this.resultData
				}
			},
			// 清空输入框
			clearRawData() {
				this.rawData = ''
			},
			// 清空结果数据
      clearResultData() {
        this.resultData = ''
        this.resultJsonData = ''
			},
      //结果复制到输入框
			copyToRawData: function(e) {
				this.rawData = e.text
				this.$message({
					message: '复制成功',
					type: 'success'
				});
			},
			// 复制结果数据
			onCopy: function(e) {
				this.$message({
					message: '复制成功',
					type: 'success'
				});
			},
      // 复制JSON数据
      onCopyJSON: function(e) {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      },
			onError: function(e) {
				this.$message.error('复制失败');
			}
		}
	}
</script>

<style lang="less">
	.grid-content{
		padding: 5px;
		span{
			color: #FFFFFF;
			margin:0 10px;
		}
		.jsoneditor-vue {
			height: 100%;
		}
	}

</style>
<style scoped>
	.el-row {
		margin-bottom: 5px;
	}

	.text-input {
		width: 200px;
		margin-right: 10px;
	}

	.bg-purple-dark {
		font-size: 14px;
		padding: 10px;
		background: #55557f;
		height: 38px;
	}

	.bg-purple-light {
		text-align: left;
	}

	.grid-content {
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
