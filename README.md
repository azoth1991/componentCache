# componentCache
a hoc of react about component cache

# config
key：缓存索引
maxNum：最大缓存个数，超出范围最开始加入的缓存被移除

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
