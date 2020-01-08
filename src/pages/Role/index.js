import React, { Fragment } from "react";
import { Table, Button, Divider, Form, Input, Modal, Pagination } from 'antd';
import { AdministrationStyle } from "./styled"
import Fromlist from "./Fromlist"
import ModifyData from "./ModifyData"
import DeleteUser from "./DeleteUser"
import { NEWLYROLE, DELETEROLE, EDITDATA, SINGLESTRIP, PAGELIST } from "@api/Role"
import { Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
@Form.create()
class Role extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    id: 1,
                    username: "zhangsan",
                    name: "张三",
                    department: "销售部",
                    role: "管理",
                    email: "122552521@qq.com",
                    Telephone: 13345253149,
                    createTime: "2019-08-23"
                }
            ],
            selectedRowKeys: [],
            loading: false,
            filteredInfo: null,
            sortedInfo: null,
            keyWord: "",
            TableName: "",
            User: "",
            userName: "",
            Email: "",
            Telephone: "",
            visible: false,
            confirmLoading: false,
            ModifyBool: false,//修改用户资料的弹窗布尔值
            ModifyDatas: {},//修改用户资料的数据展示给用户看
            DeleteBool: false,//删除用户的页面
            page: 1,
            totalCount: 10,
            DeleteData: {},
            name: '',
            description: '',
            RoleList: '',
            ModifyData: { permissionList: [] }
        }
    }
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };


    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                id: 2,
                title: '姓名',
                dataIndex: 'userName',
                align: 'center',
            },
            {
                id: 4,
                title: '角色',
                dataIndex: 'name',
                align: 'center',
            },
            {
                id: 5,
                title: '权限名称',
                dataIndex: 'permissionName',
                align: 'center',
                width: '150px'
            },
            {
                id: 6,
                title: '说明',
                dataIndex: 'description',
                align: 'center',
            },
            {
                id: 7,
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                key: 'operation',
                width: "150px",
                ellipsis: true,
                render: (text, record) => {
                    return <span>
                        <a onClick={this.EditHandlerValue.bind(this, text, record)}>编辑</ a>
                        <Divider type="vertical" />
                        <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</ a>
                    </span>

                },
            }
        ];
        let ModifyData = this.state.ModifyData
        console.log(ModifyData, 'ModifyData')
        let Array = []
        if (ModifyData.chickPermissionList) {
            for (var i = 0; i < ModifyData.chickPermissionList.length; i++) {
                Array.push(ModifyData.chickPermissionList[i].name)
            }
        }
        return (
            <Fragment >
                <AdministrationStyle className="AdministrationStyle">
                    <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                        当前位置：首页-系统管理-角色管理
                    </div>
                    <div style={{ marginBottom: '12px', padding: '10px' }}>

                        <Input placeholder="请输入角色" value={this.state.userName} style={{ width: 150, marginLeft: '12px' }} onChange={this.UserNameInput.bind(this)} />
                        <Input placeholder="请输入说明" value={this.state.Email} style={{ width: 150, marginLeft: '12px' }} onChange={this.EmailInput.bind(this)} />
                        <Input placeholder="权限名称" value={this.state.Telephone} style={{ width: 150, marginLeft: '12px' }} onChange={this.TelephoneInput.bind(this)} />
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.InspectClick.bind(this)}>查询</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.RestClick.bind(this)}>重置</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.NewlyAdded.bind(this)}>新增</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.DeleteClick.bind(this)}>删除</Button>
                    </div>

                    <div  style={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} onChange={this.onChange.bind(this)} />
                    </div>
                    <div className='User' style={{ padding: '10px 0', backgroundColor: '#fff' }}>
                        <Pagination showQuickJumper defaultCurrent={this.state.page} total={this.state.totalCount} onChange={this.Pagination.bind(this)} />
                    </div>
                    <div >
                        <Modal
                            title="新增角色"
                            visible={this.state.visible}
                            onOk={this.handleOk.bind(this)}
                            confirmLoading={this.state.confirmLoading}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <Fromlist
                                CancelClick={this.CancelClick.bind(this)}
                                DetermineClick={this.ClearFromList.bind(this)}
                            ></Fromlist>
                        </Modal>
                        <Modal
                            title="修改用户资料"
                            visible={this.state.ModifyBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                                <span>角色</span>
                                <Input type="text"
                                    value={this.state.name}
                                    style={{ width: '400px', height: '45px' }}
                                    onChange={this.nameInput.bind(this)} />

                            </label>
                            <br></br>
                            <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                                <span>权限</span>
                                <Select
                                    mode="multiple"
                                    style={{ width: '400px' }}
                                    placeholder="请选择角色权限"
                                    defaultValue={Array}
                                    onChange={this.RoleInput.bind(this)}
                                >
                                    {
                                        ModifyData.permissionList.map((item) => {
                                            return <Option key={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </label>
                            <br></br>
                            <label style={{ display: 'flex', justifyContent: 'space-around' }} >
                                <span>说明</span>
                                <TextArea mode="multiple"
                                    placeholder="请选择用户权限"
                                    value={this.state.description}
                                    style={{ width: 400, height: 100 }} onChange={this.UserNameInputs.bind(this)} />
                            </label>
                            <br></br>

                            <br></br>
                            <div>
                                <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                                <Button style={{ marginLeft: '20px' }} onClick={this.CancelClick.bind(this)}>取消</Button>
                            </div>
                        </Modal>
                        <Modal
                            title="删除用户"
                            visible={this.state.DeleteBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <DeleteUser
                                CancelClick={this.handleOk.bind(this)}
                                ModifyData={this.state.DeleteData}
                                DetermineClick={this.DeletehandleCancel.bind(this)} />
                        </Modal>
                    </div>

                </AdministrationStyle>
            </Fragment>
        )
    }
    ClearFromList(val){
        this.setState({
            visible:false
        },()=>{
            this.statrtsHandler()
        })
    }
    componentDidMount() {
        this.statrtsHandler()
    }
    // 分页器
    Pagination(pageNumber) {
        let FromInformation = {}
        FromInformation.userName = this.state.userName
        FromInformation.description = this.state.Email
        FromInformation.permissionName = this.state.Telephone
        FromInformation.page = pageNumber
        this.DafaultdataList(FromInformation)
    }
    // 关于多选删除
    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    PublicHandler() {
        let FromInformation = {}
        FromInformation.userName = this.state.userName
        FromInformation.description = this.state.Email
        FromInformation.permissionName = this.state.Telephone
        FromInformation.page = this.state.page
        this.DafaultdataList(FromInformation)
    }
    statrtsHandler() {
        let obj = {}
        obj.userName = ''
        obj.description = ''
        obj.permissionName = ''
        obj.page = 1
        this.DafaultdataList(obj)
    }
    async DafaultdataList(val) {
        console.log(val)
        let data = await PAGELIST(val)
        console.log(data, 'dsakdnasdn')
        this.setState({
            data: data.data.list,
            page: data.data.currPage,
            totalCount: data.data.totalCount
        })
    }
    // 取消关闭弹窗
    CancelClick() {
        this.setState({
            visible: false
        })
    }
    // q确定关闭
    DetermineClicks(val) {
        if (val == '成功') {
            this.setState({
                visible: false
            })
            this.PublicHandler()
        }

    }
    // 点击确定关闭弹窗
    handleOk() {
        this.setState({
            visible: false,
            confirmLoading: false,
            ModifyBool: false,
            DeleteBool: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false,
            ModifyBool: false,
            DeleteBool: false
        });
    }
    async DeletehandleCancel(val) {
        console.log(val)
        let data = await DELETEROLE(val.id)
        if (data.msg == '成功') {
            this.setState({
                DeleteBool: false
            }, () => {
                this.PublicHandler()
            })
        }
    }
    // 请输入姓名
    UserNameInput(e) {
        this.setState({
            userName: e.target.value
        })
    }
    // 请输入邮箱
    EmailInput(e) {
        this.setState({
            Email: e.target.value
        })
    }
    // 请输入电话号码
    TelephoneInput(e) {
        this.setState({
            Telephone: e.target.value
        })
    }
    // 查询
    InspectClick() {
        let FromInformation = {}
        FromInformation.userName = this.state.userName
        FromInformation.description = this.state.Email
        FromInformation.permissionName = this.state.Telephone
        FromInformation.page = 1
        console.log(FromInformation)
        this.DafaultdataList(FromInformation)
    }
    // 重置
    RestClick() {
        this.setState({
            userName: "",
            Email: "",
            Telephone: ""
        }, () => {
            this.statrtsHandler()
        })
    }
    // 删除
    async DeleteClick() {
        let DataList = this.state.data
        let selectedRowKeys = this.state.selectedRowKeys
        let str = ''
        let IdList = []
        for (var i = 0; i < DataList.length; i++) {
            for (var k = 0; k < selectedRowKeys.length; k++) {
                if (i == selectedRowKeys[k]) {
                    IdList.push(DataList[i].id)
                }
            }
        }
        let List = Array.from(new Set(IdList))
        for (var j = 0; j < List.length; j++) {
            str += ',' + List[j]
        }
        console.log(str)
        let data = await DELETEROLE(str)
        console.log(data, '删除返回的')
        if (data.msg == '成功') {
            this.InspectClick()
        }
    }
    // 新增
    NewlyAdded() {
        this.setState({
            visible: true
        })
    }
    // 编辑按钮
    async EditHandlerValue(text, record) {
        let data = await EDITDATA(arguments[1].id)
        console.log(data, '编辑')
        this.setState({
            name:data.data.name,
            description:data.data.description,
            ModifyData: data.data,
            ModifyBool: true
        }, () => {
            console.log(this.state.ModifyData, '看看是否已经修改')
        })
    }
    // 删除
    DeleteHandlerValue(val) {
        console.log(val)
        this.setState({
            DeleteData: val,
            DeleteBool: true
        }, () => {
            console.log(this.state.ModifyData)
        })
    }
    // 表名筛选
    TableNameFilter(value, record) {
        console.log(value)

    }
    onChange(pagination, filters, sorter, extra) {

    }
    // 表单确定按钮
    handleLogin() {

    }
    // 修改数据
    async ModifyData(val) {
        console.log(val, '别关闭')
        let data = await SINGLESTRIP(val)
        console.log(data, '454654')
        if (data.msg == '成功') {
            this.setState({
                ModifyBool: false
            }, () => {
                this.InspectClick()
            })
        }
    }
    // 区分  xiugai
    RoleInput(val) {
        this.setState({
            RoleList: val
        })
    }
    nameInput(e) {
        this.setState({
            name: e.target.value
        })
    }
    // 取消按钮
    CancelClick() {
        this.handleOk()
    }
    // 确定
    DetermineClick() {
        // 选择权限的
        let FromData = {}
        let JurisdictionArray = []
        if (this.state.RoleList[0]) {
            let Jurisdiction = this.state.ModifyData.RoleList
            let JurisdictionList = this.state.ModifyData.permissionList
            for (var j = 0; j < JurisdictionList.length; j++) {
                for (var g = 0; g < Jurisdiction.length; g++) {
                    if (Jurisdiction[g] == JurisdictionList[j].id || Jurisdiction[g] == JurisdictionList[j].name) {
                        JurisdictionArray.push(JurisdictionList[j].id)
                    }
                }
            }
        } else {
            console.log(this.state.ModifyData)
            let chickPermissionList = this.state.ModifyData.chickPermissionList
            for (var j = 0; j < chickPermissionList.length; j++) {
                JurisdictionArray.push(chickPermissionList[j].id)
            }
        }
        FromData.id = this.state.ModifyData.id
        FromData.name = this.state.name
        FromData.permissionids = JurisdictionArray
        FromData.description = this.state.description
        this.ModifyData(FromData)
        console.log(FromData)

    }
    // 姓名
    UserNameInputs(e) {
        this.setState({
            description: e.target.value
        })
    }
}
export default Role