<template>
  <div id="app">
    <web-header></web-header>
    <transition name="web" mode="out-in">
      <router-view></router-view> 
    </transition>
  </div>
</template>

<script>
  import webHeader from '@/components/Header'
  export default {
    components:{
      webHeader
    }
  }
</script>

<style>
  .web-enter{opacity: 0;}
  .web-enter-to{opacity: 1;}
  .web-enter-active{transition: 1s;} /*定义过渡时间*/
  .web-leave{opacity: 1;}
  .web-leave-to{opacity: 0;}
  .web-leave-active{transition: 1s;} 
</style>
