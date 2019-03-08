# componentCache
a hoc of react about component cache

# config

| 配置名称     | 意义   |  参数值  |是否可选  |
| --------   | :-----:   | :----: | :----: |
| key        | 缓存的key值|   唯一字符串，重复定义会被覆盖| string|
| storageType| 缓存类型，表示使用什么作为缓存载体，localstorage会一直保留，sessionstroage关闭即消   |  string，可选值(``localstorage/sessionstorage``)   | string,可选,默认``sessionStorage``|
| lifecycle  | 表示数据将在哪个阶段被缓存 | array，可选值(``componentWillUnmount/componentDidUpdate``)  | 可选,默认``componentWillUnmount``|
| hashQueryName  |二级缓存选项，例如单品页，可以传productid作为二级缓存 | string  | 可选|
| maxNum  |二级缓存最大缓存条数，例如单品页表示最大缓存商品条数，超过最大缓存``先入先出`` | number  | 可选|
# 使用方法
需要支持decorator写法

```
@stateCache({
  key: 'investDetail',
  hashQueryName: 'balanceId',
  maxNum: 3,
  storageType: 'localStorage',
  lifecycle: ['componentDidUpdate', 'componentWillUnmount'],
})
class InvestDetail extends React.Component {
  //....
}
```
