<script setup lang="ts">
definePageMeta({
  colorMode: "dark",
});

const people = [
  {
    name: "Stark Lai",
    role: "Founder / CEO / Solo Hacker",
    imageUrl: "/assets/avatar/stark-wwdc.png",
    bio: [
      'Full Stack Hacker',
      'Serial entrepreneur',
      'Coding for almost 20 years',
      'Build over 10+ MVP in Web3',
      'Fan of JavaScript, VueJS, NuxtJs, TailwindCSS, Solidity, AO, Lua',
      'Solo hacking and winning over 20 Web3 Hackathon track prizes',
    ],
    xUrl: "https://x.com/StarkEVM99",
    linkedinUrl: "https://www.linkedin.com/in/starklai",
  },
];
</script>

<template>
  <UMain class="flex justify-center items-center">
    <UContainer>
      <ULandingSection headline="Web3 Full Stack Hackers with">
        <template #title><span class="text-3xl">Passionate, Decentralized, Autonomy</span></template>
        <template #description><span class="font-bold text-rainbow animate-pulse text-7xl uppercase">Assemble</span> </template>
      </ULandingSection>
      <ul role="list" class="divide-y space-y-12 divide-gray-200">
        <li v-for="person in people" :key="person.name" class="flex flex-col pt-12 gap-10 sm:flex-row">
          <img class="flex-none object-cover rounded-2xl w-52 aspect-[4/5]" :src="person.imageUrl" alt="" />
          <div class="flex-auto max-w-xl">
            <h3 class="font-semibold text-lg text-white tracking-tight leading-8">{{ person.name }}</h3>
            <p class="text-base text-gray-300 leading-7">{{ person.role }}</p>
            <p class="mt-6 text-base text-gray-400 leading-7">
              <ul class="list-disc pl-4">
                <li v-for="item in person.bio" :key="index">{{ item }}</li>
              </ul>
            </p>
            <ul role="list" class="flex mt-6 gap-x-6">
              <li>
                <a :href="person.xUrl" target="_blank" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">X</span>
                  <UIcon name="i-ri-twitter-x-line" class="h-5 w-5" />
                </a>
              </li>
              <li>
                <a :href="person.linkedinUrl" target="_blank" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">LinkedIn</span>
                  <UIcon name="i-mdi-linkedin" class="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="flex flex-col pt-12 gap-10 sm:flex-row">
          <UIcon class="rounded-2xl h-52 w-52 "  name="i-noto-ninja-medium-skin-tone" alt="" />
          <div class="flex-auto max-w-xl">
            <h3 class="font-semibold text-lg text-white tracking-tight leading-8">Join Us</h3>
            <p class="mt-6 text-base text-gray-400 leading-7">
              You must be passionate about Web3 with a tech background. You need to eat your dog's shit which is your responsibility to deliver your product and code also including making hacker growth with it. DM <a href="https://x.com/HelloRWA" target="_blank" class="text-primary"> @HelloRWA</a>.
            </p>
            <ul role="list" class="flex mt-6 gap-x-6">
              <li>
                <a href="https://x.com/HelloRWA" target="_blank" class="text-gray-400 hover:text-gray-500">
                  <span class="sr-only">X</span>
                  <UIcon name="i-ri-twitter-x-line" class="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </UContainer>
  </UMain>
</template>
