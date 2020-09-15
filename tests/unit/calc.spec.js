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

  it('check simple addition', async () => {
    await button1.trigger('click')
    await buttonAdd.trigger('click')
    await button2.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('3')
  })
  it('check clear', async () => {
    await buttonClear.trigger('click')
    expect(output.text()).toMatch('2')
    await buttonClear.trigger('click')
    expect(output.text()).toMatch('0')
  })
  it('check simple subtraction', async () => {
    await button2.trigger('click')
    await buttonSubtract.trigger('click')
    await button1.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('1')
  })
  it('check all clear', async () => {
    await buttonAllClear.trigger('click')
    expect(output.text()).toMatch('0')
  })
  it('check simple decimal multiplication', async () => {
    await buttonAllClear.trigger('click')
    await button2.trigger('click')
    await buttonMultiply.trigger('click')
    await button2.trigger('click')
    await buttonDecimal.trigger('click')
    await button5.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('5')
  })
  it('check simple decimal division', async () => {
    await buttonAllClear.trigger('click')
    await button1.trigger('click')
    await buttonDivide.trigger('click')
    await button3.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('0.33')
  })
  it('check stacked equation', async () => {
    await buttonAllClear.trigger('click')
    await button1.trigger('click')
    await buttonAdd.trigger('click')
    await button2.trigger('click')
    await buttonMultiply.trigger('click')
    await button0.trigger('click')
    await buttonDecimal.trigger('click')
    await button5.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('1.5')
  })
  it('check squaring', async () => {
    await buttonAllClear.trigger('click')
    await button5.trigger('click')
    await buttonSquare.trigger('click')
    expect(output.text()).toMatch('2.24')
  })
  it('check divide by pi', async () => {
    await buttonAllClear.trigger('click')
    await button1.trigger('click')
    await button0.trigger('click')
    await buttonDivide.trigger('click')
    await buttonPI.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('3.18')
  })
  it('check multiply by pi', async () => {
    await buttonAllClear.trigger('click')
    await buttonPI.trigger('click')
    await buttonMultiply.trigger('click')
    await button2.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('6.28')
  })
  it('check input formatting', async () => {
    await buttonAllClear.trigger('click')
    await button0.trigger('click')
    await button1.trigger('click')
    await button2.trigger('click')
    await button3.trigger('click')
    await button4.trigger('click')
    await button5.trigger('click')
    await button6.trigger('click')
    await button7.trigger('click')
    await button8.trigger('click')
    await button9.trigger('click')
    await button1.trigger('click')
    expect(output.text()).toMatch('E')
    await button1.trigger('click')
    await button2.trigger('click')
    await button3.trigger('click')
    await button4.trigger('click')
    await button5.trigger('click')
    await button6.trigger('click')
    await button7.trigger('click')
    await button8.trigger('click')
    await button9.trigger('click')
    await buttonDecimal.trigger('click')
    await button0.trigger('click')
    await button1.trigger('click')
    await button2.trigger('click')
    expect(output.text()).toMatch('123456789.01')
  })
  it('check output formatting', async () => {
    await buttonAllClear.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await button9.trigger('click')
    await buttonAdd.trigger('click')
    await button1.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('E')
  })
  it('check negative/positive', async () => {
    await buttonAllClear.trigger('click')
    await button2.trigger('click')
    await buttonNegative.trigger('click')
    expect(output.text()).toMatch('-2')
    await buttonMultiply.trigger('click')
    await button2.trigger('click')
    await buttonEquals.trigger('click')
    expect(output.text()).toMatch('-4')
  })
  it('check simple addition on stacked equation', async () => {
    await buttonAllClear.trigger('click')
    await button1.trigger('click')
    await buttonAdd.trigger('click')
    await button2.trigger('click')
    await buttonEquals.trigger('click')
    await buttonNegative.trigger('click')
    expect(output.text()).toMatch('-3')
  })


})
