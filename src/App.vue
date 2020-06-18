<template>
	<div id="app">
		<div class="monster">
			<span>Pikachu</span>
			<img src="/pika.jpg" alt="">

		</div>
	</div>
</template>

<script>
    let STORAGE_KEY = "data-clicker"
    let progressStorage = {
        fetch: () => {
            let progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
            progress.forEach((item, key) => {
                item.id = key
            })
            progressStorage.uid = progress.length
        },
        save: (progress) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
        }
    }

    export default {
        name: 'App',
        data () {
            return {
                progress: progressStorage.fetch(),
                newProgress: "",
			}
		},
		watch: {
            progress: {
                handler: function(progress) {
                    progressStorage.save(progress);
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
            clickProgress: function () {
                let value = this.newProgress && this.newProgress.trim();
                if (!value) {
                    return;
                }
                this.progress().push({
                    id: progressStorage.uid++,
                    title: value,
                    completed: false
                });
                this.newProgress = "";
			}
		}
    }
</script>

<style>
	.monster {
		width: 300px;
	}
	.monster img {
		width: 100%;
	}
	.monster span {
		display: block;
		padding-top: 10px;
		font-size: 16px;
		text-align: center;
	}
</style>
