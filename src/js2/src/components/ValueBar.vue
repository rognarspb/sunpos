<template>
  <rect
    stroke="lightgray"
    fill="none"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
  />
  <rect
    class="bar-animation"
    :stroke="strokeColor"
    stroke-width="2"
    :fill="fillColor"
    :width="width"
    :height="valueHeight"
    :x="x"
    :y="valueY"
    rx="4"
    ry="4"
  />
  <text :style="textStyle" :x="textX" :y="textY">
    {{ valueText }}
  </text>
  <line
    :x1="x"
    :y1="lineY"
    :x2="x + Number(width)"
    :y2="lineY"
    stroke="orange"
    stroke-width="2"
    stroke-dasharray="5,4"
  />
  <template v-if="value >= 5">
    <svg :x="x" :y="textY - 70" viewBox="20 -100 1500 1500">
      <g :fill="sunColor">
        <path d="m30.533-5.5316-15.877-0.1915 8.0288-25.16 3.9241 12.676z" />
        <path d="m29.884 50.661-7.9385 0.0958-7.9385 0.0957 8.0288 25.16 3.9241-12.676z" />
        <path d="m52.166 30.067 0.1916-15.877 25.16 8.0288-12.676 3.9241z" />
        <path d="m-6.2317 14.179-0.1915 15.877-25.16-8.0288 12.676-3.9241z" />
        <path d="m48.832 8.0433-11.091-11.362 23.468-12.113-6.1882 11.738z" />
        <path d="m-6.2417 34.012 11.091 11.362-23.468 12.113 6.1882-11.738z" />
        <path d="m38.844 45.092 11.362-11.091 12.113 23.468-11.738-6.1882z" />
        <path d="m6.3805-3.0368-11.362 11.091-12.113-23.468 11.738 6.1882z" />
        <ellipse
          cx="22.967"
          cy="22.564"
          rx="22.967"
          ry="22.564"
          fill-rule="evenodd"
        />
      </g>
    </svg>
  </template>
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

const FILL_COLOR_RED = 'D14009';
const FILL_COLOR_RED_HL = 'FF6060';

const FILL_COLOR_ORANGE = 'FC9601';
const FILL_COLOR_ORANGE_HL = 'FC9601';

const FILL_COLOR_YELLOW = 'FFCC33';
const FILL_COLOR_YELLOW_HL = 'FFCC33';

const FILL_COLOR_GREEN = 'FFE484';
const FILL_COLOR_GREEN_HL = 'FFE484';

const FILL_COLOR_MIN = '00ce00';
const FILL_COLOR_MIN_HL = '00ce00';

export default {
  name: 'ValueBar',
  props: {
    value: { type: Number, required: false, default: -1 },
    x: { type: [Number, String], required: false, default: 0 },
    y: { type: [Number, String], required: false, default: 0 },
    width: { type: [Number, String], required: false, default: 40 },
    height: { type: [Number, String], required: false, default: 360 },
    minHeight: { type: [Number, String], required: false, default: 10 },
    fontSize: { type: [Number, String], required: false, default: 14 },
    fontFamily: { type: String, required: false, default: 'Roboto Mono' }
  },
  data: function() {
    return {
      colorMin: FILL_COLOR_MIN,
      colorMinActive: FILL_COLOR_MIN_HL,
      colorGreen: FILL_COLOR_GREEN,
      colorGreenActive: FILL_COLOR_GREEN_HL,
      colorYellow: FILL_COLOR_YELLOW,
      colorYellowActive: FILL_COLOR_YELLOW_HL,
      colorOrange: FILL_COLOR_ORANGE,
      colorOrangeActive: FILL_COLOR_ORANGE_HL,
      colorRed: FILL_COLOR_RED,
      colorRedActive: FILL_COLOR_RED_HL,
      colorStep: 0,
      colorMaxStep: 20,
      colorDirection: 1,
      colorInterval: null
    };
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
        return (this.value >= 0)
          ? this.value
          : 'н/д';
      }
      return 'н/д';
    },
    fillColor() {
      const kp = this.value || 0;
      if (kp < 0) {
          return 'steelblue';
      } else if (kp >= 0.0 && kp < 2.0) {
          return `#${this.colorMin}`;
      } else if (kp >= 2.0 && kp <= 3.0) {
          return `#${this.colorGreen}`;
      } else if (kp > 3.0 && kp < 5.0) {
          return `#${this.colorYellow}`;
      } else if (kp >= 5.0 && kp < 7.0) {
        return `#${this.colorOrange}`;
      } else if (kp >= 7.0) {
        return `#${this.colorRed}`;
      }
      return 'white';
    },
    strokeColor() {
      const kp = this.value || 0;
      if (kp < 0) {
          return 'steelblue';
      } else if (kp >= 0 && kp < 2.0) {
          return `#${this.colorMinActive}`;
      } else if (kp >= 2.0 && kp <= 3.0) {
          return `#${this.colorGreenActive}`;
      } else if (kp > 3.0 && kp < 5.0) {
          return `#${this.colorYellowActive}`;
      } else if (kp >= 5.0 && kp < 7.0) {
        return `#${this.colorOrangeActive}`;
      } else if (kp >= 7.0) {
        return `#${this.colorRedActive}`;
      }
      return 'white';
    },
    sunColor() {
      const kp = this.value || 0;
      if (kp < 0) {
          return 'yellow';
      } else if (kp >= 0 && kp <= 3) {
          return 'yellow';
      } else if (kp > 3 && kp < 5) {
          return '#ffcc66';
      } else if (kp >= 5) {
        return '#ff6600';
      }
      return 'white';
    }
  },
  created() {
    // this.colorInterval = setInterval(this.updateColor, 50);
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
  }
};
</script>

<style scoped>
  .border-animation {
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-name: appear-border;
  }

  .bar-animation {
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-name: appear-bar;
    transform-origin: 0 400px;
  }

  @keyframes appear-bar {
    0% { transform: scale(1, 0); }
    /* 50% { transform: scale(1, 0.5); } */
    100% { transform: scale(1, 1); }
  }

  @keyframes appear-border {
    0% { stroke-dasharray: 0 10; }
    50% { stroke-dasharray: 10 10; }
    100% { stroke-dasharray: 10 10; }
  }
</style>
