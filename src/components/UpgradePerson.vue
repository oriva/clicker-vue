<template>
	<button @click="showModal">Upgrade</button>

</template>

<script>
    export default {
        name: 'UpgradePerson',
        props: {
            msg: String
        },
		data () {
            return {
                showModal: false
			}
        }
    }
</script>

<style scoped>
	.modal {
		display: none;
	}
</style>
