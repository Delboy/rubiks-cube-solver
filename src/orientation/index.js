import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialAxisState = { xAxis: 0, yAxis: 0, zAxis: 0, xAxisOr: 0, yAxisOr: 0, zAxisOr: 0 };

const axisesSlice = createSlice({
  name: "axises",
  initialState: initialAxisState,
  reducers: {
    updateX(state, action) {
      state.xAxis += action.payload;
    },
    updateY(state, action) {
      state.yAxis += action.payload;
    },
    updateZ(state, action) {
      state.zAxis += action.payload;
    },
    updateXOr(state, action){
        state.xAxisOr = action.payload
    },
    updateYOr(state, action){
        state.yAxisOr = action.payload
    },
    updateZOr(state, action){
        state.zAxisOr = action.payload
    },
  },
});


const initialFaceState = {
  currentFace: "blue",
  rightSideFace: "red",
  backFace: "green",
  coords: [
    { face: "blue", coord: 0 },
    { face: "red", coord: 0 },
    { face: "green", coord: 0 },
    { face: "orange", coord: 0 },
    { face: "yellow", coord: 0 },
    { face: "white", coord: 0 },
  ],
};

const facesSlice = createSlice({
  name: "faces",
  initialState: initialFaceState,
  reducers: {
    updateCurrentFace(state, action) {
      state.currentFace = action.payload;
      switch (action.payload) {
        case "blue":
          state.backFace = "green";
          break;
        case "orange":
          state.backFace = "red";
          break;
        case "green":
          state.backFace = "blue";
          break;
        case "red":
          state.backFace = "orange";
          break;
        case "white":
          state.backFace = "yellow";
          break;
        case "yellow":
          state.backFace = "white";
          break;
        default:
          break;
      }
    },
    updateCoord(state, action) {
      let newArray = state.coords;

      newArray.forEach((obj) => {
        if (obj.face === action.payload.face) {
          obj.coord = action.payload.coord;
          return;
        } else {
          return obj;
        }
      });

      newArray.sort(function (a, b) {
        return b.coord - a.coord;
      });

      if (newArray[0].coord === newArray[1].coord) {
        if (
          newArray[0].face === state.currentFace ||
          newArray[0].face === state.backFace
        ) {
          state.rightSideFace = newArray[1].face;
        } else {
          state.rightSideFace = newArray[0].face;
        }
      } else {
        state.rightSideFace = newArray[0].face;
      }

      state.coords = newArray;
    },
  },
});

const orientation = configureStore({
  reducer: { axises: axisesSlice.reducer, faces: facesSlice.reducer },
});

export const axisActions = axisesSlice.actions;
export const facesActions = facesSlice.actions;

export default orientation;
