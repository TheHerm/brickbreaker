import React from 'react';
import chai, {expect} from 'chai';                                                 
chai.use(require('chai-enzyme')());
import {shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import { spyOnComponentMethod } from 'sinon-spy-react';
import Store from '../redux/store.js';

import { MainContainer } from './maincontainer.jsx'

describe('<MainContainer />', () => {
  let root;
  let count = {count:0};
  beforeEach('render the root', () => {
    root = shallow(<MainContainer {...count} />);
  })

  it('renders container with correct number of <div>s', () => {    
    expect(root.find('div')).to.have.length(3);
  })

  it('shows the title text', () => {    
    expect(root.find('div.title-text')).to.have.length(1);
    expect(root.find('div.title-text').text()).equal("Hello World!!")
  })

  it("shows the counter", () => {
    expect(root.find('div.count')).to.have.length(1);
    expect(+root.find('div.count').text()).to.equal(0);
  })

  it("the counter increments", () => {
    expect(Store.getState().count).to.equal(0);
    root.find('div.count').simulate('click');
    expect(Store.getState().count).to.equal(1);
  })
})