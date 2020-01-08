import http from "@utils/http";


// 获取用户的姓名
export const ADDNAME = (val)=>http.get("/api/review/loginByUserName",{
    'token':val
})

// Home页面 废掉按钮
export const ADANDONVALUE = (val)=>http.get("/api/review/rules/AbolishRules",{
    id:val
})

// 验证用户的时间以及默认检核规则
export const RULESEQTIME = ()=>http.get("/api/review/defalut/list")

// 登录
export const LOGINHOME = (val)=>http.post('/api/review/login',{
    "username":val.userId,
    "password":val.password
})