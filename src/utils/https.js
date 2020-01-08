// 根据后端下载的另外设置的请求头
import { fetch as fetchPro } from "whatwg-fetch";
const get = (url, data) => {
    if (data) {
        var str = "";
        for (var key in data) {
            str += "&" + key + "=" + data[key];
        }

        url = url + "?" + str.slice(1);
    }
    var result = fetchPro(url, {
        credentials: "include",
        headers: {
            "content-type": "application/x-form-urlencoded;chrset=UTF-8"
        }
    }
    ).then(res => res.json());
    return result;
}
export default {
    get
}