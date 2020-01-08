import http from "@utils/http";

// 获取图表数据
export const CHARTSLISTVALUE = ()=>http.get("/api/review/jhjgls/chief")

// 默认的时间查询有没有
export const DAFAULTTIME = () =>http.get('/api/review/defalut/Cjrq')

// 时间不存在的时候向后端发送
export const SENDTIME = (val)=>http.post('/api/review/defalut/updateBConstant',{
    'fieldValue':val.field_value,
    'describe':val.describe,
    'fieldName':'cjrq'
})

