import { NodeCanvasRenderingContext2D } from "canvas";
import { Coordinates, Dimensions } from "../../../image/ImageBuilder";
import BeverageContainer from "./BeverageContainer";
import BeverageSize from "./size/BeverageSize";

const BG_IMG =
  "https://cdn.discordapp.com/attachments/765047137473265714/985127274183553094/mug.png?ex=66ef4784&is=66edf604&hm=0602dc6b5833184a06bb3f25a7f3ccc2813defce61064ba35475606043408b58&";

export default class Mug extends BeverageContainer {
  constructor(context: NodeCanvasRenderingContext2D, size: BeverageSize) {
    super(context, BG_IMG, size);
  }

  public get origin(): Coordinates {
    const { width: canvasWidth, height: canvasHeight } = this.context.canvas;
    const { scale } = this.size;
    const width = canvasWidth * scale;
    const height = canvasHeight * scale;

    const floor = canvasHeight * 0.95;

    return {
      x: (canvasWidth - width) * 0.5,
      y: floor - height,
    };
  }

  public get trimmedDimensions(): Dimensions {
    const { width, height } = this.dimensions;
    return {
      width: width * 0.66,
      height: height * 0.77,
    };
  }

  public get margin(): Coordinates {
    const { width: containerWidth, height: containerHeight } = this.dimensions;
    return { x: containerWidth * 0.02, y: containerHeight * 0.13 };
  }
}
