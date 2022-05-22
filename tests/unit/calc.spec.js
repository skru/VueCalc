import { shallowMount, mount } from '@vue/test-utils'
import Calc from '@/components/Calc.vue'



const wrapper = mount(Calc);
const button0 = wrapper.find('.btn-0');
const button1 = wrapper.find('.btn-1');
const button2 = wrapper.find('.btn-2');
const button3 = wrapper.find('.btn-3');
const button4 = wrapper.find('.btn-4');
const button5 = wrapper.find('.btn-5');
const button6 = wrapper.find('.btn-6');
const button7 = wrapper.find('.btn-7');
const button8 = wrapper.find('.btn-8');
const button9 = wrapper.find('.btn-9');
const buttonDecimal = wrapper.find('.btn-dec');

const buttonAdd = wrapper.find('.btn-add');
const buttonSubtract = wrapper.find('.btn-subtract');
const buttonMultiply = wrapper.find('.btn-multiply');
const buttonDivide = wrapper.find('.btn-divide');

const buttonClear = wrapper.find('.btn-cl');
const buttonAllClear = wrapper.find('.btn-ac');
const buttonEquals = wrapper.find('.btn-equals');
const buttonNegative = wrapper.find('.btn-negative')

const buttonSquare = wrapper.find('.btn-square')
const buttonPI = wrapper.find('.btn-pi')


const output = wrapper.find('.output-text')
const history = wrapper.find('.history')


describe('Calc.vue', () => {

  beforeEach(() => {
    console.log("clear")
    wrapper.vm.clearAll()
  })

  
  it('continous addition', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("+")
    v.numerical("8")
    v.addOperand("+")
    v.numerical("8")
    v.addOperand("+")
    v.numerical("8")
    v.addOperand("+")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("32")
    })
  })

  it('continous decimal addition', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("+")
    v.numerical("2.5")
    v.addOperand("+")
    v.numerical("2.5")
    v.addOperand("+")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("7.5")
    })
  })

  it('continous subtraction', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("-")
    v.numerical("8")
    v.addOperand("-")
    v.numerical("8")
    v.addOperand("-")
    v.numerical("8")
    v.addOperand("-")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("-16")
    })
  })

  it('continous decimal subtraction', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("-")
    v.numerical("2.5")
    v.addOperand("-")
    v.numerical("2.5")
    v.addOperand("-")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("-2.5")
    })
  })

  it('continous multiply', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("*")
    v.numerical("8")
    v.addOperand("*")
    v.numerical("8")
    v.addOperand("*")
    v.numerical("8")
    v.addOperand("*")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("4096")
    })
  })

  it('continous decimal multiply', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("*")
    v.numerical("2.5")
    v.addOperand("*")
    v.numerical("2.5")
    v.addOperand("*")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("15.625")
    })
  })

  it('continous division', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("/")
    v.numerical("8")
    v.addOperand("/")
    v.numerical("8")
    v.addOperand("/")
    v.numerical("8")
    v.addOperand("/")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("0.015625")
    })
  })

  it('continous decimal division', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("/")
    v.numerical("2.5")
    v.addOperand("/")
    v.numerical("2.5")
    v.addOperand("/")
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("0.4")
    })
  })

  it('stepped addition', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("+")
    v.numerical("4")
    v.equals()
    v.numerical("8")
    v.addOperand("+")
    v.numerical("4")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("12")
    })
  })

  it('stepped decimal addition', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("+")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("+")
    v.numerical("2.2")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("4.7")
    })
  })

  it('stepped subtraction', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("-")
    v.numerical("4")
    v.equals()
    v.numerical("8")
    v.addOperand("-")
    v.numerical("4")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("4")
    })
  })

  it('stepped division subtraction', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("-")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("-")
    v.numerical("2.2")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("0.3")
    })
  })

  it('stepped multiply', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("*")
    v.numerical("4")
    v.equals()
    v.numerical("8")
    v.addOperand("*")
    v.numerical("4")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("32")
    })
  })

  it('stepped division multiply', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("*")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("*")
    v.numerical("2.2")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("5.5")
    })
  })

  it('stepped division', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("/")
    v.numerical("4")
    v.equals()
    v.numerical("8")
    v.addOperand("/")
    v.numerical("4")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("2")
    })
  })

  it('stepped decimal division', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("/")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("/")
    v.numerical("2.2")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("1.13636364")
    })
  })

  it('continous all', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("+")
    v.numerical("8")
    v.addOperand("-")
    v.numerical("8")
    v.addOperand("*")
    v.numerical("8")
    v.addOperand("/")
    v.numerical("8")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("8")
    })
  })

  it('continous division all', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("+")
    v.numerical("2.2")
    v.addOperand("-")
    v.numerical("2.5")
    v.addOperand("*")
    v.numerical("2.2")
    v.addOperand("/")
    v.numerical("2.5")
    v.equals()
    v.$nextTick().then(() => {
      //expect(output.text()).toMatch("2.5") diff result on ios calculator. maybe bodmas?
      expect(output.text()).toMatch("1.936")
    })
  })

  it('stepped all', async () => {
    const v = wrapper.vm
    v.numerical("8")
    v.addOperand("+")
    v.numerical("8")
    v.equals()
    v.numerical("8")
    v.addOperand("-")
    v.numerical("8")
    v.equals()
    v.numerical("8")
    v.addOperand("*")
    v.numerical("8")
    v.equals()
    v.numerical("8")
    v.addOperand("/")
    v.numerical("8")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("1")
    })
  })

  it('stepped decimal all', async () => {
    const v = wrapper.vm
    v.numerical("2.5")
    v.addOperand("+")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("-")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("*")
    v.numerical("2.2")
    v.equals()
    v.numerical("2.5")
    v.addOperand("/")
    v.numerical("2.2")
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("1.13636364")
    })
  })

  it('stepped all PI', async () => {
    const v = wrapper.vm
    v.pi()
    v.addOperand("+")
    v.pi()
    v.equals()
    v.pi()
    v.addOperand("-")
    v.pi()
    v.equals()
    v.pi()
    v.addOperand("*")
    v.pi()
    v.equals()
    v.pi()
    v.addOperand("/")
    v.pi()
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("1")
    })
  })

  it('continous all PI', async () => {
    const v = wrapper.vm
    v.pi()
    v.addOperand("+")
    v.pi()
    v.addOperand("-")
    v.pi()
    v.addOperand("*")
    v.pi()
    v.addOperand("/")
    v.pi()
    v.equals()
    v.$nextTick().then(() => {
      expect(output.text()).toMatch("3.14159265")
    })
  })

})
