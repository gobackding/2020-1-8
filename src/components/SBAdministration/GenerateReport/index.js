import React, { Fragment } from "react";
import { Button, Modal, Input, Select, Card, Col, Row ,message} from "antd"
import {  CHECKVALUEPAI } from "@api"
import Calendar from "./calendar"
import ReverseChecking from "./ReverseChecking"
import { SCSHVALUE, FYLISTFROM, HQLCLIST, LCTIME, TXTAPI } from "@api/SHGL.js"
import Axios from "axios";
const { Option } = Select;

class SBAdministration extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    id: '1',
                    ruleSeq: 'John Brown',
                    ruleDesc: 32,
                    srcTabNameCn: '中国',
                    srcTabNameEn: 'Chinese',
                    dataFieldCode: 32,
                    sfsjzl: 50,
                    sfsjbl: "20%",
                    cjrq: 20120101
                }
            ],
            visible: false,
            ReverseChecking: false,
            EditListValue: [],
            Rotation: "",
            calendarTime: "",
            calendarTime: "请选择时间",
            SelectArray: [1],
            totalJCSJZL: '0',
            totalRuleSeq: '0',
            totalSFSJBL: '0',
            totalSFSJZL: '0',
            dcdatasum: '0'
        }

    }
    render() {

        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-上报管理
                </div>
                <div style={{ padding: '10px', height: '100%' }} className="SHLSFX">
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                onClick={this.RLClickhandler.bind(this)}
                                style={{
                                    width: '100px',
                                    height: '32px',
                                    border: 'solid 1px #d9d9d9',
                                    borderRadius: '4px',
                                    backgroundColor: '#fff',
                                    display: 'inline-block',
                                    margin: '6px',
                                    color: '#666',
                                    lineHeight: '32px',
                                    paddingLeft: '5px'
                                }} >
                                {this.state.calendarTime}
                            </div>
                            <Select defaultValue="请选择轮次" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                {
                                    this.state.SelectArray.map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select>
                            <Button type="primary" style={{ margin: '6px' }} onClick={this.QueryData.bind(this)}>生成报告</Button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input placeholder="请选择导出数量"
                                value={this.state.dcdatasum}
                                style={{ marginRight: '20px' }}
                                onChange={this.DCSumInput.bind(this)} />
                            <Button type="primary" onClick={this.DCExcel.bind(this)}>导出样本</Button>
                            <Button type="primary"
                                onClick={this.SCSBClickhandler.bind(this)}
                                style={{ margin: '6px' }}>上报</Button>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <Row gutter={16}>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="检查规则数量" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalRuleSeq}
                                </Card>
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="检查数据总量" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalJCSJZL}
                                </Card>
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="失范数据总量" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalSFSJZL}
                                </Card>
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                                <Card title="失范数据比例" bordered={false} style={{ padding: '20px 0' }}>
                                    {this.state.totalSFSJBL}
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <Modal
                        title="日历"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        className="Supervise"
                    >
                        <Calendar calendarTime={this.CanlerTime.bind(this)}></Calendar>
                    </Modal>
                    <Modal
                        title="数据反查"
                        visible={this.state.ReverseChecking}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        className="ReverseChecking"

                    >
                        <ReverseChecking
                            CloseClick={this.CloseClick.bind(this)}
                            val={this.state.EditListValue}
                        />
                    </Modal>
                </div>
            </Fragment>
        )
    }
    // 轮次的下拉
    handleChange(value) {
        this.setState({
            SelectValue: value
        })
        console.log(`selected ${value}`);
    }
    // 请选择导出数量
    DCSumInput(e) {
        this.setState({
            dcdatasum: e.target.value
        })
    }
    // 双击弹窗
    async thatsOk(record) {
        let ListValueApi = await CHECKVALUEPAI(record.ruleSeq)
        this.setState({
            ReverseChecking: true,
            EditListValue: ListValueApi.data
        })
    }
    componentDidMount() {
        this.HandlerValue()
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    async HandlerValue() {
        let DQTime = {}
        const d = new Date()
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let Array = resDate.split("-")
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        DQTime.Time = str
        let data = await SCSHVALUE(DQTime)
        this.setState({
            data: data.data.page.list,
            currPage: data.data.page.currPage,
            totalCount: data.data.page.totalCount
        })
        console.log(data, "opopop")
    }
    // onChange
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    // 日历按钮
    RLClickhandler() {
        this.setState({
            visible: true
        })
    }
    // 点击日期关闭弹窗
    async CanlerTime(val) {
        let FromArr = {}
        let Array = val.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        FromArr.Time = str
        FromArr.sblc = ""
        console.log(FromArr, "FromArr")

        this.TimeLC(FromArr)
        this.setState({
            visible: false,
            calendarTime: val
        })
    }
    // 根据时间获取轮次
    async TimeLC(FromArr) {
        let TimeData = await HQLCLIST(FromArr)
        if (TimeData.msg == "成功") {
            console.log(11)
            this.setState({
                SelectArray: TimeData.data
            }, () => {
                console.log(this.state.SelectArray, "Select")
            })
        }
    }

    // 生成上报
    SCSBClickhandler() {
        let _this = this
        console.log(this.state.calendarTime)
        console.log(this.state.SelectValue)
        if (this.state.calendarTime != '请选择时间' && this.state.SelectValue > 0) {
            let Array = this.state.calendarTime.split("-")
            let str = ""
            for (var i = 0; i < Array.length; i++) {
                str += Array[i]
            }
            console.log('生成上报')
            Axios({
                url: '/api/review/Appear/exportOut',
                method: 'get',
                responseType: 'blob',
                params: {
                    'cjrq': str,
                    'jclc': _this.state.SelectValue
                }
            }).then(({ data }) => {
                console.log(data, '132')
                const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = _this.state.calendarTime + '.xls'
                link.click()
            })
        }else{
            this.error()
        }

    }
    error = () => {
        message.error('请您选择时间跟轮次');
      };
    // 点击确定关闭弹窗
    handleOk() {
        this.setState({
            visible: false,
            ReverseChecking: false
        })
    }
    // 点击取消关闭弹窗
    handleCancel() {
        this.setState({
            visible: false,
            ReverseChecking: false
        })
    }
    // 导出excel表格
    async DCExcel() {
        let TxTData = {}
        let Time = this.state.calendarTime
        let Array = Time.split("-")
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        TxTData.cjrq = str
        TxTData.jclc = this.state.SelectValue
        TxTData.number = this.state.dcdatasum
        console.log(TxTData)
        if (TxTData.cjrq != '请选择时间' && TxTData.jclc && TxTData.number>= 0) {
            Axios({
                url: '/api/review/Appear/inTheNewspapersLeadingOut',
                method: 'get',
                responseType: 'blob',
                params: {
                    'cjrq': TxTData.cjrq,
                    'jclc': TxTData.jclc,
                    'number': TxTData.number
                }
            }).then(({ data }) => {
                console.log(data, '132')
                const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = TxTData.cjrq + '.zip'
                link.click()
            })
        }else{
            this.error()
        }

    }
    // 关闭数据反查弹框
    CloseClick() {
        this.setState({
            ReverseChecking: false
        })
    }
    // 点击生成报告，获取日历-轮次
    async QueryData() {
        let queryData = {}
        let Time = this.state.calendarTime
        let Array = Time.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }

        queryData.Time = str
        queryData.SelectValue = this.state.SelectValue
        let LCTime = await LCTIME(queryData)
        console.log(LCTime, "888888")
        this.setState({
            totalJCSJZL: LCTime.data[0].totalJCSJZL,
            totalRuleSeq: LCTime.data[0].totalRuleSeq,
            totalSFSJBL: LCTime.data[0].totalSFSJBL,
            totalSFSJZL: LCTime.data[0].totalSFSJZL,
            dcdatasum: LCTime.data[0].totalJCSJZL
        })
    }
}
export default SBAdministration