<template>
	<div>
		<b-button @click="showModal = !showModal">Upgrade</b-button>
		<b-modal v-model="showModal" title="Усиление персонажа" ok-only>
			<b-button @click="upgradeAttack"><img src="/money.svg" class="my-stat-icon" alt=""> {{ moneyForUpgrade }}</b-button>
			<div class="d-inline-block pl-4">
				<img src="/sword.svg" class="my-stat-icon" alt=""><strong> {{ attackMin }} - {{ attackMax }}</strong>
			</div>
		</b-modal>
	</div>
</template>

<script>
    export default {
        name: 'UpgradePerson',
		props: ['stats'],
		data () {
            return {
                showModal: false
			}
        },
		computed: {
            attackMin: function () {
				return this.stats.attack.min + this.stats.attack.upgrade
			},
            attackMax: function () {
				return this.stats.attack.max + this.stats.attack.upgrade
			},
            moneyForUpgrade: function () {
                return Math.round(this.stats.attack.upgrade * 2.5)
			}
		},
		methods: {
            upgradeAttack: function () {
                console.log(this.moneyForUpgrade)
                if(this.stats.money - this.moneyForUpgrade >= 0) {
                    this.stats.money -= this.moneyForUpgrade
                    this.stats.attack.upgrade++
                }
			}
		}
    }
</script>

<style scoped>
	.modal {
		display: none;
	}
</style>
