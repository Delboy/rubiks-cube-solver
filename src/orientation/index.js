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

      state.xAxis += newX;
      state.yAxis += newY;
      state.zAxis += newZ;
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
  },
  segmentState: {
    // blue
    btl: null,
    btm: null,
    btr: null,
    bcl: null,
    bcr: null,
    bbl: null,
    bbm: null,
    bbr: null,
    // orange
    otl: null,
    otm: null,
    otr: null,
    ocl: null,
    ocr: null,
    obl: null,
    obm: null,
    obr: null,
    // green
    gtl: null,
    gtm: null,
    gtr: null,
    gcl: null,
    gcr: null,
    gbl: null,
    gbm: null,
    gbr: null,
    // red
    rtl: null,
    rtm: null,
    rtr: null,
    rcl: null,
    rcr: null,
    rbl: null,
    rbm: null,
    rbr: null,
    // white
    wtl: null,
    wtm: null,
    wtr: null,
    wcl: null,
    wcr: null,
    wbl: null,
    wbm: null,
    wbr: null,
    // yellow
    ytl: null,
    ytm: null,
    ytr: null,
    ycl: null,
    ycr: null,
    ybl: null,
    ybm: null,
    ybr: null,
  },
};

const facesSlice = createSlice({
  name: "faces",
  initialState: initialFaceState,
  reducers: {
    updateCurrentFace(state, action) {
      state.currentFace = action.payload;
    },
    setColorSelected(state, action) {
      state.colorSelected = action.payload;
    },
    addToColorCounter(state, action) {
      state.colorCount[action.payload] += 1;
    },
    removeFromColorCounter(state, action) {
      state.colorCount[action.payload] -= 1;
    },
    setSegmentColor(state, action) {
      state.segmentState[action.payload.position] = action.payload.color;
    },
    clearAllSegmentColors(state){
      state.segmentState = initialFaceState.segmentState
      state.colorCount = initialFaceState.colorCount
    },
    shuffleAllSegmentColors(state){
      let colors = ['blue', 'orange', 'green', 'red', 'yellow', 'white']
      
      Object.keys(state.segmentState).forEach(key => {
        let x = 1
        let randomColor = Math.floor(Math.random() * colors.length)
        while(x < 7){
          if(state.colorCount[colors[randomColor]] < 8){
            state.segmentState[key] = colors[randomColor]
            state.colorCount[colors[randomColor]] += 1
            x += 6
          } else {
            if(randomColor === 5){
              randomColor = 0
              x += 1
            } else {
              randomColor += 1
              x += 1
            }
          }
        }
      })
      
    }
  },
});

const orientation = configureStore({
  reducer: { axises: axisesSlice.reducer, faces: facesSlice.reducer },
});

export const axisActions = axisesSlice.actions;
export const facesActions = facesSlice.actions;

export default orientation;
