import {connect} from "react-redux";
import {LOGINHOME} from "@api/Home"
const mapStateToProps = (state)=>({
    
})

const mapDisPathToProps = (dispatch)=>({
    async handleLogin(e){
        e.preventDefault()
        let arr = {}
        arr.userId=e.target.userId.value
        arr.password=e.target.password.value
        console.log(arr)
        let data = await LOGINHOME(arr)
        console.log(data,"login")
        if(data.msg=='成功'){
            this.props.history.push("/DataChecking/UserInterface")
        }
    }
})

export default connect(mapStateToProps,mapDisPathToProps)