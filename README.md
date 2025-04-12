# ZJToolBOX

## 简介

**ZJToolBox，一个音游工具箱。**

## 使用教程

### 前言

**本程序的命令结构为`zjtb <子命令> <-选项> <参数> `**

### 安装

在Release界面选择最新版安装。

#### exe可执行文件版本

用于没有安装Nodejs环境的设备
把下载好的压缩包解压到一个文件夹，不推荐放在桌面。可能会有配置文件、日志文件、临时文件散落在桌面。

#### 添加环境变量（可选）

添加环境变量后，可以在终端的任何位置输入程序名以运行程序，这对于经常使用的程序来说是必要的。减少了路径检索的时间。

![alt text](ReadmeImages/image.png)

点击开始菜单，找到设置。在左上角搜索“环境变量”。

![alt text](<ReadmeImages/image copy.png>)

在打开环境变量配置窗口后按下**n**

系统变量 => 下滑找到Path

![alt text](<ReadmeImages/image copy 3.png>)

点击下方编辑，右上角新建，把含有"zjtb.exe"的路径输入到文本框中，一路确定，退出设置。

如果配置无误，打开终端后输入`zjtb -V`，可以正常显示版本信息。

### Nodejs版本

下载zjtb.js文件

可以在已安装Nodejs环境的设备上，进入文件目录，打开终端输入`node zjtb.js`来运行。

推荐Node版本20+

---

## 功能

### 查看Malody谱面信息

用法：`zjtb mld -c <filePath>`
例：`zjtb mld -c "C:\Users\yingy\Downloads\海馬成長痛.mcz"`

控制台输出：

```
$ zjtb -c C:\Users\yingy\Downloads\海馬成長痛.mcz
输入<软件名称> --help 来获取帮助信息。
[2025-4-5 10:53:46] [INFO] traverseTempDir: 找到谱面: temp\1727483148.mc

扫描出1张谱面，请输入序号来选择要查看的谱面：
[1] temp\1727483148.mc
请输入要查看的谱面的序号：1
[2025-4-5 10:53:46] [INFO] getBeatmapFileData: 谱面解析成功！

===============谱面信息===============
标题     :海馬成長痛
谱师     :yingyu5658
物量     :1971
BPM      :140.02030127464948
轨道数量 :4
======================================
[2025-4-5 10:53:46] [INFO] delTempDir: 删除临时目录成功！
```
---

## 变更日志

- 1.0.2 删除冗余文件
- 1.0.1 修复字符编码问题
- 1.0.0 重构所有Malody相关功能代码
- 0.1.2 可直接解析.mcz谱面包
- 0.1.1 修复了无法正常解析变速谱面的问题。
- 0.0.3 添加物量、BPM、轨道数量的解析。
- 0.0.2 添加日志系统。
- 0.0.1 可读取.mc文件。

## Bug反馈

提交Issue到Github仓库或加入[醉酒哈基米QQ群](https://qm.qq.com/q/TOkvfQIUI)并提供发生错误时的日志文件片段。

## TODO

- [ ] 各手指压力计算功能
- [ ] 自动检查更新
- [ ] 获取Osu!用户数据
- [ ] 获取Malody用户数据

## 友情链接

> [开发文档](http://zjhajimi.fun/ZJToolBox/docs/module-Beatmap-BeatmapData.html)
>
> [醉酒哈基米QQ群](https://qm.qq.com/q/TOkvfQIUIU) 
>
> [醉酒哈基米官网](www.zjhajimi.fun)
>
> [yinyu5658的万事屋](https://www.yingyu5658.cn)