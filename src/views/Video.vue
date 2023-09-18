<template>
  <div class="bg">
    <div class="top-warp">
      <div class="video">
        <video-player
          style="width: 100vw; height: 57vw"
          :languages="languages"
          language="zh-CN"
          poster="https://p3-passport.byteacctimg.com/img/user-avatar/d87b8a77b7558b6a9983fb9adf14453d~60x60.image"
          autoplay
          :src="value"
          :volume="0.6"
          controls
        >
        </video-player>
        <div class="warp">
          <div class="v-info">
            <img class="avatar" :src="item.user.avatar" alt="" />
            <div>
              <div class="username" v-text="item.user.name"></div>
            </div>
          </div>
          <div class="title" v-text="item.title"></div>
        </div>
      </div>
      <div class="t" v-if="rec.length">相关推荐</div>
    </div>
    <div class="more">
      <section
        class="v-sub"
        v-for="item in rec"
        :key="item.title"
        @click="video(item)"
      >
        <img class="v-cover" :src="item.thumb" alt="" />
        <div class="v-sub-info">
          <div class="title" v-text="item.title"></div>
          <div class="sm">
            {{ item.url }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import zhCN from "video.js/dist/lang/zh-CN.json";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import videojs from "video.js";

const languages = ref({
  "zh-CN": zhCN,
});

const route = useRoute();

const router = useRouter();

const value = computed(() => route.query.url);

const item = ref({ user: {} });

const rec = ref([]);

function video(item) {
  sessionStorage.setItem("video", JSON.stringify(item));
  router.push("/video?url=" + item.url);
}

onMounted(() => {
  function loadItem() {
    const v = sessionStorage.getItem("video");
    if (v) {
      item.value = JSON.parse(v);
    } else {
      item.value = { user: { name: "未知", avatar: "" }, title: "未知" };
    }
    const r = sessionStorage.getItem("rec");
    if (r) {
      rec.value = JSON.parse(r);
    }
  }
  watch(
    () => route.query,
    (_) => loadItem()
  );
  loadItem();
});
</script>
<style lang="less" scoped>
.ov() {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg {
  background: #fff;
}
.warp {
  padding: 0.7rem;
}
.avatar {
  height: 2rem;
  width: 2rem;
  border-radius: 1rem;
}
.v-info {
  .ov();
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
}
.username {
  color: #73767a;
  font-size: 0.9rem;
  line-height: 2rem;
}
.title {
  margin-top: 0.5rem;
  color: #0c0d0f;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-sub {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 1rem;
  padding: 0.8rem;
}
.v-sub-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.v-cover {
  width: 100%;
  filter: grayscale(30%) brightness(50%);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  height: 20vw;
}
.sm {
  .ov();
  max-width: 50vw;
  // display: flex;
  // justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}
.t {
  padding: 0.8rem;
}
.top-warp {
  position: sticky;
  top: 56px;
  background: #fff;
  z-index: 10;
}
</style>
