
/**
 * 服务器接口地址
 */
var hostUri="https://novel.juhe.im";
var hostUriRes="http://statics.zhuishushenqi.com/";
/**
 * 
 * @param {string} num 
 */
var renderNumber=(num)=>{
    if(num<10000){
        return num;
    }else{
        return Math.ceil(num/10000.0*10)/10.0+"万";
    }
}
var refreshIndicatorStatus = {
    ready: "ready",
    loading: "loading",
    hide: "hide"
}
export default {hostUri,hostUriRes,renderNumber,refreshIndicatorStatus};