<template>
  <rect stroke="lightgray" fill="none"  :width="width" :height="height" :x="x" :y="y"></rect>
  <rect stroke="gray" :fill="fillColor" :width="width" :height="valueHeight" :x="x" :y="valueY"></rect>
  <text :style="textStyle" :x="textX" :y="textY">{{valueText}}</text>
  <line :x1="x" :y1="lineY" :x2="x + Number(width)" :y2="lineY" stroke="orange" stroke-width="2" stroke-dasharray="5,4"></line>
</template>

<script>
function measureTextSize(text, font) {
  const element = document.createElement('canvas');
  const context = element.getContext('2d');
  context.font = font;
  var textSize = {
    width: context.measureText(text).width,
    height: parseInt(context.font)
  };
  return textSize;
}

const FILL_COLOR_RED = 'FF0000';
const FILL_COLOR_RED_HL = 'FF0000';

const FILL_COLOR_YELLOW = 'FFFF00';
const FILL_COLOR_YELLOW_HL = 'EEEE66';

const FILL_COLOR_GREEN = '00ce00';
const FILL_COLOR_GREEN_HL = '3efc3e';

export default {
  name: 'ValueBar',
  props: {
    value: { type: Number, required: false, default: -1 },
    x: { type: [Number, String], required: false, default: 0 },
    y: { type: [Number, String], required: false, default: 0 },
    width: { type: [Number, String], required: false, default: 40 },
    height: { type: [Number, String], required: false, default: 360 },
    minHeight: { type: [Number, String], required: false, default: 10 },
    fontSize: { type: [Number, String], required: false, default: 18 },
    fontFamily: { type: String, required: false, default: 'Monospace' }
  },
  data: function() {
    return {
      colorGreen: FILL_COLOR_GREEN,
      colorGreenActive: FILL_COLOR_GREEN_HL,
      colorYellow: FILL_COLOR_YELLOW,
      colorRed: FILL_COLOR_RED,
      colorStep: 0,
      colorMaxStep: 20,
      colorDirection: 1,
      colorInterval: null
    };
  },
  created() {
    this.colorInterval = setInterval(this.updateColor, 100);
  },
  beforeUnmount() {
    if (this.colorInterval) {
      clearInterval(this.colorInterval);
    }
  },
  methods: {
    getRgb(hex) {
      if (!hex) {
        return null;
      }
      const digits = hex.startsWith('#') ? hex.substring(1) : hex;
      const colorValue = Number.parseInt(digits, 16);
      const r = colorValue >> 16 & 0xff;
      const g = colorValue >> 8 & 0xff;
      const b = colorValue & 0xff;
      return {
        r: r,
        g: g,
        b: b
      };
    },
    getHex(rgbColor) {
      const hexColor = `${rgbColor.r.toString(16).padStart(2, '0')}${rgbColor.g.toString(16).padStart(2, '0')}${rgbColor.b.toString(16).padStart(2, '0')}`;
      return hexColor;
    },
    getCurrentColor(minColor, maxColor) {
      const startRgb = this.getRgb(minColor);
      const finishRgb = this.getRgb(maxColor);
      const stepPercent = this.colorStep / this.colorMaxStep;
      const currentColorRgb = {
        r: Math.round(startRgb.r + stepPercent * (finishRgb.r - startRgb.r)),
        g: Math.round(startRgb.g + stepPercent * (finishRgb.g - startRgb.g)),
        b: Math.round(startRgb.b + stepPercent * (finishRgb.b - startRgb.b))
      };
      return this.getHex(currentColorRgb);
    },
    updateColor() {
      this.colorDirection === 1 ? this.colorStep++ : this.colorStep--;
      if (this.colorStep === this.colorMaxStep) {
        this.colorStep = this.colorMaxStep - 1;
        this.colorDirection = -1;
      }
      if (this.colorStep === 0) {
        this.colorStep = 0;
        this.colorDirection = 1;
      }

      // this.colorGreen = this.getCurrentColor(FILL_COLOR_GREEN, FILL_COLOR_GREEN_HL);
      this.colorYellow = this.getCurrentColor(FILL_COLOR_YELLOW, FILL_COLOR_YELLOW_HL);
      this.colorRed = this.getCurrentColor(FILL_COLOR_RED, FILL_COLOR_RED_HL);
    }
  },
  computed: {
    lineY() {
      return Number(this.y) + 0.5 * this.height;
    },
    textSize() {
      const text = this.valueText;
      const font = `${this.fontSize}px ${this.fontFamily}`;
      return measureTextSize(text, font);
    },
    textStyle() {
      const style = {
        'font-family': this.fontFamily,
        'font-size': this.fontSize + 'px'
      };
      return style;
    },
    textX() {
      return Number(this.x) + 0.5 * this.width - 0.5 * this.textSize.width;
    },
    textY() {
      if (this.value || this.value === 0) {
        return Number(this.y) + Number(this.height) - this.valueHeight - 0.5 * this.textSize.height;
      }
      return this.y;
    },
    valueY() {
      if (this.value || this.value === 0) {
        return Number(this.y) + Number(this.height) - this.valueHeight;
      }
      return this.y;
    },
    valueHeight() {
      if (this.value) {
        return (this.value > 0) ? this.value * 40 : this.minHeight;
      }
      return this.minHeight;
    },
    valueText() {
      if (this.value || this.value === 0) {
        return (this.value >= 0) ? this.value : 'н/д';
      }
      return 'н/д';
    },
    fillColor() {
      const kp = this.value || 0;
      if (kp < 0) {
          return 'steelblue';
      } else if (kp >= 0 && kp <= 3) {
          return `#${this.colorGreen}`;
      } else if (kp > 3 && kp < 5) {
          return `#${this.colorYellow}`;
      } else if (kp >= 5) {
        return `#${this.colorRed}`;
      }
      return 'white';
    }
  }
};
</script>

<style scoped>
</style>
