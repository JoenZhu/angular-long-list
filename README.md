## angular-long-list

基于 `Angular` 长列表的解决方案

[Demo](https://joenzhu.github.io/angular-long-list/)

### 思路

假设我们现在有一个大的数据要放到页面上 

这里我们设置几个变量
- `longList`    初始数据
- `pickedList`  选择要渲染的数据
- `cursor`      游标，表示选中了第几个数据

#### 方案一
初始渲染前 `10` 条数据，这个时候
```
pickedList = longList.slice(0, 10)
cursor = 1
```
然后监测滚动事件，当页面滚动到距离底部一定距离（比如 `100px`）的时候，取出下一个 `10` 条的数据添加到`pickedList` 中，这个时候
```
pickedList = pickedList.concat(longList.slice(cursor * 10, ++cursor * 10))
```
这个方案也是我在项目中最初使用到的。因为项目中请求后台数据使用的是加载更多的方式，就相当于类似于滚动到底部去请求数据，然后把请求到的数据添加到渲染列表里面 

但是这个方案有两个问题：
- 如果这个列表很多，有上万条甚至更多，这个是加载到越来越后面，dom 会越来越多，到时候别说滚动了，页面可能直接就卡死了。而且每一行中还可能有其他复杂的 dom 结构。
- 因为我们用的是 `angular` 框架。在 `angula 1.x` 的时候，众所周知 `angular 1.x` 其实是用脏值监测来实现双向数据绑定的，页面上有几百个 `model` 就已经卡的不行。虽然 `angular 2` 引入了 `zone.js` 来监测数据的更新变化，但是也架不住如此多的数据绑定。这里涉及到一个 `angular` 列表性能优化的问题。

#### 方案二
针对方案一的两个问题，其实这两个问题实质是同一个问题：页面上的 dom 越来越多导致页面的性能出现问题。既然问题出在这里，就可以想办法减少 dom 数，或者把 dom 数固定。 这个时候就要在滚动的时候不断的更新 `pickedList` 的数据，确保有添加有删除，这样才能保证 `pickedList` 一直保持在一个长度。这个时候有两个点要注意：
- 向上滚动的时候要向列头添加之前的数据
- 由于数据长度是不变的，这个时候页面其实没有长度变化的，看起来就没有滚动的效果。这个时候要用到 css 的 `transform:translate3D(0, 0 ,0)` 来保持页面的滚动。

核心代码如下
```typescript
// 向下滚动更新数据
if (evt.load) {
  // 从 longList 中取出待添加的数
  let addList = this.longList.slice(this.cursor, this.cursor + 2);

  // 从 pickedList 中取出列头的数据
  this.pickedList.splice(0, this.cursor <= 10 ? 1 : 2);

  // 添加新的数据
  this.pickedList.push(...addList);

  // 设置游标的值，这个时候就不是直接 +1 了，因为游标是实际的 index
  this.cursor += 2;
}

// 向上滚动更新数据
if (evt.remove) {
  if (this.pickedList[0] === this.longList[0]) {
    this.cursor = 10;
    return;
  }
  
  // 取出列头需要添加的数
  let headList = this.longList.slice(this.cursor - 12, this.cursor - 10);

  // 删除列尾的数据
  this.pickedList.splice(this.cursor <= 10 ? -1 : -2, 2);

  // 更新 pickedList 的数据
  this.pickedList.unshift(...headList);

  // 更新游标
  this.cursor -= 2;
}
``` 
