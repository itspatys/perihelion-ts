var import_opencv_wasm = require("opencv-wasm");
var import_node = require("./src/data/node.interface");
var import_img = require("./src/main/utils/img.util");
const gaussian = async (args) => {
  const mat = await (0, import_img.loadImg)(args.inputFilePath[0]);
  const size = new import_opencv_wasm.cv.Size(args.kernelX, args.kernelY);
  await import_opencv_wasm.cv.GaussianBlur(
    mat,
    mat,
    size,
    args.sigmaX,
    args.sigmaY,
    import_opencv_wasm.cv.BORDER_DEFAULT
  );
  (0, import_img.saveImg)(mat, args.outputFilePath[0]);
};
const node = {
  init: (args) => gaussian(args),
  name: "TEST",
  label: "TEST",
  type: import_node.NodeTypesEnum.FILTER,
  subtype: "TEST",
  description: "TEST",
  parameters: [
    {
      label: "Input",
      type: import_node.NodeParameterTypesEnum.INPUT,
      name: "input",
      description: "input"
    },
    {
      label: "Output",
      type: import_node.NodeParameterTypesEnum.OUTPUT,
      name: "output",
      description: "Output"
    },
    {
      label: "Sigma X",
      name: "sigma-x",
      type: import_node.NodeParameterTypesEnum.NUMBER,
      description: "Sigma X",
      default: 0,
      range: [0, 100],
      step: 1
    },
    {
      label: "Sigma Y",
      name: "sigma-y",
      type: import_node.NodeParameterTypesEnum.NUMBER,
      description: "Sigma Y",
      default: 0,
      range: [0, 100],
      step: 1
    },
    {
      label: "Kernel X",
      name: "kernel-x",
      type: import_node.NodeParameterTypesEnum.NUMBER,
      description: "Kernel X",
      default: 1,
      range: [1, 100],
      step: 1
    },
    {
      label: "Kernel Y",
      name: "kernel-y",
      type: import_node.NodeParameterTypesEnum.NUMBER,
      description: "Kernel Y",
      default: 1,
      range: [1, 100],
      step: 1
    }
  ]
};
module.exports = node;
