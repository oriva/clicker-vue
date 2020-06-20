
<template>
	<div id="app">
		<div class="container-fluid">
			<div class="row">

		<div v-for="(monster, id) in monsters" :key="id"
				class="monster col-4">
			<span>{{ monster.name }}</span>
			<b-progress :value="monster.hp.now" :max="monster.hp.full"  variant="danger"></b-progress>
			<span>{{ monster.hp.now }} / {{ monster.hp.full }}</span>
			<img
					@click="attack(id)"
					:src="monster.img">
		</div>

		<div class="my-stat">
			<div>
				Money: {{ personStats.money }}
			</div>
			<div>
				Attack: {{ personStats.attack.min }} - {{ personStats.attack.max }}
			</div>
			<div>
				<b-progress :max="personStats.hp.full" variant="danger">
					<b-progress-bar variant="danger" :value="personStats.hp.now">
						<strong>{{ personStats.hp.now }} / {{ personStats.hp.full }}</strong>
					</b-progress-bar>
				</b-progress>
			</div>

			<div>
				<b-progress :value="personStats.exp.now" :max="personStats.exp.need" variant="dark"></b-progress>
				<strong>exp: {{ personStats.exp.now }} / {{ personStats.exp.need }}</strong>
			</div>
		</div>

			</div>
		</div>
	</div>
</template>

<script>
    import Vue from 'vue'
    import { BootstrapVue } from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    Vue.use(BootstrapVue)

    const yourStats = () => {
        return {
            'hp': {
                'now': 200,
                'full': 215
            },
            'attack': {
                'min': 2,
                'max': 4
            },
			'money': 10,
			'exp': {
                'now': 0,
				'need': 100000
			},
            'regeneration': {
                'min': 1,
                'max': 7
            }
        }
    }
    const monstersLoad = () => {
        return {
            0: {
                'name': 'Pikachu',
                'img': '/pika.jpg',
                'hp': {
                    'now': 10,
                    'full': 10
                },
                'attack': {
                    'min': 1,
                    'max': 2
                },
                'defense': 0,
                'critical-chance': 0,
                'loot': {
                    'money': {
                        'min': 1,
                        'max': 4
                    },
					'exp': 10
                }
            },
            1: {
                'name': 'Pikachu',
                'img': '/cher.png',
                'hp': {
                    'now': 15,
                    'full': 15
                },
                'attack': {
                    'min': 1,
                    'max': 3
                },
                'defense': 0,
                'critical-chance': 0,
                'loot': {
                    'money': {
                        'min': 3,
                        'max': 6
                    },
					'exp': 15
                }
            },
            2: {
                'name': 'Big russian boss',
                'img': '/brb.png',
                'hp': {
                    'now': 7777,
                    'full': 7777
                },
                'attack': {
                    'min': 10,
                    'max': 55
                },
                'defense': 2,
                'critical-chance': 10,
                'loot': {
                    'money': {
                        'min': 100,
                        'max': 4000
                    },
                    'exp': 10000
                }
            },
        };
    }

    const randomStat = (stat) => {
        return Math.floor(Math.random() * (stat.max - stat.min) + stat.min);
	}

    let progressStorage = {
        fetch: (locName) => {
            locName = locName || 'monster-progress'
            let progress = JSON.parse(localStorage.getItem(locName) || '[]')
			if(locName==='monster-progress') {
                let monster = monstersLoad()
                for (let item in monster) {
                    if(progress[item]===undefined)
                        continue
                    if (progress[item].hp.now !== progress[item].hp.full) {
                        monster[item].hp.now = progress[item].hp.now
                    }
                }
                progress = monster;
			} else {
                if (progress.length === 0) {
                    progress = yourStats()
				} else {
                    let staticProgress = yourStats()
                    Object.keys(staticProgress).forEach(function(key) {
                        if (progress[key]===undefined) {
                            progress[key] = this[key]
						}
                    }, staticProgress);
				}
			}
            return progress
        },
        save: (progress, locName) => {
            locName = locName || 'monster-progress'
            localStorage.setItem(locName, JSON.stringify(progress))
        }
    }

    export default {
        name: 'App',
        data () {
            return {
				personStats: progressStorage.fetch('person-progress'),
                monsters: progressStorage.fetch(),
			}
		},
		watch: {
            monsters: {
                handler: function(monsters) {
                    progressStorage.save(monsters, 'monster-progress');
                },
                deep: true
			},
            personStats: {
                handler: function(personStats) {
                    progressStorage.save(personStats, 'person-progress');
				},
                deep: true
			}
		},

        methods: {
            attack: function (keyMonster) {
                let attackResult = this.monsters[keyMonster].hp.now - randomStat(this.personStats.attack)
				attackResult <= 0 ? this.dieMonster(keyMonster) : this.monsters[keyMonster].hp.now = attackResult

				let monsterAttackYou = this.personStats.hp.now - randomStat(this.monsters[keyMonster].attack)
                monsterAttackYou <= 0 ? this.youDie() : this.personStats.hp.now = monsterAttackYou

                this.regenHp()
			},
			regenHp: function (regen = this.personStats.regeneration) {
                let hpNow = this.personStats.hp.now
                let hpMax = this.personStats.hp.full
				if (typeof regen === 'object') {
                    regen = randomStat(regen)
				}
				hpNow+regen>hpMax?hpNow=hpMax:hpNow+=regen
                this.personStats.hp.now = hpNow
			},
			dieMonster: function (keyMonster) {
                this.monsters[keyMonster].hp.now = this.monsters[keyMonster].hp.full
				this.personStats.money += randomStat(this.monsters[keyMonster].loot.money)
				this.personStats.exp.now += this.monsters[keyMonster].loot.exp
            },
            youDie: function () {
                console.log('you die')
                this.personStats.hp.now = this.personStats.hp.full
				if(this.personStats.exp.now!==0)
                    this.personStats.exp.now = Math.round(this.personStats.exp.now*0.98)
            }
		}
    }
</script>

<style>
	#app {
		min-height: 100vh;
		position: relative;
	}
	.monster img {
		width: 100%;
		cursor: pointer;
	}
	.monster span {
		display: block;
		padding-top: 10px;
		font-size: 16px;
		text-align: center;
	}
	.my-stat {
		position: absolute;
		left: 0;
		width: 100%;
		bottom: 0;
		padding: 30px 50px;
		background-color: #ddd;
	}
</style>
