需要研究的部分
1. 根据不同的数据类型打上不同的img标签
2. 在视图和实际输出切换
3. 在给定数据和视图切换
4. 判断是否是跨块级元素进行操作


用到的方法
1. CKEDTITOR.plugins.add
2. pluginDefinition 创建插件对应的的一些配置
   onload 如果插件是第一次被加载会调用该方法，如添加样式
3. range 对象

```
    var selection = editor.getSelection(); // 获取选中的对象
    var text = selection.getSelectedText(); // 获取选中的文字
    var ranges = selection.getRanges(); // 获取范围对象
    var range = ranges[0]; // 第一个对象
    ranges[0].collapse(true); // 将范围合并到开始
    selection.selectRanges(ranges); // 重新定位光标

```
