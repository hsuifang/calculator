
  let app = new Vue({
    el: '#app',
    data: {
      templateBox: '',
      total: 0,
      keys: ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '+', '0', '00', '.', '-'],
      keyReg: /\+|\-|\×|\÷/
    },
    methods: {
      // 按下計算總數
      calculatorTotal () {
        if (this.templateBox) {
          // 如果最後一個值為運算子，移除
          this.templateBox = this.keyReg.test(this.templateBox[this.templateBox.length -1])
            ? this.templateBox.slice(0, -1) 
            : this.templateBox

          let calculatorString = this.templateBox.split(this.keyReg);
          let calculatorOperators = this.templateBox.replace(/[0-9]|\./g, '').split('');

          ['×', '÷', '+', '-'].forEach(items => {
            let index = calculatorOperators.indexOf(items)
            if (items === '×') {
              while (index !== -1) {
                calculatorString.splice(index, 2, calculatorString[index] * calculatorString[index + 1])
                calculatorOperators.splice(index, 1)
                index = calculatorOperators.indexOf(items)
              }
            } else if (items === '÷') {
              while (index !== -1) {
                calculatorString.splice(index, 2, calculatorString[index] / calculatorString[index + 1])
                calculatorOperators.splice(index, 1)
                index = calculatorOperators.indexOf(items)
              }
            } else if (items === '+') {
              while (index !== -1) {
                calculatorString.splice(index, 2, Number(calculatorString[index]) + Number(calculatorString[index + 1]))
                calculatorOperators.splice(index, 1)
                index = calculatorOperators.indexOf(items)
              }
            } else if (items === '-') {
              while (index !== -1) {
                calculatorString.splice(index, 2, calculatorString[index] - calculatorString[index + 1])
                calculatorOperators.splice(index, 1)
                index = calculatorOperators.indexOf(items)
              }
            }
          })

          this.templateBox = this.templateBox + '='
          this.total = calculatorString[0]
        }
      },
      // 串連算判上的key
      joinItems(key) {
        let templateBoxLength = this.templateBox.length
        let isOperator = this.keyReg.test(key)
        if (this.templateBox[templateBoxLength - 1] == '=') {
          this.templateBox = String(this.total) + key
          this.total = 0
        } else if (isOperator || key == '00' ) {
          let isLastStringOperator = this.keyReg.test(this.templateBox[templateBoxLength - 1])
          if (templateBoxLength && !isLastStringOperator) {
            this.templateBox = this.templateBox + key
          }
        } else  {
          this.templateBox = this.templateBox + key
        }
      },
      // 點擊backSpace
      backSpace() {
        let templateBoxLength = this.templateBox.length
        if (templateBoxLength) {
          this.templateBox = this.templateBox[templateBoxLength - 1] == '='
            ? this.templateBox.slice(0, -2)
            : this.templateBox.slice(0, -1)
        }
      },
      // 清除資料
      clearData() {
        this.templateBox = ''
        this.total = 0
      }
    }
  })