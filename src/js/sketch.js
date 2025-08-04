import p5 from "p5";

const sketch = (p) => {
  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    canvas.parent("sketch-holder");
    p.background(220);
  };

  p.draw = () => {
    p.fill(0, 102, 204);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
};

new p5(sketch);

