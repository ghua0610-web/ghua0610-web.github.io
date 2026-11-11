# Guanghua Zheng · Academic Homepage

纯静态英文个人学术主页，无需安装依赖或构建。参考了 https://y-debug-sys.github.io/ 的白底、蓝色强调、学术简介与论文卡片布局。

## 查看

直接用浏览器打开 `index.html`，或在此目录运行：

```sh
python3 -m http.server 8000
```

然后访问 http://localhost:8000 。

## 发布到 GitHub Pages

网站地址：[https://ghua0610-web.github.io/](https://ghua0610-web.github.io/)。

1. 登录 GitHub 账号 `ghua0610-web`，创建公开仓库 `ghua0610-web.github.io`。
2. 将本目录中的文件和 `assets` 文件夹上传至仓库根目录（包括 `.nojekyll`）。
3. 在仓库的 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**，选中 `main` 分支和 `/ (root)`，保存。
4. 部署完成后访问 https://ghua0610-web.github.io/ 。

也支持普通项目仓库：所有资源路径均为相对路径。

## 内容维护

- `index.html`：姓名、个人简介、教育经历、邮箱、论文与 BibTeX。更换邮箱时，同时更新 `script.js` 中复制按钮使用的邮箱。
- `styles.css`：配色、字体、布局和移动端样式。
- `script.js`：移动导航、当前章节高亮、邮箱复制、BibTeX 弹窗与复制。
- `assets/profile.svg`：原创 GZ 字母头像。可用本人照片替换，并相应修改 HTML 中图片路径和替代文本。
- `assets/pose-graph.svg`：原创人体关键点与图的概念示意，非论文原图。

没有添加未提供的导师、入学年份、简历、GitHub 或 Google Scholar 个人链接。研究主题根据已提供论文确定，可按实际方向修改。

## 已核对的论文信息

- **Title:** Hierarchical Graph Neural Network for Human Pose Estimation
- **Authors:** Guanghua Zheng, Zhongqiu Zhao, Zhao Zhang, Yi Yang
- **Venue:** 2023 IEEE International Conference on Multimedia and Expo (ICME)
- **DOI:** 10.1109/ICME55011.2023.00453
- **Source:** https://ieeexplore.ieee.org/document/10219814

作者、会议、年份、DOI 与摘要已于 2026-11-11 在 IEEE Xplore 官方页面核对。教育经历依据用户提供的信息，未推断具体日期或硕士学位类别。

正式网址：https://ghua0610-web.github.io/ 。网站通过 GitHub Pages 托管，本目录同时保留可在本地打开的完整源码。
