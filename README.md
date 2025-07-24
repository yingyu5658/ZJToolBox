# ZJToolBOX

## 简介

**ZJToolBox，一个音游工具箱。**

## 前言

**本程序的命令结构为`zjtb <子命令> <-选项> <参数> `**

## 目录
- [简介](##简介)
- [安装](##安装)
  - [添加环境变量（可选）](###添加环境变量)
  - [功能](##功能)
   - [获取帮助](###获取帮助)
   - [Malody](###malody)
     - [获取谱面信息](##获取谱面信息)
     - [获取回放信息](##获取回放信息)
   - [B站](##B站)
     - [B站视频下载](##b站视频下载)
     - [批量下载](##批量下载)
 - [变更日志](##变更日志)
 - [Bug反馈](##bug反馈)
 - [友情链接](##友情链接)

 

## 安装

在Release界面选择最新版安装。

把下载好的压缩包解压到一个文件夹，不推荐放在桌面。可能会有配置文件、日志文件、临时文件散落在桌面。

### 添加环境变量

添加环境变量后，可以在终端的任何位置输入程序名以运行程序，这对于经常使用的程序来说是必要的。减少了路径检索的时间。

![alt text](./ReadmeImages/image.png)

点击开始菜单，找到设置。在左上角搜索“环境变量”。

![alt text](./ReadmeImages/image%20copy.png)

在打开环境变量配置窗口后按下**n**

系统变量 => 下滑找到Path

![alt text](./ReadmeImages/image%20copy%203.png)

点击下方编辑，右上角新建，把含有"zjtb.exe"的路径输入到文本框中，一路确定，退出设置。

如果配置无误，打开终端后输入`zjtb -V`，可以正常显示版本信息。


## 功能

### 获取帮助

- 获取所有选项和子命令 `zjtb -h`

- 获取单独子命令的帮助 `zjtb 子命令 -h`

### Malody

#### 获取谱面信息

用法：`zjtb mld -b <filePath>`
例：`zjtb mld -b "C:\Users\yingy\Downloads\海馬成長痛.mcz"`

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

#### 获取回放信息
用法: `zjtb mld -r <filePath>`
例：

`$ zjtb mld -r ./ex1_jack.mr`

控制台输出:

```
ZJTB @1.2.0
===回放信息===
谱面名称: Malody 4K Extra Dan v3-Jack
谱面难度: Extra-1 Scorpion Dance
谱面作者: Various Artists
最终得分: 4095634
最大连击: 380
B E S T : 1742
C O O L : 175
G O O D : 18
M I S S : 17
使用判定: E
```



### B站

### B站视频下载
输入`./zjtb -bvd -d <视频BV号>`下载，
示例：
```
PS E:\Develop\Code\ZJToolBox\build\zjtb> ./zjtb bvd -d BV1YtXxYNEXA
ZJTB @1.1.0
[2025-4-13 23:3:4] [INFO] getCid: 获取到了BV1YtXxYNEXA的cid：29015933821

[2025-4-13 23:3:4] [INFO] getDownloadUrl: 成功获取到Url：https://upos-sz-mirror08c.bilivideo.com/upgcxcode/21/38/29015933821/29015933821-1-192.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&platform=pc&trid=cc552aba357044d2935d05128a8df3eu&mid=0&oi=0x240882100c0338a114bedf96e76c9e5b&tag=&gen=playurlv3&os=08cbv&uipk=5&deadline=1744563783&og=hw&nbs=1&upsig=9ce495218f945167a2743a99a9eaea6b&uparams=e,platform,trid,mid,oi,tag,gen,os,uipk,deadline,og,nbs&bvc=vod&nettype=0&bw=204186&buvid=&build=0&dl=0&f=u_0_0&agrr=0&orderid=0,3

[2025-4-13 23:3:4] [INFO] downloadVideo: 下载成功！文件已保存到./BiliBiliDownload/
```

### 批量下载

 用法：`zjtb bvd -b <BV号列表文件位置>`

新建一个文本文件（建议与程序同级位置）

填入BV号，一行一个
```
BV1pS421o7Gm
BV1Hg411T7fT
```

输入`zjtb bvd -b ./bvid.txt`

输出

```
[2025-4-18 23:36:10] [INFO] startBatch: 读取到了 1 个条目

[2025-4-18 23:36:10] [INFO] startBatch: 读取到了 2 个条目

[2025-4-18 23:36:10] [INFO] getCid: 获取到了BV1Hg411T7fT的cid：440816133

[2025-4-18 23:36:10] [INFO] getCid: 获取到了BV1pS421o7Gm的cid：1612557621

[2025-4-18 23:36:10] [INFO] getDownloadUrl: 成功获取到Url：https://xy118x184x254x111xy240ey5ay7820y1y1yy111xy.mcdn.bilivideo.cn:4483/upgcxcode/33/61/440816133/440816133_da2-1-192.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&nbs=1&mid=0&tag=&oi=0x240882100c01e7b179d6520dd8df5f02&uipk=5&platform=pc&gen=playurlv3&os=mcdn&og=cos&trid=0000b1eae2e65cd54af6930977613589cd3u&deadline=1744997772&upsig=f7ae10150ece72902dfcc12b6d557848&uparams=e,nbs,mid,tag,oi,uipk,platform,gen,os,og,trid,deadline&mcdnid=50009044&b0,3

[2025-4-18 23:36:10] [INFO] getDownloadUrl: 成功获取到Url：https://cn-tj-cu-01-13.bilivideo.com/upgcxcode/21/76/1612557621/1612557621-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&platform=pc&trid=0000f9b6294bdeaa47cd9cfcdba4b869c68u&gen=playurlv3&os=bcache&og=hw&tag=&deadline=1744997772&nbs=1&oi=0x240882100c01e7b179d6520dd8df5f02&uipk=5&mid=0&upsig=1cc329cf895e4db81e513a32f394d5db&uparams=e,platform,trid,gen,os,og,tag,deadline,nbs,oi,uipk,mid&cdnid=87213&bvc=vod&nettype=0&bw=254868&agrr=0&buvid=&build=0&dl=0&f=u_0_0&orderid=0,3

[2025-4-18 23:36:10] [INFO] downloadVideo: 下载任务已开始。文件将会保存到./BiliBiliDownloads

[2025-4-18 23:36:10] [INFO] downloadVideo: 下载任务已开始。文件将会保存到./BiliBiliDownloads

```

---

## 变更日志
- 1.4.0 新增查看Malody回放文件信息
- 1.3.0 新增生成随机音名。
- 1.2.0 B站视频下载新增批量下载。
- 1.1.0 新增B站视频下载、时间戳小工具。
- 1.0.4 新增查看上次修改时间、难度。
- 1.0.3 Malody功能新增查看难度、上次修改。
- 1.0.2 删除冗余文件。
- 1.0.1 修复字符编码问题。
- 1.0.0 重构所有Malody相关功能代码。
- 0.1.2 可直接解析.mcz谱面包。
- 0.1.1 修复了无法正常解析变速谱面的问题。
- 0.0.3 新增物量、BPM、轨道数量的解析。
- 0.0.2 新增日志系统。
- 0.0.1 可读取.mc文件。

## Bug反馈

提交Issue到Github仓库或加入[醉酒哈基米QQ群](https://qm.qq.com/q/TOkvfQIUI)并提供发生错误时的日志文件片段。

## 友情链接

> [醉酒哈基米QQ群](https://qm.qq.com/q/TOkvfQIUIU) 
>
> [醉酒哈基米官网](www.zjhajimi.fun)
