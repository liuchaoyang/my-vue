<template>
    <div>user hello
        <div v-if="loading">Loading...</div>

        <div
                v-else
                v-for="currency in info"
                class="currency"
        >
            {{ currency.description }}:
            <span class="lighten">
        <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
      </span>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'

    Vue.use(axios)

    export default {
        name: "user-hello",
        data () {
            return {
                info: null,
                loading: true,
                errored: false
            }
        },
        filters: {
            currencydecimal (value) {
                return value.toFixed(2)
            }
        },
        mounted () {
            axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then(response => {
                    this.info = response.data.bpi
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
</script>

<style scoped>

</style>