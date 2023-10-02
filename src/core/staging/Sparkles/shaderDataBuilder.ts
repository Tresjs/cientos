import {
  ClampToEdgeWrapping,
  DataTexture,
  RGBAFormat,
  ShaderMaterial,
  UVMapping,
  Uniform,
  UnsignedByteType,
} from "three";
import { clamp, mapLinear } from "three/src/math/MathUtils";
import get2DCanvas from "./get2DCanvas";
import {
  Ref,
  ShallowRef,
  MaybeRef,
  isRef,
  shallowRef,
  watch,
  triggerRef,
} from "vue";
import { watchThrottled } from "@vueuse/core";
import { normalizeColorGradient, normalizeScalarGradient, normalizeFlexibleVector3Gradient } from "./Gradient";
import { GradientTresColor, GradientScalar, GradientVectorFlexibleParams } from "./Gradient";

const rgbaSuffixes = ["r", "rg", "rgb", "rgba"] as const;
const xyzwSuffixes = ["x", "xy", "xyz", "xyzw"] as const;
type ShaderSuffix =
  | (typeof rgbaSuffixes)[number]
  | (typeof xyzwSuffixes)[number];

type CanvasGradientRenderer<T> = (
  g: CanvasGradient,
  entry: ShaderDataEntry<T>
) => void;

class ShaderDataEntry<T> {
  data: T;
  ref: Ref<T> | null;
  name: string;
  valueMin: number;
  valueMax: number;
  suffix: string;
  renderToCanvasGradient: CanvasGradientRenderer<T>;

  constructor(
    data: MaybeRef<T>,
    name: string,
    valueMin: number,
    valueMax: number,
    suffix: string,
    renderToCanvasGradient: (
      gradient: CanvasGradient,
      data: ShaderDataEntry<T>
    ) => void
  ) {
    this.data = isRef(data) ? data.value : data;
    this.ref = isRef(data) ? data : null;
    this.name = name;
    this.valueMin = valueMin;
    this.valueMax = valueMax;
    this.suffix = suffix;
    this.renderToCanvasGradient = renderToCanvasGradient;
  }
}

export class ShaderDataEntryTresColorGradient extends ShaderDataEntry<GradientTresColor> {
  constructor(
    data: MaybeRef<GradientTresColor>,
    name = "color",
    valueMin = 0,
    valueMax = 1,
    suffix = "rgba",
    renderToCanvasGradient = (
      g: CanvasGradient,
      entry: ShaderDataEntryTresColorGradient
    ) =>
      normalizeColorGradient(entry.data).forEach(([offset, color]) =>
        g.addColorStop(
          offset,
          `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`
        )
      )
  ) {
    super(data, name, valueMin, valueMax, suffix, renderToCanvasGradient);
  }
}

export class ShaderDataEntryScalarGradient extends ShaderDataEntry<GradientScalar> {
  constructor(
    data: MaybeRef<GradientScalar>,
    name = "scalar",
    valueMin = 0,
    valueMax = 1,
    suffix = "x",
    renderToCanvasGradient = (
      g: CanvasGradient,
      entry: ShaderDataEntryScalarGradient
    ) =>
      normalizeScalarGradient(entry.data).forEach(([offset, scalar]) => {
        g.addColorStop(
          offset,
          `rgb(${clampedMapLinear(
            scalar,
            entry.valueMin,
            entry.valueMax,
            0,
            255
          )}, 0, 0)`
        );
      })
  ) {
    super(data, name, valueMin, valueMax, suffix, renderToCanvasGradient);
  }
}

export class ShaderDataEntryXyzGradient extends ShaderDataEntry<GradientVectorFlexibleParams> {
  constructor(
    data: MaybeRef<GradientVectorFlexibleParams>,
    name = "scalar3",
    valueMin = 0,
    valueMax = 1,
    suffix = "xyz",
    renderToCanvasGradient = (
      g: CanvasGradient,
      entry: ShaderDataEntryXyzGradient
    ) => {
      normalizeFlexibleVector3Gradient(entry.data).forEach(([offset, xyz]) =>
        g.addColorStop(
          offset,
          `rgb(${xyz.map((v) =>
            clampedMapLinear(v, entry.valueMin, entry.valueMax, 0, 255)
          )})`
        )
      );
    }
  ) {
    super(data, name, valueMin, valueMax, suffix, renderToCanvasGradient);
  }
}

class ShaderDataEntryBuilder<T> {
  private entry: ShaderDataEntry<T>;
  private parent: ShaderDataBuilder;

  constructor(entry: ShaderDataEntry<T>, parent: ShaderDataBuilder) {
    this.entry = entry;
    this.parent = parent;
  }

  id(s: string) {
    this.entry.name = s;
    return this;
  }

  range(min: number, max: number) {
    this.entry.valueMin = min;
    this.entry.valueMax = max;
    return this;
  }

  suffix(s: ShaderSuffix) {
    this.entry.suffix = s;
    return this;
  }

  canvasGradientRenderer(fn: CanvasGradientRenderer<T>) {
    this.entry.renderToCanvasGradient = fn;
    return this;
  }

  /**
   * Add another entry to the ShaderDataBuilder
   */
  get add() {
    return this.parent.add;
  }

  /**
   * Finalize the ShaderDataBuilder
   * @returns ShaderData
   */
  build() {
    return this.parent.build();
  }
}

class ShaderDataBuilderAdd {
  private onAdd: (entry: ShaderDataEntry<any>) => ShaderDataEntryBuilder<any>;

  constructor(
    onAdd: (entry: ShaderDataEntry<any>) => ShaderDataEntryBuilder<any>
  ) {
    this.onAdd = onAdd;
  }

  GradientTresColor(data: MaybeRef<GradientTresColor>) {
    return this.onAdd(new ShaderDataEntryTresColorGradient(data));
  }

  Gradient01(data: MaybeRef<GradientScalar>) {
    return this.onAdd(new ShaderDataEntryScalarGradient(data, "zeroOne", 0, 1));
  }

  GradientScalar(data: MaybeRef<GradientScalar>, min: number, max: number) {
    return this.onAdd(
      new ShaderDataEntryScalarGradient(data, "scalar", min, max)
    );
  }

  GradientXyz(
    data: MaybeRef<GradientVectorFlexibleParams>,
    min: number,
    max: number
  ) {
    return this.onAdd(
      new ShaderDataEntryXyzGradient(data, "position", min, max)
    );
  }
}

export class ShaderDataBuilder {
  private entries: ShaderDataEntry<any>[];
  private resolution: number;

  constructor(resolution = 256) {
    this.resolution = resolution;
    this.entries = [];
  }

  withResolution(resolution: number) {
    this.resolution = resolution;
    return this;
  }

  get add() {
    return new ShaderDataBuilderAdd((entry: ShaderDataEntry<any>) =>
      this.onAdd<any>(entry)
    );
  }

  build() {
    return new ShaderData(this.entries, this.resolution);
  }

  private onAdd<T>(entry: ShaderDataEntry<T>) {
    this.entries.push(entry);
    const entryBuilder = new ShaderDataEntryBuilder<T>(entry, this);
    return entryBuilder;
  }
}

export class ShaderData {
  private entries: ShaderDataEntry<any>[];
  private resolution: number;

  constructor(entries: ShaderDataEntry<any>[], resolution: number) {
    this.entries = entries;
    this.resolution = resolution;
  }

  useTexture(uniformName = "uInfo") {
    return new Texture(this.entries, this.resolution).use();
  }
}

class Texture {
  private entries: ShaderDataEntry<any>[];
  private size: number;
  private dirty = shallowRef(0);
  private textureRef?: ShallowRef<DataTexture>;

  constructor(entries: ShaderDataEntry<any>[], resolution: number) {
    this.entries = entries;
    this.size = Math.max(resolution, entries.length);
  }

  use(uniformName = "uInfo") {
    const texture = this.build();
    const textureRef = shallowRef(texture);

    this.textureRef = textureRef;

    for (const entry of this.entries) {
      if (entry.ref) {
        watch(entry.ref, () => {
          entry.data = entry.ref?.value;
          triggerRef(this.dirty);
        });
      }
    }

    watchThrottled(
      this.dirty,
      () => {
        this.build(uniformName, texture);
        textureRef.value = texture;
      },
      { throttle: 1000 / 60 }
    );

    return {
      texture: textureRef,
      dispose: () => texture.dispose(),
      shaderProps: new ShaderGetterBuilder(uniformName, {
        entries: this.entries,
        textureHeight: this.size,
      }),
      materialWatcher: (mat: ShaderMaterial) => {
        if (textureRef) {
          watch(textureRef, () => {
            mat.uniforms[uniformName].value = texture;
          });
        }
      },
      uniformKey: uniformName,
      uniformDeclaration: new Uniform(this.textureRef.value),
      addUniform: (uniforms: Record<string, Uniform<any>>) => {
        if (uniformName in uniforms) {
          throw new Error("Uniforms already contains key: " + uniformName);
        }
        uniforms[uniformName] = new Uniform(textureRef.value);
        return uniforms;
      },
    };
  }

  private build(uniformName = "uInfo", recycledTexture?: DataTexture) {
    const { context, getBitmapData } = get2DCanvas(this.size, this.size);
    if (!context) throw new Error("Cannot create rendering context.");
    this.entries.forEach((entry: ShaderDataEntry<any>, i) => {
      const gradient = context.createLinearGradient(0, i, this.size, i);
      entry.renderToCanvasGradient(gradient, entry);
      context.fillStyle = gradient;
      context.fillRect(0, i, this.size, 1);
    });

    if (recycledTexture) {
      recycledTexture.source.data = getBitmapData();
    }

    const texture =
      recycledTexture ??
      new DataTexture(
        getBitmapData().data,
        this.size,
        this.size,
        RGBAFormat,
        UnsignedByteType,
        UVMapping,
        ClampToEdgeWrapping,
        ClampToEdgeWrapping
      );

    texture.needsUpdate = true;
    texture.userData = this.getImageData(uniformName);

    return texture;
  }
  private getImageData(uniformName: string) {
    const pad = (val: string | number) => `${val}`.padEnd(25);
    return {
      names: this.entries.map((e) => e.name),
      summary: `DataTexture info for ${uniformName}\n${[
        ["ROW #", "NAME", "# CHANNELS"],
      ]
        .concat(
          this.entries.map((entry, i) =>
            [i, entry.name, entry.suffix.length].map(pad)
          )
        )
        .map((row) => row.map(pad).join("| "))
        .join("\n")}`,
    };
  }
}

function clampedMapLinear(
  v: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number
) {
  return mapLinear(clamp(v, minIn, maxIn), minIn, maxIn, minOut, maxOut);
}

interface ShaderGetterBuilderConfig {
  entries: ShaderDataEntry<any>[];
  textureHeight: number;
}

class ShaderGetterBuilder {
  config: ShaderGetterBuilderConfig;
  uniformName: string;
  uniformDeclaration: string;
  useValue = "unspecified";
  atValue = "0.";

  getters: Record<string, string> = {};
  gettersRaw: Record<string, string> = {};

  data: Record<string, ShaderDataEntry<any>> = {};
  rowNumbers: Record<string, number> = {};

  constructor(uniformName: string, config: ShaderGetterBuilderConfig) {
    this.uniformName = uniformName;
    this.config = config;
    this.uniformDeclaration = `uniform sampler2D ${uniformName}`;

    this.config.entries.forEach((entry, rowNum: number) => {
      this.data[entry.name] = entry;
      this.rowNumbers[entry.name] = rowNum;
    });
  }

  use(fieldName: string) {
    this.useValue = fieldName;
    return this;
  }

  at(valueOrVariableName: number | string) {
    this.atValue = `${valueOrVariableName}`;
    return this;
  }

  get() {
    return this.getOrError();
  }

  getRaw() {
    return this.getRawOrError();
  }

  private padNum = (n: number) => (Number.isInteger(n) ? `${n}.` : n);

  getOffsetScaleFromMapping(
    inLo: number,
    inHi: number,
    outLo: number,
    outHi: number
  ) {
    const scale = (outHi - outLo) / (inHi - inLo);
    const offset = outLo - inLo * scale;
    return { scale, offset };
  }

  private getOrError() {
    if (!(this.useValue in this.data)) {
      this.throwRowNameNotFound(this.useValue);
    }
    const { valueMin, valueMax } = this.data[this.useValue];
    const p = this.padNum;
    const { offset, scale } = this.getOffsetScaleFromMapping(
      0,
      1,
      valueMin,
      valueMax
    );
    const offsetSign = offset >= 0 ? "+" : "-";
    const offsetStr =
      offset === 0 ? "" : ` ${offsetSign} ${p(Math.abs(offset))}`;
    const scaleStr = scale === 1 ? "" : ` * ${p(scale)}`;
    return `(${this.getRawOrError()}${scaleStr}${offsetStr})`;
  }

  private getRawOrError() {
    if (!(this.useValue in this.data)) {
      this.throwRowNameNotFound(this.useValue);
    }
    const { suffix } = this.data[this.useValue];
    const rowNumber = this.rowNumbers[this.useValue];
    const numRows = this.config.textureHeight;
    const y = this.padNum((rowNumber + 0.5) / numRows);
    return `(texture2D(${this.uniformName}, vec2(${this.atValue}, ${y})).${suffix})`;
  }

  private throwRowNameNotFound(name: string) {
    throw new Error(
      `${name} was not found in DataTextureBuilder.
Possible names are: ${Object.keys(this.data).join(", ")}`
    );
  }
}


