import type { Material } from 'three'
import { MeshBasicMaterial } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

interface Props {
  baseMaterial: Material
  vertexShader?: string
  fragmentShader?: string
  silent?: boolean
  uniforms?: { [uniform: string]: any }
  flatShading?: boolean
  color?: string | number
}

export class CustomShaderMaterialImpl extends CustomShaderMaterial {
  baseMaterial: Material
  vertexShader?: string
  fragmentShader?: string
  silent?: boolean
  uniforms?: { [uniform: string]: any }
  flatShading?: boolean
  color?: string | number

  constructor(props: Props = { baseMaterial: new MeshBasicMaterial() }) {
    super(props)

    this.baseMaterial = props.baseMaterial
    this.vertexShader = props.vertexShader
    this.fragmentShader = props.fragmentShader
    this.silent = props.silent
    this.uniforms = props.uniforms
    this.flatShading = props.flatShading
    this.color = props.color
  }
}
