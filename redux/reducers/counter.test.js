import { incrementCount, INCREMENT_COUNT, count } from './counter.js';
import chai, {expect} from 'chai';                                            


describe('counter reducer', () => {
  it('returns the default case if wrong action is passed', () => {
    let action = { type: 'no action' };
    expect(count(0, action)).to.equal(0);
    expect(count(12, action)).to.equal(12);
  })
  it('returns the count incremented by one with the correct action', () => {
    let action = { type: INCREMENT_COUNT };
    expect(count(0, action)).to.equal(1);
    expect(count(12, action)).to.equal(13);
  })
})

describe('incrementer constant', () => {
  it('constant equals correct string', () => {
    expect(INCREMENT_COUNT).to.equal('INCREMENT_COUNT');
    expect(INCREMENT_COUNT).not.to.equal('INCREMENTCOUNT');
    expect(INCREMENT_COUNT).not.to.equal('increment_count');
  })
})

describe('action creator', () => {
  it('returns the correct object with valid action.type', () => {
    expect(incrementCount()).to.include.keys('type');
    expect(incrementCount().type).to.equal(INCREMENT_COUNT);
  })
})