$wslPath = wsl wslpath -w "/home/yingyu5658/Documents/Code/ZJToolBox"
Set-Location $wslPath  # 现在路径会转换为类似C:\Users\...的格式
npm run build:win
