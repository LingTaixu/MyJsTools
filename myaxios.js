; (function () {
    window.myaxios = {
        post(url, data) {
            return new Promise(resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("post", url)
                //监听
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText))
                    }
                }
                // 设置请求头
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                //发送请求
                xhr.send(data)
            })
        },
        getmethod(data) {   //加入方法解决get拼接问题
            let arr = []    //定义空数组
            for (let key in data) {     //用for in 方法遍历对象
                if (typeof data[key] === 'object') {    //判断对象中是否还有对象
                    arr.push(` ${i} = ${(data[key])[i]} `)
                    getmethod(data)
                    /* for (let i in data[key]) {  //如果有则再次遍历对象
                        arr.push(` ${i} = ${(data[key])[i]} `) //es6语法拼接数组 i === 对象键 data[key][i] === 对应键的值
                    } */
                } else {            //如果只有一个
                    arr.push(`${key}=${data[key]}`) //直接进行拼接
                }
                return arr.join('&') //返回的时候在数组中加入分隔符 & 因使用的是join所以不同转化为字符串
            }
        },
        get(url, data) {  //使用的是get方法的话 会传入两个参数,一个参数为地址 一个则是对象
            // console.log(axios.getmethod(data));

            return new Promise(resolve => {     //使用Promise 实现用Promise发送ajax
                var xhr = new XMLHttpRequest();     //创建一个ajax对象 在浏览器
                xhr.open('get', url + '?' + axios.getmethod(data))  //设置请求行 默认方法为get 传入形参 url 拼接 ? 调用上面设置的方法axios.getmethod 并传入参数data
                xhr.onreadystatechange = function () {      //监听发送之后返回的状态码
                    if (xhr.readyState === 4 && xhr.status === 200) {   //如果等于 4 且 为 200 的时候
                        resolve(JSON.parse(xhr.responseText))           //设置Promise成功resolve成功的参数 并用JSON.parse转换为对象
                    }
                }
                xhr.send()    //发送请求
            })
        }
    }
})();