export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Environment variables: https://nuxtjs.org/docs/directory-structure/nuxt-config/#env
	env: {
		MoralisServerUrl: process.env.MORALIS_SERVER_URL,
		MoralisAppId: process.env.MORALIS_APP_ID,
		ContractId: process.env.CONTRACT_ID,
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'nuxt-moralis',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		script: [
		  {
			src: "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
		  }
		],
	},


	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/css/main.css',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~plugins/moralis.js'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxt/postcss8',
		'@nuxtjs/svg',
		'@nuxtjs/google-fonts'
	],
	

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		}
	}
}
