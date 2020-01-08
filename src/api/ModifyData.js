import http from "@utils/http";

// 默认数据
export const DAFAULTVALUE = (val)=>http.get("/api/review/defalut/list")

// 修改数据
export const QUERYDATALIST = (val)=>http.post('/api/review/defalut/updateBConstant',{
    fieldName:val.field_name,
    fieldValue:val.field_value,
    describe:val.describe
})
// 查询
export const QUERYVALUE = (val)=>http.post('/api/review/defalut/updateBConstant',{
    fieldName:val
})

// 下拉选择版本
export const SEQSELECT = ()=>http.get('/api/review/defalut/standardType')