<template>
  <div class="header">
    <Logo />
    <NavMenu class="ml-100" />

    <div class="right-logo">
      <Moon v-if="dark" @click.native="handleSwitch" />
      <Sun v-else @click.native="handleSwitch" />
    </div>
  </div>
</template>

<script>
import Logo from '../docschina/svg/Logo.vue'
import Moon from '../docschina/svg/Moon.vue'
import Sun from '../docschina/svg/Sun.vue'
import NavMenu from './NavMenu.vue'
export default {
  components: { Logo, Moon, Sun, NavMenu },

  data() {
    return {
      dark: true,
    }
  },

  methods: {
    handleSwitch() {
      this.dark = !this.dark;
    }
  },

}

</script>

<style lang="scss" scoped>
$header-height: 84px;

.header {
  width: 100%;
  height: $header-height;
  background-color: rgb(18, 27, 65);
  display: flex;
  position: fixed;
  top: 0;
  z-index: 10000;

  .right-logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
}

</style>
