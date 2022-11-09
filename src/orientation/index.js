import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialAxisState = {
  xAxis: 0,
  yAxis: 0,
  zAxis: 0,
  xAxisOr: 0,
  yAxisOr: 0,
  zAxisOr: 0,
};

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
    updateXOr(state, action) {
      state.xAxisOr = action.payload;
    },
    updateYOr(state, action) {
      state.yAxisOr = action.payload;
    },
    updateZOr(state, action) {
      state.zAxisOr = action.payload;
    },
    changeFace(state, action) {
        const currentX = state.xAxisOr;
        const currentY = state.yAxisOr;
        const currentZ = state.zAxisOr;
  
        let checkedFace;
        switch (action.payload) {
          case "blue":
            checkedFace = { x: 0, y: 0, z: 0 };
            break;
          case "orange":
            checkedFace = { x: 0, y: 90, z: 0 };
            break;
          case "green":
            checkedFace = { x: 0, y: 180, z: 0 };
            break;
          case "red":
            checkedFace = { x: 0, y: 270, z: 0 };
            break;
          case "white":
            checkedFace = { x: 90, y: 0, z: 0 };
            break;
          case "yellow":
            checkedFace = { x: 270, y: 0, z: 0 };
            break;
          default:
            break;
        }
  
        let newX = checkedFace.x - currentX;
        let newY = checkedFace.y - currentY;
        let newZ = checkedFace.z - currentZ;
  
        if (newX < -180) {
          newX += 360;
        }
        if (newX > 180) {
          newX -= 360;
        }
        if (newY < -180) {
          newY += 360;
        }
        if (newY > 180) {
          newY -= 360;
        }
        if (newZ < -180) {
          newZ += 360;
        }
        if (newZ > 180) {
          newZ -= 360;
        }
       
        state.xAxis += newX
        state.yAxis += newY
        state.zAxis += newZ
      },
  },
});

const initialFaceState = {
  currentFace: "blue",
  colorSelected: null,
  colorCount: {
    blue: 0,
    orange: 0,
    green: 0,
    red: 0,
    white: 0,
    yellow: 0,
  } 
  // blueCount: 0,
  // orangeCount: 0,
  // greenCount: 0,
  // redCount: 0,
  // whiteCount: 0,
  // yellowCount: 0,
};

const facesSlice = createSlice({
  name: "faces",
  initialState: initialFaceState,
  reducers: {
    updateCurrentFace(state, action) {
      state.currentFace = action.payload;
    },
    setColorSelected(state, action){
      state.colorSelected = action.payload
    },
    addToColorCounter(state, action){
        state.colorCount[action.payload] += 1
    },
    removeFromColorCounter(state, action){
        state.colorCount[action.payload] -= 1
    },
  },
});

const orientation = configureStore({
  reducer: { axises: axisesSlice.reducer, faces: facesSlice.reducer },
});

export const axisActions = axisesSlice.actions;
export const facesActions = facesSlice.actions;

export default orientation;
