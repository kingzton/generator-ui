<template>
  <div class="novel-footer">
    <div class="novel-footer-links">
      <span>友情链接：</span>
      <a target="_blank" href="https://www.jnssd.com">个人随身录</a>
      <a target="_blank" href="http://demo.jnssd.com">前端框架</a>
      <a target="_blank" href="https://tool.jnssd.com">工具插件</a>
      <a target="_blank" href="https://hmnovel.jnssd.com">鸿蒙小说网(静态)</a>
      <a target="_blank" href="https://api.jnssd.com">Spring Boot 微服务</a>
      <a target="_blank" href="https://novel.jnssd.com">Spring Boot 前后端分离</a>
      <a target="_blank" href="http://nacos.jnssd.com/nacos">Nacos 注册中心</a>
      <a target="_blank" href="http://music.jnssd.com">音乐解锁</a>
    </div>
    <div class="novel-footer-site">
      <a href="#">手机站</a>
      <el-divider direction="vertical" />
      <a href="#">网站首页</a>
      <el-divider direction="vertical" />
      <a href="#">关于我们</a>
      <el-divider direction="vertical" />
      <a href="#">联系我们</a>
      <el-divider direction="vertical" />
      <a href="#">反馈留言</a>
      <el-divider direction="vertical" />
      <a href="#">作家专区</a>
      <el-divider direction="vertical" />
      <a href="#">客户端</a>
    </div>
    <div class="novel-footer-copyright">
      Copyright&copy; 2020-2021
      <a href="https://www.jnssd.com" target="_blank">www.jnssd.com</a>
      All Rights Reserved 版权所有 江南山水电 备案号：
      <a
        class="record-number"
        href="https://beian.miit.gov.cn/?spm=a2c4g.11186623.2.8.54cb3367m5cKXe#/Integrated/recordQuery"
        target="_blank"
      >
        蜀ICP备18011488号
      </a>
      <br />
      <a
        class="gong_an_record"
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51015602000168"
      >
        <img class="gong_an_img" :src="gong_an" alt="" />
        <p class="gong_an_num">川公网安备 51015602000168号</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import gong_an_img from '@/assets/base/gongan.png'

const gong_an = ref<string>(gong_an_img)
</script>

<style scoped>
.novel-footer {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.novel-footer-links {
  margin-bottom: 8px;
}

.novel-footer-links span,
.novel-footer-links a {
  color: #333;
  font-size: 12px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.novel-footer-links a:not(:last-child) {
  margin-right: 20px;
}

.novel-footer-links a:hover {
  color: rgba(0, 0, 0, 0.65);
}

.novel-footer-site {
  margin-bottom: 8px;
}

.novel-footer-site a {
  color: #666;
  font-size: 12px;
}

.novel-footer-copyright {
  color: #999;
  font-size: 12px;
}

.novel-footer-copyright a {
  color: #666;
  margin: 0 6px;
}

.novel-footer-copyright .record-number {
  margin: 0;
}

.novel-footer-copyright a.gong_an_record,
.novel-footer-copyright a.gong_an_record .gong_an_img,
.novel-footer-copyright a.gong_an_record .gong_an_num {
  display: inline-block;
}

.novel-footer-copyright a.gong_an_record .gong_an_img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  right: 5px;
}

.novel-footer-copyright a.gong_an_record .gong_an_num {
  /*color:#939393;*/
}
</style>
