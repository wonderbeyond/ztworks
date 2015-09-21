# ztWorks(专题工厂)

互联网专题制作流程化、工程化实践。Enjoy it!

---

## 工具选型

- gulp: 任务管理
- swig: 模板引擎

## 准备工作

- 安装nodejs（省略）

- 安装依赖模块

  ```
  npm install
  npm install -g gulp
  ```

## 开始创作

### 参考 `zts/` 下面的专题样板开始制作

```
制作。。。
Awesome stuff...
```

### 执行 `gulp` 查看构建命令


    $ gulp
    [23:29:03] Using gulpfile ~/projects/ztworks/gulpfile.js
    [23:29:03] Starting 'default'...

    Main Tasks
    ------------------------------
        default
        templates
        watch
        zt001.templates
        zt002.templates

    [23:29:03] Finished 'default' after 725 μs

### 构建专题

手动构建

```
gulp zt001.templates
```

自动化构建

```
gulp watch
```

## 模板的使用要点

关键词: `extends` `block..parent` `include..with`

- 继承：定义基础模板，供子页面继承

- 覆盖：子页面定义自己不同的内容一般通过继承基础模板后再覆盖特定的`block`来实现，
  还可利用 `{% parent %}` 指令来实现在父模板的基础上补充内容

- 包含：某些可复用的内容可以作为片段单独维护，然后在某些子页面中`include`引入。
  `include` 指令有一个极好的特性是可以结合`with`传参给模板片段，
  一个实际的用例就是导航条，每个页面的导航条内容是有一点区别的，因为各自激活的项目不同，
  于是`with`就派上用场了，可以在`include`时把激活的项目传递进去以控制渲染结果


## TODO

- 给专题模版添加全局上下文设置功能
