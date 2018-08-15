import ToDoItem from '@/components/ToDo/ToDoItem'
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
  it('显示正确的内容', () => {
    const wrapper = mount(ToDoItem, {
      sync: false,
      propsData: {
        item: item
      }
    })
    expect(wrapper.find('.item-input').element.value).equal(item.content)
  })
  it('正确处理data变化', () => {
    const wrapper = mount(ToDoItem, {
      sync: false,
      propsData: {
        item: item
      }
    })
    item.content = 'qwer'
    item.top = true
    item.status = true
    wrapper.setData({
      itemTmp: item
    })
    expect(wrapper.vm.itemTmp === item)
  })
  it('正确处理props变化', () => {
    const wrapper = mount(ToDoItem, {
      sync: false,
      propsData: {
        item: item
      }
    })
    const newItem = {
      content: 'qwer',
      doneDate: '',
      initDate: '',
      key: Date.now(),
      status: true,
      top: false
    }
    wrapper.setProps({
      item: newItem
    })
    expect(wrapper.find('.item-input').element.value).to.equal('qwer')
  })
  it('正确处理删除按钮', () => {
    const wrapper = mount(ToDoItem, {
      sync: false,
      propsData: {
        item: item
      }
    })
    wrapper.find('.item-delete').trigger('click')
    expect(wrapper.emitted('delete').length).to.equal(1)
  })
  it('正确处理置顶按钮', () => {
    const wrapper = mount(ToDoItem, {
      sync: false,
      propsData: {
        item: item
      }
    })
    wrapper.find('.item-top').trigger('click')
    expect(wrapper.vm.itemTmp.top).to.equal(!item.top)
    // expect(wrapper.emitted('change').length).to.equal(1)
  })
})
