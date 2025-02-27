<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'

const version = __VERSION__
const shepherdToken = ref<string | null>(null)
const myNumber = ref(0)
const shepherdTokenStorageKey = 'shepToken'
const displayName = __DISPLAY_NAME__
const gitURL = __GITHUB_URL__
const gitCommit = __GIT_COMMIT__
const gitCommitURL = `${gitURL}/commit/${gitCommit}`

const store = useAppStore()

onMounted(() => {
  //load token from storage
  fetchTokenFromStorage()
})

const fetchTokenFromStorage = () => {
  chrome.storage.local.get('shepToken', function (data) {
    // Do something with data.key
    shepherdToken.value = data.shepToken
    console.log(data.shepToken)
  })
}

const copyToClipboard = () => {
  console.log('copy to clipboard')
  var copyText = document.getElementById('tokenElement')
  copyText.select()
  copyText.setSelectionRange(0, 99999) /*For mobile devices*/
  document.execCommand('copy')
}

const name = computed(() => store.name)
const count = computed(() => store.count)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold pb-2 text-center">
      Shepherd Chrome Extension
    </h1>
  </div>
  <div class="flex flex-row w-full mb-4 mt-2">
    <div class="w-full text-left uppercase pt-1 mr-2 align-top text-center">
      <b>How to use:</b>
      Open a tab where you are logged into shepherd. After clicking any link in
      shepherd, click the button to fetch your token. You can paste it into
      Companion to use the API.
    </div>
  </div>
  <div class="flex flex-row w-full mb-4 mt-2">
    <div class="w-1/2 uppercase pt-1 mr-2 align-top text-center">
      <button
        class="btn btn-primary text-xs h-12 w-1/2"
        @click="fetchTokenFromStorage"
      >
        Fetch Token
      </button>
    </div>
    <div class="w-1/2 uppercase pt-1 mr-2 align-top text-center">
      <button
        class="btn btn-primary text-xs h-12 w-1/2"
        :disabled="!shepherdToken"
        @click="copyToClipboard"
      >
        Copy to Clipboard
      </button>
    </div>
  </div>

  <div class="text-center m-4 flex flex-col gap-y-2">
    <textarea
      id="tokenElement"
      v-model="shepherdToken"
      class="w-full h-24 text-xs"
    ></textarea>

    <div class="flex gap-x-2 justify-center"></div>

    <RouterLink
      class="underline"
      to="/common/about"
    ></RouterLink>
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md bg-blue-500 text-white;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
