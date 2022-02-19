import Moralis from 'moralis/dist/moralis.min.js';

Moralis.start({
	serverUrl: process.env.MoralisServerUrl,
	appId: process.env.MoralisAppId
})

export default (_, inject) => {
	inject('Moralis', Moralis)
}
