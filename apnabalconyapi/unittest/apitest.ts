import { expect } from 'chai';
//var request = require('request');
import {request} from 'request';

it('Main page content', function(done){
  request('http://localhost:3000',function(error,response,body){
  expect(body).to.equal("Welcome to Doorstep application.");
  done();
  });
  
});