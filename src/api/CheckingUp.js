import http from "@utils/http";

// 检核状态查询
export const JHZTCX = (val)=>http.get("/api/review/EAST/queryCheck",{
    ruleSeq:val
})
// 点击查看结果 向后端发送规则号 -- 跳转页面
export const DJCKJG = (val) =>http.get("/api/review/jhjgls/checkTimes")
// 实时状态
export const SSZTCX = () =>http.get('/api/review/EAST/detection')
