
<template>
	<div id="app">
		<div v-for="(monster, id) in monsters" :key="id"
				class="monster">
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
			'money': 10
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
                    }
                }
            }
        };
    }
    let progressStorage = {
        fetch: () => {
            let progress = JSON.parse(localStorage.getItem('monster-progress') || '[]')
			let monster = monstersLoad()
            for (let item in monster) {
                if (progress[item]===undefined) {
                    progress[item] = monster[item]
				}
            }
            return progress
        },
        save: (progress) => {
            localStorage.setItem('monster-progress', JSON.stringify(progress))
        }
    }

    export default {
        name: 'App',
        data () {
            return {
				personStats: yourStats(),
                monsters: progressStorage.fetch()
			}
		},
		watch: {
            monsters: {
                handler: function(monsters) {
                    progressStorage.save(monsters);
                },
                deep: true
			}
		},
		computed: {
            allDone: {
                get: function() {
                    return this.remaining === 0;
                },
                set: function(value) {
                    this.progress.forEach(function(info) {
                        info.completed = value;
                    });
                }
            }
		},

        methods: {
            attack: function (keyMonster) {
                let attackResult = this.monsters[keyMonster].hp.now - this.randomStat(this.personStats.attack)
				attackResult <= 0 ? this.dieMonster(keyMonster) : this.monsters[keyMonster].hp.now = attackResult
				let monsterAttackYou = this.personStats.hp.now - this.randomStat(this.monsters[keyMonster].attack)
                monsterAttackYou <= 0 ? this.youDie() : this.personStats.hp.now = monsterAttackYou
			},
			randomStat: function (stat) {
                return Math.floor(Math.random() * (stat.max - stat.min) + stat.min);
			},
			dieMonster: function (keyMonster) {
                this.monsters[keyMonster].hp.now = this.monsters[keyMonster].hp.full
            },
            youDie: function () {
                this.personStats.hp.now = this.personStats.hp.max
            }
		}
    }
</script>

<style>
	body {
		min-height: 100vh;
	}
	.monster {
		width: 300px;
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
