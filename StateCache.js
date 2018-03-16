import React from 'react';
/*
  config.key 必须 作为sessionstorage的key值
 */
const StateCache = (config) => {
  console.log('stateCache');
  return (Comp) => {
    const defaultConfig = {
      key: '',
      maxNum: 15,
    };
    const warpConfig = { ...defaultConfig, ...config };
    class WrapComp extends Comp {
      componentWillMount() {
        console.log('willmount')
        let preState = {};
        const hashQueryName = `$${this.getQuery()[warpConfig.hashQueryName]}`;
        const storageDataStr = sessionStorage.getItem(warpConfig.key);

        if (storageDataStr) {
          console.log('useCache');
          preState = JSON.parse(storageDataStr)[hashQueryName];
        }
        console.log('componentWillmount', preState);
        if (preState) {
          this.setState(preState);
        }
        super.componentWillMount();
      }

      componentWillUnmount() {
        // todo:cache state in sessionstorage
        const hashQueryName = `$${this.getQuery()[warpConfig.hashQueryName]}`;
        const storageDataStr = sessionStorage.getItem(warpConfig.key);
        let storageData = {};
        if (storageDataStr) {
          storageData = JSON.parse(storageDataStr);
        }
        storageData[hashQueryName] = this.state;
        const storageKeys = Object.keys(storageData);
        while (Object.keys(storageData).length > warpConfig.maxNum) {
          delete storageData[storageKeys[0]];
        }
        console.log('componentWillUnmount', JSON.stringify(storageData));
        sessionStorage.setItem(warpConfig.key, JSON.stringify(storageData));
      }
    }
    if (!config.key) {
      WrapComp = Comp;
      console.warn('stateCache必须有key');
    }
    return WrapComp;
  };
};

export default StateCache;
