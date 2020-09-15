<template>
  <div>
    <div class="grid">
      <div class="output-grid output">
        <small class="history">{{ previousValue }}</small>
        <p class="output-text">
          <span v-if="error">{{ errorMsg }}</span>
          <span v-else>
            <span v-if="buffer">{{ resultValue }}</span><span v-else>{{ currentValue }}</span>
          </span>
        </p>
      </div>
      <button class="calc-grid btn-9 numeric" v-on:click="updateCurrent('9')">9</button>
      <button class="calc-grid btn-8 numeric" v-on:click="updateCurrent('8')">8</button>
      <button class="calc-grid btn-7 numeric" v-on:click="updateCurrent('7')">7</button>
      <button class="calc-grid btn-6 numeric" v-on:click="updateCurrent('6')">6</button>
      <button class="calc-grid btn-5 numeric" v-on:click="updateCurrent('5')">5</button>
      <button class="calc-grid btn-4 numeric" v-on:click="updateCurrent('4')">4</button>
      <button class="calc-grid btn-3 numeric" v-on:click="updateCurrent('3')">3</button>
      <button class="calc-grid btn-2 numeric" v-on:click="updateCurrent('2')">2</button>
      <button class="calc-grid btn-1 numeric" v-on:click="updateCurrent('1')">1</button>
      <button class="calc-grid btn-0 numeric" v-on:click="updateCurrent('0')">0</button>
      <button class="calc-grid btn-dec numeric" v-on:click="updateCurrent('.')">.</button>

      <button class="calc-grid btn-add" v-on:click="operand('add')">&#43;</button>
      <button class="calc-grid btn-subtract" v-on:click="operand('subtract')">&#45;</button>
      <button class="calc-grid btn-multiply" v-on:click="operand('multiply')">&times;</button>
      <button class="calc-grid btn-divide" v-on:click="operand('divide')">&divide;</button>

      <button class="calc-grid btn-square" v-on:click="updateCurrent('squareRoot')">&radic;</button>
      <button class="calc-grid btn-pi" v-on:click="updateCurrent('pi')">&pi;</button>

      <button class="calc-grid btn-cl red" v-on:click="clear()">C</button>
      <button class="calc-grid btn-ac red" v-on:click="allClear()">AC</button>
      <button class="calc-grid btn-equals utility" v-on:click="operand('equals')">=</button>
      <button class="calc-grid btn-negative" v-on:click="negative()">&#43;&#47;&#45;</button>

    </div>
  </div>
</template>

<script>

const maxIntegers = 9;
const errorMsg = "E";

export default {
  name: 'Calc',
  props: {
    msg: String
  },
  data(){
    return {
      currentValue: "0",
      resultValue: "",
      previousValue: "",
      buffer: false,
      error: false,
      errorMsg: errorMsg,
      operandType: "",
    }
  },
  methods: {

    reset: function (value) {
      this.buffer = true;
      this.operandType = value;
    },

    // format floats to 2 decimal places, rounded up.
    roundResult: function (number) {
      if (!Number.isInteger(number)) {
        return number.toFixed(2);
      } 
      return number;
    },

    // check formatting of 9 integer maximum output
    checkFormat: function (value) {
      if ( Math.trunc(Number(value)).toString().length  <= maxIntegers ){
        return true;
      } else {
        return false;
      }

    },

    checkOutput: function (value) {
      if ( this.checkFormat(value) ){
        this.buffer = false;
        this.error = false;
      } else {
        this.currentValue = "";
        this.error = true;
      }
    },

    // Switch statement handles which operand to perform.
    // The variable "operandType" is used to store the next operand to be applied.
    // Clicking any operand or the equals button will call the current operandType and then update the operandType variable.
    // This allows the calculator to stack equations (perform multiple operations in a row with or without clicking "equals")
    calculate: function (value) {

      switch (this.operandType) {
        case 'add':
          var computed = Number(this.resultValue) + Number(this.currentValue);
          this.checkOutput(computed);
          this.resultValue = this.roundResult(computed);
          this.reset(value);

          break;

        case 'subtract':
          var computed = Number(this.resultValue) - Number(this.currentValue);
          this.checkOutput(computed);
          this.resultValue = this.roundResult(computed);
          this.reset(value);
          break;

        case 'multiply':
          var computed = Number(this.resultValue) * Number(this.currentValue);
          this.checkOutput(computed);
          this.resultValue = this.roundResult(computed);
          this.reset(value);
          break;

        case 'divide':
          var computed = Number(this.resultValue) / Number(this.currentValue);
          this.checkOutput(computed);
          this.resultValue = this.roundResult(computed);
          this.reset(value);
          break;

        case 'equals':
          this.operandType = value;
          this.previousValue = this.resultValue;
          break;
    
        default:
          this.resultValue = this.currentValue;
          this.reset(value);
                    
      }
      this.previousValue = this.currentValue;

    },

    updateCurrent: function (value) {
      // called everytime a user clicks a numeric key

      // handle PI and square roots
      if ( value === "pi" ){

        this.previousValue = this.currentValue;
        this.currentValue = Math.PI.toFixed(2).toString()
        this.buffer = false;

      } else if ( value === "squareRoot" ){

        this.calculate("")
        this.currentValue = this.resultValue = this.roundResult(Math.sqrt(this.currentValue || this.resultValue));

      } else {

        // no special keys have been clicked

        // handle decimals and format to 2 decimal positions
        var hasDecimal = this.currentValue.split(".")[1]
        if ( hasDecimal ){
          if ( hasDecimal.length < 2) {
            this.currentValue += value;
          }
        } else {

          if (this.currentValue === '0') this.currentValue = "";
          if (this.currentValue === '-0') this.currentValue = "-";

          // add numeric to currently displayed value and check formatting
          this.currentValue += value;
          this.checkOutput(this.currentValue);
        
        }
      }
    },

    // call the switch statement with new operand
    operand: function (value) {
        this.calculate(value);
        this.currentValue = "";
    },

    swapNegative: function (value) {
      if (value[0] !== "-"){
        value = "-" + value;
      } else {
        value = value.substring(1);
      }
      return value;
    },

    // to handle the "+/-" key
    negative: function () {

      if (this.buffer) {
        this.resultValue = this.swapNegative(this.resultValue);
      } else {
        this.currentValue = this.swapNegative(this.currentValue);
      }
      
    },

    // Replaces the current value with the previous, very basic memory function
    clear: function () {
      if ( this.previousValue !== ""){
        this.currentValue = this.previousValue;
        this.previousValue = "";
      } else {
        this.currentValue = "0";
        this.previousValue = "";
      }
      this.resultValue = "";
      this.operandType = "";
      this.buffer = false
    },

    // clears everything
    allClear: function () {
      this.currentValue = "0";
      this.resultValue = "";
      this.operandType = "";
      this.previousValue = ""
      this.buffer = false
    },
  }
}
</script>

<style scoped>

.grid {
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-auto-rows: minmax(80px, auto);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  border: 1px solid #efefef;
  border-radius: 45px;
  padding: 10px;
  box-shadow:
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 100px 80px rgba(0, 0, 0, 0.12)
  ;

}
.output-grid {
  font-size: 2rem;
  border-radius: 45px;
  border: none;
}
.calc-grid {
  font-size: 2rem;
  border-radius: 45px;
  border: none;
  box-shadow:
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 100px 80px rgba(0, 0, 0, 0.12)
  ;
}
.output {
  grid-row: 1; 
  grid-column-start: 1; 
  grid-column-end: 5;
  border: 1px solid #efefef;
  padding: 10px
}
.history {
  float: right;
  font-size: 1rem;
  margin-right: 50px;
}
.btn-9 {grid-row: 2; grid-column: 3;}
.btn-8 {grid-row: 2; grid-column: 2;}
.btn-7 {grid-row: 2; grid-column: 1;}
.btn-6 {grid-row: 3; grid-column: 3;}
.btn-5 {grid-row: 3; grid-column: 2;}
.btn-4 {grid-row: 3; grid-column: 1;}
.btn-3 {grid-row: 4; grid-column: 3;}
.btn-2 {grid-row: 4; grid-column: 2;}
.btn-1 {grid-row: 4; grid-column: 1;}
.btn-0 {grid-row: 5; grid-column-start: 1; grid-column-end: 3}
.btn-dec {grid-row: 5; grid-column: 3;}
.btn-add {grid-row: 7; grid-column: 4;}
.btn-subtract {grid-row: 6; grid-column: 4;}
.btn-multiply {grid-row: 5; grid-column: 4;}
.btn-divide {grid-row: 4; grid-column: 4;}
.btn-square {grid-row: 6; grid-column: 1;}
.btn-pi {grid-row: 6; grid-column: 2;}
.btn-negative {grid-row: 6; grid-column: 3;}
.btn-ac {grid-row: 3; grid-column: 4;}
.btn-cl {grid-row: 2  ; grid-column: 4;}
.btn-equals {grid-row: 7; grid-column-start: 1; grid-column-end: 4}


.numeric {
  background: #5bc0de54;
}
.red {
  background: #d9534f54;
}
.utility {
  background: #5cb85c63;
}
</style>
