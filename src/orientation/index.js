import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialAxisState = {
  xAxis: 0,
  yAxis: 0,
  xAxisOr: 0,
  yAxisOr: 0,
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
    updateXOr(state, action) {
      state.xAxisOr = action.payload;
    },
    updateYOr(state, action) {
      state.yAxisOr = action.payload;
    },
    changeFace(state, action) {
      const currentX = state.xAxisOr;
      const currentY = state.yAxisOr;

      let checkedFace;
      switch (action.payload) {
        case "blue":
          checkedFace = { x: 0, y: 0 };
          break;
        case "orange":
          checkedFace = { x: 0, y: 90 };
          break;
        case "green":
          checkedFace = { x: 0, y: 180 };
          break;
        case "red":
          checkedFace = { x: 0, y: 270 };
          break;
        case "white":
          checkedFace = { x: 90, y: 0 };
          break;
        case "yellow":
          checkedFace = { x: 270, y: 0 };
          break;
        default:
          break;
      }

      let newX = checkedFace.x - currentX;
      let newY = checkedFace.y - currentY;
      
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
      
      state.xAxis += newX;
      state.yAxis += newY;
    },
  },
});

const initialFaceState = {
  currentFace: "blue",
  backFace: 'green',
  leftFace: 'orange',
  rightFace: 'red',
  topFace: 'yellow',
  bottomFace: 'white',
  colorSelected: null,
  colorCount: {
    blue: 0,
    orange: 0,
    green: 0,
    red: 0,
    white: 0,
    yellow: 0,
  },
  cubeMatrix: [
    ["green", "edge", "orange", "edge", "blue", "edge", "red", "edge"],
    ["edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge"],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge"],
    ["blue", "edge", "red", "edge", "green", "edge", "orange", "edge"],
    ["edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge"],
    ["white", "white", "white", "white", "white", "white", "white", "white"],
    ["edge", "edge", "edge", "edge", "edge", "edge", "edge", "edge"],
  ],
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
    setCurrentFace(state, action) {
      state.currentFace = action.payload;
    },
    setBackFace(state, action){
      state.backFace = action.payload
    },
    setLeftFace(state, action){
      state.leftFace = action.payload
    },
    setRightFace(state, action){
      state.rightFace = action.payload
    },
    setTopFace(state, action){
      state.topFace = action.payload
    },
    setBottomFace(state, action){
      state.bottomFace = action.payload
    },
    moveCubeMatrixLeft(state){
      state.cubeMatrix.forEach((face) => {
        face.push(face.shift());
      });
    },
    moveCubeMatrixRight(state){
      state.cubeMatrix.forEach((face) => {
        const lastElement = face[7];
        face.pop();
        face.unshift(lastElement);
      });
    },
    moveCubeMatrixUp(state){
      state.cubeMatrix.push(state.cubeMatrix.shift());
    },
    moveCubeMatrixDown(state){
      const lastFace = state.cubeMatrix[7];
      state.cubeMatrix.pop();
      state.cubeMatrix.unshift(lastFace);
    },
    resetCubeMatrix(state){
      state.cubeMatrix = initialFaceState.cubeMatrix
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
