
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
			</div>
		</div>
		<div class="my-stat align-items-center">
			<div class="col-auto">
				<div class="my-stat__avatar">
					<img :src="personStats.info.avatar" alt="">
					<div>
						<span>
							{{ personStats.level }} <br><small>lvl</small>
						</span>
					</div>
				</div>
			</div>
			<div class="my-stat__money-block col-auto">
				<img src="/money.svg" class="my-stat-icon" alt=""> {{ personStats.money }}
			</div>
			<div class="col-auto">
				<img src="/sword.svg" class="my-stat-icon" alt=""> {{ attackSum.min }} - {{ attackSum.max }}
			</div>
			<div class="col">
				<UpgradePerson :stats="personStats"/>
			</div>
			<div class="col-12 progress-stat">
				<b-progress :max="personStats.hp.full" variant="danger">
					<b-progress-bar variant="danger" :value="personStats.hp.now">
						<strong>{{ personStats.hp.now }} / {{ personStats.hp.full }}</strong>
					</b-progress-bar>
				</b-progress>
			</div>

			<div class="col-12 progress-stat">
				<b-progress :value="personStats.exp.now" :max="personStats.exp.need" variant="dark"></b-progress>
				<strong>exp: {{ personStats.exp.now }} / {{ personStats.exp.need }}</strong>
			</div>
		</div>
	</div>
</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import UpgradePerson from './components/UpgradePerson'
    import {BootstrapVue} from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import {debounce} from "debounce"

    Vue.use(BootstrapVue);
    Vue.use(Vuex);

    const yourStats = () => {
        return {
            'info': {
                'name': 'Gigurda',
				'avatar': '/avatar.jpg'
			},
			'level': 1,
            'hp': {
                'now': 200,
                'full': 215,
                'upgrade': 0,
                'items': 0
            },
            'attack': {
                'min': 2,
                'max': 4,
				'upgrade': 0,
				'items': 0
            },
			'money': 10,
			'exp': {
                'now': 0,
				'need': 100,
			},
            'regeneration': {
                'min': 1,
                'max': 7,
                'upgrade': 0,
                'items': 0
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
                    'now': 150,
                    'full': 150
                },
                'attack': {
                    'min': 15,
                    'max': 19
                },
                'defense': 0,
                'critical-chance': 0,
                'loot': {
                    'money': {
                        'min': 15,
                        'max': 60
                    },
                    'exp': 150
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
                        'min': 1000,
                        'max': 40000
                    },
                    'exp': 10000
                }
            },
        };
    }

    const randomStat = (stat) => {
        return Math.floor(Math.random() * (stat.max - stat.min) + stat.min);
	};

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
						} else {
                            if(typeof progress[key] == 'object') {
                                Object.keys(staticProgress[key]).forEach((keyToo) => {
                                    if (progress[key][keyToo]===undefined) {
                                        progress[key][keyToo] = this[key][keyToo]
                                    }
                                })
							}
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
		components: {
            UpgradePerson
		},
        data () {
            return {
				personStats: progressStorage.fetch('person-progress'),
                monsters: progressStorage.fetch(),
			}
		},
		computed: {
            attackSum: function () {
                return {
                    'min': this.personStats.attack.min + this.personStats.attack.upgrade,
					'max': this.personStats.attack.max + this.personStats.attack.upgrade
                }
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
            attack: debounce(function (keyMonster) {
                let attackResult = this.monsters[keyMonster].hp.now - randomStat(this.attackSum)
				attackResult <= 0 ? this.dieMonster(keyMonster) : this.monsters[keyMonster].hp.now = attackResult

				let monsterAttackYou = this.personStats.hp.now - randomStat(this.monsters[keyMonster].attack)
                monsterAttackYou <= 0 ? this.youDie() : this.personStats.hp.now = monsterAttackYou

                this.regenHp()
            }, 100),
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
		margin-top:       40px;
		position:         fixed;
		left:             0;
		width:            100%;
		bottom:           0;
		display:          flex;
		flex-wrap:        wrap;
		padding:          30px 50px;
		background-color: #ddd;
	}
	.my-stat-icon {
		width: 30px;
	}

	.my-stat__avatar {
		position: relative;
		display: block;
		width: 70px;
		height: 70px;
		overflow: hidden;
		border: 2px solid #ee9233;
		border-radius: 50%;
		cursor: pointer;
		transition: .3s ease-in-out;
	}

	.my-stat__avatar:hover {
		transform: scale(1.05);
	}

	.my-stat__avatar span {
		text-align: center;
		line-height: 0.9;
	}

	.my-stat__avatar img {
		height:     100%;
		width:      100%;
		object-fit: cover;
	}

	.my-stat__avatar div {
		position:         absolute;
		left:             0;
		top:              0;
		width:            100%;
		height:           100%;
		display:          flex;
		align-items:      center;
		justify-content:  center;
		z-index:          2;
		color:            #FFF;
		font-size:        20px;
		font-weight:      bold;
		vertical-align:   middle;
		background-color: rgba(0, 0, 0, 0.69);
	}

	.progress-stat {
		margin-top: 15px;
	}
</style>
