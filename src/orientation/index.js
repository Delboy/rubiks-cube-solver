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
  lastCurrentFace: null,
  backFace: "green",
  leftFace: "orange",
  rightFace: "red",
  topFace: "yellow",
  bottomFace: "white",
  leftOfCurrentFace: "edge",
  rightOfCurrentFace: "edge",
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
    [
      "yellow",
      "yellow",
      "yellow",
      "yellow",
      "yellow",
      "yellow",
      "yellow",
      "yellow",
    ],
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
    setLastCurrentFace(state, action) {
      state.lastCurrentFace = action.payload;
    },
    setBackFace(state, action) {
      state.backFace = action.payload;
    },
    setLeftFace(state, action) {
      state.leftFace = action.payload;
    },
    setRightFace(state, action) {
      state.rightFace = action.payload;
    },
    setTopFace(state, action) {
      state.topFace = action.payload;
    },
    setBottomFace(state, action) {
      state.bottomFace = action.payload;
    },
    setLeftOfCurrentFace(state, action) {
      state.leftOfCurrentFace = action.payload;
    },
    setRightOfCurrentFace(state, action) {
      state.rightOfCurrentFace = action.payload;
    },
    moveCubeMatrixLeft(state) {
      state.cubeMatrix.forEach((face) => {
        face.push(face.shift());
      });
    },
    moveCubeMatrixRight(state) {
      state.cubeMatrix.forEach((face) => {
        const lastElement = face[7];
        face.pop();
        face.unshift(lastElement);
      });
    },
    moveCubeMatrixUp(state) {
      state.cubeMatrix.push(state.cubeMatrix.shift());
    },
    moveCubeMatrixDown(state) {
      const lastFace = state.cubeMatrix[7];
      state.cubeMatrix.pop();
      state.cubeMatrix.unshift(lastFace);
    },
    resetCubeMatrix(state) {
      state.cubeMatrix = initialFaceState.cubeMatrix;
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
    clearAllSegmentColors(state) {
      state.segmentState = initialFaceState.segmentState;
      state.colorCount = initialFaceState.colorCount;
    },
    shuffleAllSegmentColors(state) {
      let colors = ["blue", "orange", "green", "red", "yellow", "white"];

      Object.keys(state.segmentState).forEach((key) => {
        let x = 1;
        let randomColor = Math.floor(Math.random() * colors.length);
        while (x < 7) {
          if (state.colorCount[colors[randomColor]] < 8) {
            state.segmentState[key] = colors[randomColor];
            state.colorCount[colors[randomColor]] += 1;
            x += 6;
          } else {
            if (randomColor === 5) {
              randomColor = 0;
              x += 1;
            } else {
              randomColor += 1;
              x += 1;
            }
          }
        }
      });
    },
    rotatePrime(state, action) {

      let wedges = {
        blueWedge: [
          // Top of blue wedge
          [
            'ybl',
            'ybm',
            'ybr',
          ],
          // Left of blue wedge
          [
            'obr',
            'ocr',
            'otr',
          ],
          // Bottom of blue wedge
          [
            'wtr',
            'wtm',
            'wtl',
          ],
          // Right of blue wedge
          [
            'rtl',
            'rcl',
            'rbl',
          ],
        ],
        orangeWedge: [
          // Top of orange wedge
          [
            'ytl',
            'ycl',
            'ybl',
          ],
          // Left of orange wedge
          [
            'gbr',
            'gcr',
            'gtr',
          ],
          // Bottom of orange wedge
          [
            'wtl',
            'wcl',
            'wbl',
          ],
          // Right of orange wedge
          [
            'btl',
            'bcl',
            'bbl',
          ],
        ],
        greenWedge: [
          // Top of green wedge
          [
            'ytr',
            'ytm',
            'ytl',
          ],
          // Left of green wedge
          [
            'rbr',
            'rcr',
            'rtr',
          ],
          // Bottom of green wedge
          [
            'wbl',
            'wbm',
            'wbr',
          ],
          // Right of green wedge
          [
            'otl',
            'ocl',
            'obl',
          ],
        ],
        redWedge: [
          // Top of red wedge
          [
            'ybr',
            'ycr',
            'ytr',
          ],
          // Left of red wedge
          [
            'bbr',
            'bcr',
            'btr',
          ],
          // Bottom of red wedge
          [
            'wbr',
            'wcr',
            'wtr',
          ],
          // Right of red wedge
          [
            'gtl',
            'gcl',
            'gbl',
          ],
        ],
        yellowWedge: [
          // Top of yellow wedge
          [
            'gtr',
            'gtm',
            'gtl',
          ],
          // Left of yellow wedge
          [
            'otr',
            'otm',
            'otl',
          ],
          // Bottom of yellow wedge
          [
            'btr',
            'btm',
            'btl',
          ],
          // Right of yellow wedge
          [
            'rtr',
            'rtm',
            'rtl',
          ],
        ],
        whiteWedge: [
          // Top of white wedge
          [
            'bbl',
            'bbm',
            'bbr',
          ],
          // Left of white wedge
          [
            'obl',
            'obm',
            'obr',
          ],
          // Bottom of white wedge
          [
            'gbl',
            'gbm',
            'gbr',
          ],
          // Right of white wedge
          [
            'rbl',
            'rbm',
            'rbr',
          ],
        ],
      };

      let wedgeName = action.payload + 'Wedge'

      const topWedge1 = wedges[`${wedgeName}`][0][0]
      const topWedge2 = wedges[`${wedgeName}`][0][1]
      const topWedge3 = wedges[`${wedgeName}`][0][2]
      const leftWedge1 = wedges[`${wedgeName}`][1][0]
      const leftWedge2 = wedges[`${wedgeName}`][1][1]
      const leftWedge3 = wedges[`${wedgeName}`][1][2]
      const bottomWedge1 = wedges[`${wedgeName}`][2][0]
      const bottomWedge2 = wedges[`${wedgeName}`][2][1]
      const bottomWedge3 = wedges[`${wedgeName}`][2][2]
      const rightWedge1 = wedges[`${wedgeName}`][3][0]
      const rightWedge2 = wedges[`${wedgeName}`][3][1]
      const rightWedge3 = wedges[`${wedgeName}`][3][2]

      const oldTopWedge1 = state.segmentState[topWedge1]
      const oldTopWedge2 = state.segmentState[topWedge2]
      const oldTopWedge3 = state.segmentState[topWedge3]
      const oldLeftWedge1 = state.segmentState[leftWedge1]
      const oldLeftWedge2 = state.segmentState[leftWedge2]
      const oldLeftWedge3 = state.segmentState[leftWedge3]
      const oldRightWedge1 = state.segmentState[rightWedge1]
      const oldRightWedge2 = state.segmentState[rightWedge2]
      const oldRightWedge3 = state.segmentState[rightWedge3]
      const oldBottomWedge1 = state.segmentState[bottomWedge1]
      const oldBottomWedge2 = state.segmentState[bottomWedge2]
      const oldBottomWedge3 = state.segmentState[bottomWedge3]

      state.segmentState[topWedge1] = oldRightWedge1;
      state.segmentState[topWedge2] = oldRightWedge2;
      state.segmentState[topWedge3] = oldRightWedge3;
      state.segmentState[leftWedge1] = oldTopWedge1;
      state.segmentState[leftWedge2] = oldTopWedge2;
      state.segmentState[leftWedge3] = oldTopWedge3;
      state.segmentState[bottomWedge1] = oldLeftWedge1;
      state.segmentState[bottomWedge2] = oldLeftWedge2;
      state.segmentState[bottomWedge3] = oldLeftWedge3;
      state.segmentState[rightWedge1] = oldBottomWedge1;
      state.segmentState[rightWedge2] = oldBottomWedge2;
      state.segmentState[rightWedge3] = oldBottomWedge3;

      let faceToRotate = action.payload.charAt(0);

      const oldTopLeft = state.segmentState[`${faceToRotate}tl`];
      const oldTopMiddle = state.segmentState[`${faceToRotate}tm`];
      const oldTopRight = state.segmentState[`${faceToRotate}tr`];
      const oldCenterLeft = state.segmentState[`${faceToRotate}cl`];
      const oldCenterRight = state.segmentState[`${faceToRotate}cr`];
      const oldBottomLeft = state.segmentState[`${faceToRotate}bl`];
      const oldBottomMiddle = state.segmentState[`${faceToRotate}bm`];
      const oldBottomRight = state.segmentState[`${faceToRotate}br`];

      state.segmentState[`${faceToRotate}tl`] = oldTopRight;
      state.segmentState[`${faceToRotate}tm`] = oldCenterRight;
      state.segmentState[`${faceToRotate}tr`] = oldBottomRight;
      state.segmentState[`${faceToRotate}cl`] = oldTopMiddle;
      state.segmentState[`${faceToRotate}cr`] = oldBottomMiddle;
      state.segmentState[`${faceToRotate}bl`] = oldTopLeft;
      state.segmentState[`${faceToRotate}bm`] = oldCenterLeft;
      state.segmentState[`${faceToRotate}br`] = oldBottomLeft;
    },
  },
});

const orientation = configureStore({
  reducer: { axises: axisesSlice.reducer, faces: facesSlice.reducer },
});

export const axisActions = axisesSlice.actions;
export const facesActions = facesSlice.actions;

export default orientation;
