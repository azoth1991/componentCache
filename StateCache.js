/*
  config.key 必须 作为sessionstorage的key值
  maxNum 最大缓存条数
  storageType 缓存类型
  lifecycle 缓存的生命周期
 */
const stateCache = (config) => {
  console.log('stateCache');
  return (Comp) => {
    const defaultConfig = {
      key: '',
      maxNum: 15,
      storageType: 'sessionStorage',
      lifecycle: ['componentWillUnmount'],
    };
    const warpConfig = { ...defaultConfig, ...config };
    class WrapComp extends Comp {
      componentWillMount() {
        console.log('componentWillmount', this.getStorageDataItem());
        this.setState(this.getStorageDataItem());
        super.componentWillMount();
      }

      componentDidUpdate() {
        if (warpConfig.lifecycle.includes('componentDidUpdate')) {
          this.storeState();
        }
        super.componentDidUpdate();
      }

      componentWillUnmount() {
        if (warpConfig.lifecycle.includes('componentWillUnmount')) {
          this.storeState();
        }
        super.componentWillUnmount();
      }
      storeState() {
        const hashQueryName = this.getQueryName();
        const storageData = this.getStorageData();
        storageData[hashQueryName] = this.state;
        while (Object.keys(storageData).length > warpConfig.maxNum) {
          delete storageData[Object.keys(storageData)[0]];
        }
        window[warpConfig.storageType].setItem(warpConfig.key, JSON.stringify(storageData));
      }

      // 获取整key对应的整体storage
      getStorageData() {
        const storageDataStr = window[warpConfig.storageType].getItem(warpConfig.key);
        return (storageDataStr && JSON.parse(storageDataStr)) ? JSON.parse(storageDataStr) : {};
      }
      // 获取key的storage中，hashname对应的item
      getStorageDataItem() {
        const hashQueryName = this.getQueryName();
        return this.getStorageData()[hashQueryName] || {};
      }
      // 获取hash的key值
      getQueryName() {
        let res = '$a';
        if (warpConfig.hashQueryName && this.getQuery()[warpConfig.hashQueryName]) {
          res = `$${this.getQuery()[warpConfig.hashQueryName]}`;
        }
        return res;
      }
    }
    if (!config.key) {
      WrapComp = Comp;
      console.warn('stateCache必须有key');
    }
    return WrapComp;
  };
};

export default stateCache;
