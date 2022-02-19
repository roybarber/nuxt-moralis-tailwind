<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="pt-8 sm:pt-0">
				<SiteLogo/>
			</div>
			<div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
				<h2 class="text-2xl leading-7 font-semibold">
					Sample DAPP with Nuxt &amp; Moralis
				</h2>
				<p class="mt-3 text-gray-600">
					We recommend you take a look at the <a href="https://nuxtjs.org" target="_blank" class="button--doc text-green-500 hover:underline">Nuxt</a> &amp; <a href="https://moralis.io/" target="_blank" class="button--doc text-green-500 hover:underline">Moralis</a> documentation, whether you are new or have previous experience with the
					frameworks.
				</p>
				<div class="mt-4 pt-4 text-gray-800 border-t border-dashed">
					<div v-if="loading">
						<LoadingSpinner/>
					</div>
					<div v-else>
						<div v-if="currentUser">
							<h2>Welcome {{walletAddress}} your wallet balance is {{ethBalance}}ETH</h2>
							
							<div v-if="nftsForContract">
								<p v-if="nftsForContract.result.length">You have {{nftsForContract.result.length}} NFTs under this project</p>
								<p v-else>Sorry you dont hold any NFTs on our project.</p>
							</div>

							<div>You have {{nftCount ? nftCount : 0}} NFTs in total</div>

							<div v-if="this.ethBalance >= this.mintPrice">You have enough ETH to mint this project.</div>
							<div v-else>You need at least {{mintPrice}} plus gas to mint this project.</div>

							<button type="button" @click.prevent="logOut" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">Logout</button>
						</div>
						<div v-else>
							<div class="block items-center p-3 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800" v-if="showError">There was a problem connecting to your wallet, please try again!</div>
							<button type="button" @click.prevent="login" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">Login</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'IndexPage',
		data: () => ({
			contractAddress: null,
			multiplier: 1000000000000000000,
			mintPrice: 0.15,
			currentUser: null,
			walletAddress: null,
			ethBalance: null,
			nftsForContract: null,
			nftCount: null,
			loading: false,
			showError: false
		}),
		methods: {
			async login() {
				if(!this.currentUser) {
					try {
						this.currentUser = await this.$Moralis.authenticate({ signingMessage: "Hello World!" })
						this.getUserWalletDetail()
						this.showError = false
					} catch (error) {
						console.log(error)
						this.showError = true
					}
				}
			},
			async getUserWalletDetail(){
				this.loading = true
				this.walletAddress = this.currentUser.get('ethAddress')
				this.ethBalance = await this.$Moralis.Web3API.account.getNativeBalance()
				this.nftsForContract = await this.$Moralis.Web3API.account.getNFTsForContract({ token_address: this.contractAddress })
				this.nftCount = await this.$Moralis.Web3.getNFTsCount()
				this.ethBalance = Number(this.ethBalance.balance / this.multiplier)
				this.loading = false
			},

			async logOut() {
				await this.$Moralis.User.logOut()
				this.resetState()
			},

			resetState(){
				this.currentUser = null
				this.walletAddress = null
				this.ethBalance = null
				this.nftsForContract = null
				this.nftCount = null
			}
		},
		mounted(){
			if(this.currentUser) this.getUserWalletDetail()
		},
		async created() {
			this.currentUser = this.$Moralis.User.current();
			this.contractAddress = process.env.ContractId
		}
	}
</script>
