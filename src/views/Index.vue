<template>
  <div>
    <nav class="top-warp" :style="navStyle">
      <li
        v-for="i in topKeys"
        :key="i"
        :class="{ active: i == key }"
        @click="key = i"
      >
        {{ i }}
      </li>
    </nav>
    <div class="main">
      <section class="v" v-for="i in dyData" :key="i.title" @click="video(i)">
        <div class="v-info">
          <img class="avatar" :src="i.user.avatar" alt="" />
          <div>
            <div class="username" v-text="i.user.name"></div>
            <div class="title" v-text="i.title"></div>
          </div>
        </div>
        <div class="video">
          <img class="v-cover" :src="i.thumb" alt="" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { parse, suffix } from "@/utils/tvlistsupport";
const data = ref([]);

const router = useRouter();

const topKeys = ref([]);

const key = ref("");

const dyData = computed(() =>
  data.value.filter(
    (o) => key.value == "所有" || o.title.indexOf(key.value) > -1
  )
);

const navStyle = computed(
  () => "grid-template-columns: repeat(" + topKeys.length + ", 5rem);"
);

function video(item) {
  const index = Math.ceil(Math.random() * data.value.length - 10);
  sessionStorage.setItem("video", JSON.stringify(item));
  sessionStorage.setItem("rec", JSON.stringify(data.value.splice(index, 10)));
  router.push("/video?url=" + item.url);
}

function topKey(d) {
  const couter = d
    .map((o) => o.name.substring(o.name.length - 2, o.name.length))
    .reduce((counter, y) => {
      let c = counter[y];
      if (c) {
        counter[y] = c + 1;
      } else {
        counter[y] = 1;
      }
      return counter;
    }, {});
  const a = Object.values(couter).map((o) => Number(o));
  a.sort((x, y) => y - x);
  const fa = new Set(a.filter((o, i) => i < 10));
  const r = ["所有"];
  for (let k of Object.keys(couter)) {
    if (fa.has(Number(couter[k]))) {
      r.push(k);
    }
  }
  return r;
}

onMounted(() => {
  const route = useRoute();
  async function load(url) {
    let suffixName = url && suffix(url);
    if (url) {
      if (suffixName == "m3u8") {
        suffixName = "m3u";
      }
      localStorage.setItem("tvlistUrl", url);
    }
    let d = await fetch(url).then((r) => r.text());
    d = parse(d, suffixName);
    topKeys.value = topKey(d);
    data.value = d
      .filter((o) => o.url.indexOf("https") > -1)
      .map((o) => ({
        user: { avatar: o.meta["tvg-logo"], name: o.name },
        url: o.url,
        thumb: "/bg.png", //o.meta["tvg-logo"],
        title: o.name + " - - 直播",
      }));
  }
  watch(
    () => route.query,
    (v) => {
      load(v.s);
    }
  );
  load(
    route.query.s ||
      localStorage.getItem("tvlistUrl") ||
      "https://ghproxy.com/https://raw.githubusercontent.com/goolguy007/radioer/main/TVradio"
  );
});
</script>
<style lang="less" scoped>
.ov() {
  overflow: hidden;
  text-overflow: ellipsis;
}

.v {
  margin-bottom: 0.2rem;
  background: #fff;
  .avatar {
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 1.1rem;
  }
  .v-info {
    .ov();
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1rem;
    padding: 0.7rem;
  }
  .username {
    color: #73767a;
    font-size: 0.9rem;
    line-height: 1.5rem;
  }
  .title {
    color: #0c0d0f;
    -webkit-line-clamp: 2;
    color: #0c0d0f;
    font-size: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .video {
    position: relative;
    &::before {
      position: absolute;
      top: calc(50% - 1.5rem);
      right: calc(50% - 1.5rem);
      background: #666;
      width: 3rem;
      height: 3rem;
      content: " ";
      background: url(https://lf3-cdn-tos.bdxiguastatic.com/obj/ixigua-static/xigua-wap/static/media/playButton.0fe4e1bd.webp);
      background-size: 100% 100%;
    }
  }
  .v-cover {
    max-width: 100%;
  }
}

.top-warp {
  position: sticky;
  top: 56px;
  background: #fff;
  z-index: 10;
}
nav {
  padding: 0 0.8rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(11, 5rem);
  align-items: center;
  flex-wrap: nowrap;
  overflow: auto;
  li {
    color: #73767a;
    font-size: 1.1rem;
    height: 50px;
    line-height: 50px;
  }
  .active {
    color: #333;
    font-size: 1.5rem;
  }
}
</style>
