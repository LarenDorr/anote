import ToDoItem from '@/components/ToDoItem'
import { mount } from '@vue/test-utils'

describe('ToDoItem.vue', () => {
  const item = {
    content: 'test',
    doneDate: '',
    initDate: '',
    key: Date.now(),
    status: true,
    top: false
  }
  const wrapper = mount(ToDoItem, {
    sync: false,
    propsData: {
      item: item
    }
  })
  it('显示正确的内容', () => {
    expect(wrapper.find('.item-input').element.value).equal(item.content)
  })
  it('显示正确的状态', () => {
    // expect(wrapper.find('.item-input').element.value).equal(item.content)
    console.log(wrapper.find('.item-check input').element.checked)
  })
})
