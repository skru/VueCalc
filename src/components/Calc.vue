<template>
  <div class="grid">
    <div class="output-grid">
      <small class="history">{{ history }}</small>
      <p class="output-text">
        {{ screen }}
      </p>
    </div>  
    <button v-for="btn in buttons" 
      :key="btn.id" :ref="btn.id" 
      :class="btn.classes"
      @click="btnClick(btn)"
      @animationend="animated = false"
      v-html="btn.text">
    </button>
  </div>
</template>


<script>
export default {
  data(){
    return {
      buttons: [
        { 
          id: "btn-9", 
          classes: "calc-grid btn-9 numeric", 
          key: "9",
          text: "9",
        },
        { 
          id: "btn-8", 
          classes: "calc-grid btn-8 numeric", 
          key: "8",
          text: "8",
        },
        { 
          id: "btn-7", 
          classes: "calc-grid btn-7 numeric", 
          key: "7",
          text: "7",
        },
        { 
          id: "btn-6", 
          classes: "calc-grid btn-6 numeric", 
          key: "6",
          text: "6",
        },
        { 
          id: "btn-5", 
          classes: "calc-grid btn-5 numeric", 
          key: "5",
          text: "5",
        },
        { 
          id: "btn-4", 
          classes: "calc-grid btn-4 numeric", 
          key: "4",
          text: "4",
        },
        { 
          id: "btn-3", 
          classes: "calc-grid btn-3 numeric", 
          key: "3",
          text: "3",
        },
        { 
          id: "btn-2", 
          classes: "calc-grid btn-2 numeric", 
          key: "2",
          text: "2",
        },
        { 
          id: "btn-1", 
          classes: "calc-grid btn-1 numeric", 
          key: "1",
          text: "1",
        },
        { 
          id: "btn-0", 
          classes: "calc-grid btn-0 numeric", 
          key: "0",
          text: "0",
        },
        { 
          id: "btn-dec", 
          classes: "calc-grid btn-dec numeric", 
          key: ".",
          text: ".",
        },
        { 
          id: "btn-add", 
          classes: "calc-grid btn-add", 
          key: "+",
          text: "&#43;",
        },
        { 
          id: "btn-subtract", 
          classes: "calc-grid btn-subtract", 
          key: "-;",
          text: "&#45;",
        },
        { 
          id: "btn-multiply", 
          classes: "calc-grid btn-multiply", 
          key: "*",
          text: "&times;",
        },
        { 
          id: "btn-divide", 
          classes: "calc-grid btn-divide", 
          key: "/",
          text: "&divide;",
        },
        { 
          id: "btn-sqrt", 
          classes: "calc-grid btn-square", 
          key: "",
          text: "&radic;",
        },
        { 
          id: "btn-pi", 
          classes: "calc-grid btn-pi", 
          key: "",
          text: "&pi;",
        },
        { 
          id: "btn-cl", 
          classes: "calc-grid btn-cl red", 
          key: "",
          text: "C",
        },
        { 
          id: "btn-ac", 
          classes: "calc-grid btn-ac red", 
          key: "",
          text: "AC",
        },
        { 
          id: "btn-equals", 
          classes: "calc-grid btn-equals utility", 
          key: "",
          text: "=",
        },
        { 
          id: "btn-negative", 
          classes: "calc-grid btn-negative", 
          key: "&#43;&#47;&#45;",
          text: "&#43;&#47;&#45;",
        },
      ],
      screen: "0",
      history: "",
      operand: "",
      left: "",
      result: "",
      awaitingRight: false,
      animated: false
    }
  },
  methods: {

    animate (btn) {
      this.animated = true
      this.$refs[btn.id][0].classList.remove("animate")
      this.$refs[btn.id][0].offsetHeight;
      this.$refs[btn.id][0].classList.add("animate")
    },

    btnClick(btn) {
      this.animate(btn)
      switch(btn.id) {
        case "btn-0":
        case "btn-1":
        case "btn-2":
        case "btn-3":
        case "btn-4":
        case "btn-5":
        case "btn-6":
        case "btn-7":
        case "btn-8":
        case "btn-9":
          this.numerical(btn.key)
          break;
        case "btn-add":
        case "btn-subtract":
        case "btn-multiply":
        case "btn-divide":
          this.addOperand(btn.key)
          break;
        case "btn-sqrt":
          this.sqrt()
          break;
        case "btn-pi":
          this.pi()
          break;
        case "btn-ac":
          this.clearAll()
          break;
        case "btn-cl":
          this.clear()
          break;
        case "btn-equals":
          this.equals()
          break;
        case "btn-dec":
          this.setDecimal()
          break;
        case "btn-negative":
          this.setNegative()
          break;
      }
    },

    numerical(value) {
      // called everytime a user clicks a numeric key
      if (this.screen === "0" || this.showingresult || this.awaitingRight) {
        this.screen=value
        this.showingresult = false
        this.awaitingRight = false
      } else {
        this.screen+=value
      }
    },

    setDecimal() {
      if (!this.screen.includes(".")) {
        if (this.isDecimal()) {
          this.screen = this.screen.slice(0, -1);
        }else {
          this.screen+="."
        }
      }
    },

    isDecimal() {
      let value = this.screen.slice(-1)
      if (value === ".") return true
      return false
    },

    setNegative() {
      if (!this.screen.includes("-")) {
        this.screen = "-" + this.screen
      } else {
        this.screen = this.screen.substring(1)
      }
    },

    isNegative() {
      let value = this.screen.slice(1)
      if (value === "-") return true
      return false
    },

    addOperand(operand) {
      if (this.awaitingRight) {
        this.operand = operand
        this.history = `${this.left} ${operand}`
      } else {
        if (this.operand) {
          this.equals()
          this.operand = operand
        } else {
          this.left = parseFloat(this.screen)
          this.operand = operand
          this.history = `${this.left} ${operand}`
          this.awaitingRight = true
        }
      }
    },

    equals() {
      if (!this.showingresult && this.operand) { // stop enter when already showing result
        this.calculate()
        this.operand = ""
      }
    },

    calculate() {
      const left = this.left
      const right = parseFloat(this.screen)
      let result = this.sum(left, this.operand, right)  
      if (!Number.isInteger(result)) {
        result =  parseFloat((result).toFixed(8))
      } 
      this.screen = result.toString()
      this.left = result
      this.showingresult = true
      this.history = `${left} ${this.operand} ${right}`
    },

    sum(left, operand, right) {
      switch (operand) {
        case '+':
          return left + right
        case '-':
          return left - right
        case '*':
          return left * right
        case '/':
          return left / right              
      }
    },

    sqrt() {
      if (this.screen !== "0") {
        this.screen = Math.sqrt(this.screen).toFixed(8)
      }
    },

    pi() {
      this.screen = Math.PI.toFixed(8).toString()
      this.showingresult = false
      this.awaitingRight = false
    },

    clear() {
      this.screen = "0"
    },

    // clears everything
    clearAll() {
      this.screen = "0",
      this.history = "",
      this.operand = "",
      this.left = "",
      this.rightHandValue = "",
      this.result = ""
      this.awaitingRight = false
      this.showingresult = false
    }
  }
}
</script>


<style scoped>

.animate  {
  animation: btn-press 0.2s;
}
@keyframes btn-press {
  0% {
    transform: translateY(4px);
    box-shadow: none;
  }

  100% {
    transform: translateY(0);
  }
}


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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

}
.output-grid {
  font-size: 2rem;
  border-radius: 45px;
  border: 1px solid #efefef;
  grid-row: 1; 
  grid-column-start: 1; 
  grid-column-end: 5;
  
  padding: 10px;
  text-align: right;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.output-grid::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.calc-grid {
  font-size: 1rem;
  border-radius: 45px;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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
