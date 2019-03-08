# componentCache
a hoc of react about component cache

# config
  config.key 必须 作为sessionstorage的key值
  maxNum 最大缓存条数
  storageType 缓存类型
  lifecycle 缓存的生命周期
  this.clearStorageFlag 执行componentWillUnmount时是否清除缓存的标记

# 使用方法
需要支持decorator写法

```
@StateCache({
  key: 'investDetail',
  hashQueryName: 'balanceId',
  maxNum: 3,
})
class InvestDetail extends React.Component {
  //....
}
```
