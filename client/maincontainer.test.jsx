import React from 'react';
import chai, {expect} from 'chai';                                                 
chai.use(require('chai-enzyme')());
import {shallow} from 'enzyme';
import Store from '../redux/store.js';
import { Provider } from 'react-redux';


import MainContainer from './maincontainer.jsx'

describe('<MainContainer />', () => {

  let root
  beforeEach('render the root', () =>
    root = shallow(
      <Provider store={Store}>
        <MainContainer />
      </Provider>)
  )

  it('renders container with correct number of <div>s', () => {    
    expect(root.find('div')).to.have.length(3);
  })

  it('shows the title text', () => {    
    expect(root.find('div.title-text')).to.have.length(1);
    expect(root.find('div.title-text').text()).equal("Hello World!!")
  })

  it("shows the counter", () => {
    expect(root.find('div.count')).to.have.length(1);
    expect(root.find('div.count').text()).not.to.be.NaN;
    expect(root.find('div.count').text()).to.equal(0);
  })

  it("the counter increments", () => {
    expect(root.find('div.count').text()).to.equal(0);
    root.find('div.count').simulate('click');
    expect(root.find('div.count').text()).to.equal(1);
  })
  
})