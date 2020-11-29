import { Action, action, thunk, Thunk } from 'easy-peasy';

export interface StepOneInterface {

}

export interface AbcModel {
  //  stepone: StepOneInterface ;
  // setStepOne: Action<AbcModel>;

  setData: Action<AbcModel, any>;
  data: any
  addCourse: boolean;
  setaddCourse: Action<AbcModel>;
  fetchData: Thunk<AbcModel>;

}

const abcs: AbcModel = {
  addCourse: false,
  data: "",

  setaddCourse: action((state) => {
    state.addCourse = !state.addCourse;
  }),

  setData: action((state, payload) => {
    state.data = payload;
  }),

  fetchData: thunk(async (actions, payload) => {
    let res = await fetch(`https://my-json-server.typicode.com/typicode/demo/posts`);
    console.log(res)
    if (res.status === 200 || res.status === 201) {
      let data = await res.json();
      console.log(data)
      actions.setData(data);
    }
  }),
}

export default abcs;