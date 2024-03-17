<template>
  <!-- Header Menu -->
  <ul class="nav user-menu">
    <!-- Search -->
    <li class="nav-item nav-searchinputs">
      <div class="top-nav-search">
        <div class="continer">
          <!-- v-for="i in head"
            :key="i" -->
          <span
            style="
              display: flex;
              align-items: center;
              border-left: 2px solid #929090;
              padding-left: 0.5rem;
            "
          >
          </span>
          <ul style="display: flex; align-items: center; color: #333">
            <VueFeather type="home" />
            <VueFeather
              v-if="this.$route.meta.Breadcrumb"
              type="chevron-left"
            />
            <a
              to="/dashboard"
              style="
                color: #333;
                font-size: 1.5rem;
                pointer-events: none;
                display: flex;
                align-items: center;
              "
            >
              <!-- render if there any pernet tap -->
              <h3 v-if="this.$route.meta.Breadcrumb">
                {{ $t(this.$route.meta.Breadcrumb) }}
              </h3>
              <VueFeather
                v-if="this.$route.meta.Breadcrumb"
                type="chevron-left"
              />
              <!-- get the first route in path -->
              <h3 v-if="this.$route.meta.Breadcrumb">
                {{ $t(this.$route.meta.pageTitle) }}
              </h3>
            </a>
          </ul>
        </div>
      </div>
    </li>
    <!-- /Search -->

    <!-- Flag -->
    <li class="nav-item dropdown has-arrow flag-nav nav-item-box">
      <a
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="javascript:void(0);"
        role="button"
      >
        <vue-feather type="globe"></vue-feather>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <a
          href="javascript:void(0);"
          v-for="(entry, i) in languages"
          :key="`Lang${i}`"
          :value="entry"
          @click="setLanguage(entry.language, entry.title, entry.iso)"
          :class="{ active: lan === entry.language }"
          class="dropdown-item"
          data-lang="en"
          title="English"
        >
          <flag :iso="entry.iso" height="16" class="me-2" />
          <span class="align-middle">{{ entry.title }}</span>
        </a>
      </div>
    </li>
    <!-- /Flag -->
    <li class="nav-item nav-item-box">
      <a href="javascript:void(0);" id="btnFullscreen" @click="initFullScreen">
        <vue-feather type="maximize"></vue-feather>
      </a>
    </li>
    <!-- <li class="nav-item nav-item-box">
      <router-link to="email">
        <vue-feather type="mail"></vue-feather>
        <span class="badge rounded-pill">1</span>
      </router-link>
    </li> -->
    <!-- Notifications -->
    <!-- <li class="nav-item dropdown nav-item-box">
      <a
        href="javascript:void(0);"
        class="dropdown-toggle nav-link"
        data-bs-toggle="dropdown"
      >
        <vue-feather type="bell"></vue-feather><span class="badge rounded-pill">2</span>
      </a>
      <div class="dropdown-menu notifications">
        <div class="topnav-dropdown-header">
          <span class="notification-title">Notifications</span>
          <a href="javascript:void(0)" class="clear-noti"> Clear All </a>
        </div>
        <div class="noti-content">
          <ul class="notification-list">
            <li
              class="notification-message"
              v-for="item in headernotification"
              :key="item.id"
            >
              <router-link to="activities">
                <div class="media d-flex">
                  <span class="avatar flex-shrink-0">
                    <img
                      alt=""
                      :src="require(`../assets/img/profiles/${item.img}`)"
                    />
                  </span>
                  <div class="media-body flex-grow-1">
                    <p class="noti-details">
                      <span class="noti-title">{{ item.name }}</span>
                      {{ item.task }}
                      <span class="noti-title">{{ item.booking }}</span>
                    </p>
                    <p class="noti-time">
                      <span class="notification-time">{{ item.time }}</span>
                    </p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="topnav-dropdown-footer">
          <router-link to="activities">View all Notifications</router-link>
        </div>
      </div>
    </li> -->
    <!-- /Notifications -->
    <!-- <li class="nav-item nav-item-box">
      <router-link to="generalsettings"
        ><vue-feather type="settings"></vue-feather
      ></router-link>
    </li> -->
    <li class="nav-item dropdown has-arrow main-drop">
      <a
        href="javascript:void(0);"
        class="dropdown-toggle nav-link userset"
        data-bs-toggle="dropdown"
      >
        <span class="user-info">
          <span class="user-letter">
            <img src="../assets/img/profiles/brand.png" alt="" class="rounded img-fluid" style="height: 42px;"/>
          </span>
          <span class="user-detail">
            <span class="user-name">ساكن</span>
            <span class="user-role">مسئول الإدارة</span>
          </span>
        </span>
      </a>
      <div class="dropdown-menu menu-drop-user">
        <div class="profilename">
          <div class="profileset">
            <span class="user-img"
              ><img src="../assets/img/profiles/brand.png" alt="" />
              <span class="status online"></span
            ></span>
            <div class="profilesets">
              <h6>ساكن</h6>
              <h5>مسئول الإدارة</h5>
            </div>
          </div>
          <hr class="m-0" />
          <router-link class="dropdown-item" to="profile"
            ><vue-feather type="user"></vue-feather>My Profile</router-link
          >
          <router-link class="dropdown-item" to="generalsettings"
            ><vue-feather type="settings"></vue-feather>Settings</router-link
          >
          <hr class="m-0" />
          <router-link class="dropdown-item logout pb-0" to="/"
            ><img
              src="../assets/img/icons/log-out.svg"
              class="me-2"
              alt="img"
            />Logout</router-link
          >
        </div>
      </div>
    </li>
  </ul>
  <!-- /Header Menu -->
</template>
<script>
import headernotification from "../assets/json/headernotification.json";
export default {
  /**
   * ! changes in headermenu component, sidebarBody, router file (dashboard- publicCode), headerlogo and auth / signin
   * ?? main js and package.json
   */
  data() {
    return {
      headernotification: headernotification,
      tap: "",
      languages: [
        {
          iso: "us",
          language: "us",
          title: "English",
        },
        {
          iso: "bl",
          language: "bl",
          title: "Francais",
        },
        {
          iso: "es",
          language: "es",
          title: "Spanish",
        },
        {
          iso: "de",
          language: "de",
          title: "German",
        },
      ],
    };
  },
  computed: {
  },

  methods: {
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
  },
};
</script>

<style scoped>
.nav-searchinputs h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
}
.continer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/*  */
</style>
