const app = Vue.createApp({
    data() {
        return {
            taxRate: 0.10,
            movieType: '余興ムービー',
            basePrice: 50000,
            addPrice1: 10000,
            addPrice2: 15000,
            addPrice3: 20000,
            addPrice4: 35000,
            optPrice: 0,
            totalPrice: 0,
            wedding_date: '',
            delivery_date: '',
            opt1_check: false,
            opt1_price: 5000,
            opt2_check: false,
            opt2_price: 5000,
            opt3_check: false,
            opt3_price: 5000,
            opt4_num: 0,
            opt4_price: 500,
            tomorrow: null
        }
    },
    watch:{
        wedding_date(newValue, oldValue){
            const y = this.wedding_date.value.split('-')[0];
            const m = this.wedding_date.value.split('-')[1];
            const d = this.wedding_date.value.split('-')[2];
            const dt = new Date(y, m - 1, d);
            dt.setDate(dt.getDate() - 7);
            this.delivery_date = this.formatDate(dt);
        }    
    },
    methods: {
        formatDate(dt){
            return [
                dt.getFullYear(),
                ('00' + (dt.getMonth() +1)).slice(-2),
                ('00' + dt.getDate()).slice(-2),
            ].join('-');
        },
        incTax(untaxed){
            return Math.floor(untaxed * (1 + this.taxRate));
        },
        getDateDiff(dateString1, dateString2){
            const date1 = new Date(dateString1);
            const date2 = new Date(dateString2);
            const diff = date1.getTime() - date2.getTime();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
    },
    computed: {
        taxedOpt1(){
            return this.incTax(this.opt1_price);
        },
        taxedOpt2(){
            return this.incTax(this.opt2_price);
        },
        taxedOpt3(){
            return this.incTax(this.opt3_price);
        },
        taxedOpt4(){
            return this.incTax(this.opt4_price);
        },
        taxedBasePrice(){
            let addPrice = 0;
            const diff  = this.getDateDiff(this.delivery_date, (new Date()).toLocaleString());
            if(14 <= diff && diff < 21){
                addPrice = this.addPrice1;
            }
            else if(7 <= diff && diff < 14) {
                addPrice = this.addPrice2;
            }
            else if(3 < diff && diff < 7){
                addPrice = this.addPrice3;
            }
            else if(diff <= 3){
                addPrice = this.addPrice4;
            }
            return this.incTax(this.basePrice + addPrice);
        },
        taxedOptPrice() {
            let optPrice = 0;
            if(this.opt1_check){optPrice += this.opt1_price;}
            if(this.opt2_check){optPrice += this.opt2_price;}
            if(this.opt3_check){optPrice += this.opt3_price;}
            if(this.opt4_num === ''){this.opt4_num = 0;}
            optPrice += this.opt4_num * this.opt4_price;
            return this.incTax(optPrice);
        },
        taxedTotalPrice(){
            return (this.taxedBasePrice + this.taxedOptPrice);
        },
        tomorrow(){
            const dt = new Date();
            dt.setDate(de.getDate() + 1);
            return this.formatDate(dt);
        }
    },
    created() {
        const dt = new Date();
        dt.setMonth(dt.getMonth() + 2);
        this.wedding_date = this.formatDate(dt);
        dt.setDate(dt.getDate() - 7);
        this.delivery_date = this.formatDate(dt);
        const dt2 = new Date();
        dt2.setDate(dt2.getDate() + 1);
        this.tomorrow = this.formatDate(dt2);
    }
})
app.config.globalProperties.$filters = {
    number_format(val){
        return val.toLocaleString();
    }
}
const vm= app.mount('#app');
