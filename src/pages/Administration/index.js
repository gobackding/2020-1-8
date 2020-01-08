import React, { Fragment } from "react";
import { Table, Button, Divider, Form, Input, Modal, Pagination } from 'antd';
import { AdministrationStyle } from "./styled"
import Fromlist from "./Fromlist"
import ModifyData from "./ModifyData"
import DeleteUser from "./DeleteUser"
import { DAFAULTDATA, DELETEONE, TRANSMISSIONID, MODIFYDATA } from "@api/Administration"
@Form.create()
class Administration extends React.Component {
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
                },
                {
                    id: 2,
                    username: "zhangsan1",
                    name: "张三1",
                    department: "销售部1",
                    role: "管理1",
                    email: "122552521@qq.com1",
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
            UserName: "",
            Email: "",
            Telephone: "",
            visible: false,
            confirmLoading: false,
            ModifyBool: false,//修改用户资料的弹窗布尔值
            ModifyData: {},//修改用户资料的数据展示给用户看
            DeleteBool: false,//删除用户的页面
            page: 1,
            totalCount: 10
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
                id: 1,
                title: '账号',
                dataIndex: 'username',
                align: 'center',
            },
            {
                id: 2,
                title: '姓名',
                dataIndex: 'name',
                align: 'center',
            },
            {
                id: 4,
                title: '角色',
                dataIndex: 'roleName',
                align: 'center',
            },
            {
                id: 5,
                title: '邮箱',
                dataIndex: 'email',
                align: 'center',
                width: '150px'
            },
            {
                id: 6,
                title: '电话号码',
                dataIndex: 'phone',
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

        return (
            <Fragment >
                <AdministrationStyle className="AdministrationStyle">
                    <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                        当前位置：首页-系统管理-用户管理
                    </div>
                    <div style={{ marginBottom: '12px', padding: '10px' }}>
                        <Input placeholder="请输入账号" value={this.state.User} style={{ width: 150, marginLeft: '12px' }} onChange={this.UserInput.bind(this)} />
                        <Input placeholder="请输入姓名" value={this.state.UserName} style={{ width: 150, marginLeft: '12px' }} onChange={this.UserNameInput.bind(this)} />
                        <Input placeholder="请输入邮箱" value={this.state.Email} style={{ width: 150, marginLeft: '12px' }} onChange={this.EmailInput.bind(this)} />
                        <Input placeholder="请输入电话" value={this.state.Telephone} style={{ width: 150, marginLeft: '12px' }} onChange={this.TelephoneInput.bind(this)} />
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.InspectClick.bind(this)}>查询</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.RestClick.bind(this)}>重置</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.NewlyAdded.bind(this)}>新增</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.DeleteClick.bind(this)}>删除</Button>
                    </div>

                    <div style={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} onChange={this.onChange.bind(this)} />
                    </div>
                    <div className='User' style={{padding:'10px 0',backgroundColor:'#fff'}}>
                        <Pagination showQuickJumper defaultCurrent={this.state.page} total={this.state.totalCount} onChange={this.Pagination.bind(this)} />
                    </div>
                    <div >
                        <Modal
                            title="新增用户"
                            visible={this.state.visible}
                            onOk={this.handleOk.bind(this)}
                            confirmLoading={this.state.confirmLoading}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <Fromlist
                                CancelClick={this.CancelClick.bind(this)}
                                DetermineClick={this.DetermineClick.bind(this)}
                            ></Fromlist>
                        </Modal>
                        <Modal
                            title="修改用户资料"
                            visible={this.state.ModifyBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <ModifyData
                                ModifyData={this.state.ModifyData}
                                CancelClick={this.handleCancel.bind(this)}
                                DetermineClick={this.ModifyData.bind(this)} />
                        </Modal>
                        <Modal
                            title="删除用户"
                            visible={this.state.DeleteBool}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <DeleteUser
                                CancelClick={this.handleOk.bind(this)}
                                ModifyData={this.state.ModifyData}
                                DetermineClick={this.DeletehandleCancel.bind(this)} />
                        </Modal>
                    </div>

                </AdministrationStyle>
            </Fragment>
        )
    }
    componentDidMount() {
        this.statrtsHandler()
    }
    // 分页器
    Pagination(pageNumber) {
        let FromInformation = {}
        FromInformation.username = this.state.User
        FromInformation.name = this.state.UserName
        FromInformation.email = this.state.Email
        FromInformation.phone = this.state.Telephone
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
        FromInformation.username = this.state.User
        FromInformation.name = this.state.UserName
        FromInformation.email = this.state.Email
        FromInformation.phone = this.state.Telephone
        FromInformation.page = this.state.page
        this.DafaultdataList(FromInformation)
    }
    statrtsHandler() {
        let obj = {}
        obj.name = ''
        obj.email = ''
        obj.phone = ''
        obj.username = ''
        obj.page = 1
        this.DafaultdataList(obj)
    }
    async DafaultdataList(val) {
        console.log(val)
        let data = await DAFAULTDATA(val)
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
    DetermineClick(val) {
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
        let data = await DELETEONE(val.id)
        console.log(data)
        if (data.msg == '成功') {
            this.setState({
                DeleteBool: false
            }, () => {
                let FromInformation = {}
                FromInformation.username = this.state.User
                FromInformation.name = this.state.UserName
                FromInformation.email = this.state.Email
                FromInformation.phone = this.state.Telephone
                FromInformation.page = this.state.page
                this.DafaultdataList(FromInformation)
            })
        }
    }
    //   请输入账号
    UserInput(e) {
        this.setState({
            User: e.target.value
        })
    }
    // 请输入姓名
    UserNameInput(e) {
        this.setState({
            UserName: e.target.value
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
        FromInformation.username = this.state.User
        FromInformation.name = this.state.UserName
        FromInformation.email = this.state.Email
        FromInformation.phone = this.state.Telephone
        FromInformation.page = 1
        this.DafaultdataList(FromInformation)
    }
    // 重置
    RestClick() {
        this.setState({
            User: "",
            UserName: "",
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
        let data = await DELETEONE(str)
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
        let data = await TRANSMISSIONID(arguments[1].id)
        this.setState({
            ModifyBool: true,
            ModifyData: data.data
        })
    }
    // 查看按钮
    AbolishHandlerValue() {

    }
    // 删除
    DeleteHandlerValue(val) {
        console.log(val)
        this.setState({
            ModifyData: val,
            DeleteBool: true
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
        let data = await MODIFYDATA(val)
        console.log(data, '454654')
        console.log(val, '传过来了')
        if (data.msg == '成功') {
            this.InspectClick()
            this.setState({
                ModifyBool: false
            })
        }
    }

}
export default Administration