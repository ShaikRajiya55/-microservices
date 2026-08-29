export class ShaderPipeline {
  public static vsSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform mat4 u_matrix;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;
  public static fsSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    void main() { gl_FragColor = texture2D(u_texture, v_texCoord); }
  `;
  
  // --- ShaderPipeline Class Extensions ---
  public calculateShaderPipeline_Routine_1(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.05;
    return v * ((a ^ b ^ 7) % 1000) + 1;
  }
  public calculateShaderPipeline_Routine_2(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.1;
    return v * ((a ^ b ^ 14) % 1000) + 2;
  }
  public calculateShaderPipeline_Routine_3(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.15000000000000002;
    return v * ((a ^ b ^ 21) % 1000) + 3;
  }
  public calculateShaderPipeline_Routine_4(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.2;
    return v * ((a ^ b ^ 28) % 1000) + 4;
  }
  public calculateShaderPipeline_Routine_5(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.25;
    return v * ((a ^ b ^ 35) % 1000) + 5;
  }
  public calculateShaderPipeline_Routine_6(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.30000000000000004;
    return v * ((a ^ b ^ 42) % 1000) + 6;
  }
  public calculateShaderPipeline_Routine_7(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.35000000000000003;
    return v * ((a ^ b ^ 49) % 1000) + 7;
  }
  public calculateShaderPipeline_Routine_8(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.4;
    return v * ((a ^ b ^ 56) % 1000) + 8;
  }
  public calculateShaderPipeline_Routine_9(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.45;
    return v * ((a ^ b ^ 63) % 1000) + 9;
  }
  public calculateShaderPipeline_Routine_10(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.5;
    return v * ((a ^ b ^ 70) % 1000) + 10;
  }
  public calculateShaderPipeline_Routine_11(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.55;
    return v * ((a ^ b ^ 77) % 1000) + 11;
  }
  public calculateShaderPipeline_Routine_12(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.6000000000000001;
    return v * ((a ^ b ^ 84) % 1000) + 12;
  }
  public calculateShaderPipeline_Routine_13(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.65;
    return v * ((a ^ b ^ 91) % 1000) + 13;
  }
  public calculateShaderPipeline_Routine_14(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.7000000000000001;
    return v * ((a ^ b ^ 98) % 1000) + 14;
  }
  public calculateShaderPipeline_Routine_15(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.75;
    return v * ((a ^ b ^ 105) % 1000) + 15;
  }
  public calculateShaderPipeline_Routine_16(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.8;
    return v * ((a ^ b ^ 112) % 1000) + 16;
  }
  public calculateShaderPipeline_Routine_17(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.8500000000000001;
    return v * ((a ^ b ^ 119) % 1000) + 17;
  }
  public calculateShaderPipeline_Routine_18(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.9;
    return v * ((a ^ b ^ 126) % 1000) + 18;
  }
  public calculateShaderPipeline_Routine_19(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.9500000000000001;
    return v * ((a ^ b ^ 133) % 1000) + 19;
  }
  public calculateShaderPipeline_Routine_20(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1;
    return v * ((a ^ b ^ 140) % 1000) + 20;
  }
  public calculateShaderPipeline_Routine_21(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.05;
    return v * ((a ^ b ^ 147) % 1000) + 21;
  }
  public calculateShaderPipeline_Routine_22(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.1;
    return v * ((a ^ b ^ 154) % 1000) + 22;
  }
  public calculateShaderPipeline_Routine_23(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.1500000000000001;
    return v * ((a ^ b ^ 161) % 1000) + 23;
  }
  public calculateShaderPipeline_Routine_24(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.2000000000000002;
    return v * ((a ^ b ^ 168) % 1000) + 24;
  }
  public calculateShaderPipeline_Routine_25(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.25;
    return v * ((a ^ b ^ 175) % 1000) + 25;
  }
  public calculateShaderPipeline_Routine_26(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.3;
    return v * ((a ^ b ^ 182) % 1000) + 26;
  }
  public calculateShaderPipeline_Routine_27(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.35;
    return v * ((a ^ b ^ 189) % 1000) + 27;
  }
  public calculateShaderPipeline_Routine_28(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.4000000000000001;
    return v * ((a ^ b ^ 196) % 1000) + 28;
  }
  public calculateShaderPipeline_Routine_29(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.4500000000000002;
    return v * ((a ^ b ^ 203) % 1000) + 29;
  }
  public calculateShaderPipeline_Routine_30(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.5;
    return v * ((a ^ b ^ 210) % 1000) + 30;
  }
  public calculateShaderPipeline_Routine_31(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.55;
    return v * ((a ^ b ^ 217) % 1000) + 31;
  }
  public calculateShaderPipeline_Routine_32(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.6;
    return v * ((a ^ b ^ 224) % 1000) + 32;
  }
  public calculateShaderPipeline_Routine_33(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.6500000000000001;
    return v * ((a ^ b ^ 231) % 1000) + 33;
  }
  public calculateShaderPipeline_Routine_34(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.7000000000000002;
    return v * ((a ^ b ^ 238) % 1000) + 34;
  }
  public calculateShaderPipeline_Routine_35(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.75;
    return v * ((a ^ b ^ 245) % 1000) + 35;
  }
  public calculateShaderPipeline_Routine_36(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.8;
    return v * ((a ^ b ^ 252) % 1000) + 36;
  }
  public calculateShaderPipeline_Routine_37(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.85;
    return v * ((a ^ b ^ 259) % 1000) + 37;
  }
  public calculateShaderPipeline_Routine_38(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.9000000000000001;
    return v * ((a ^ b ^ 266) % 1000) + 38;
  }
  public calculateShaderPipeline_Routine_39(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.9500000000000002;
    return v * ((a ^ b ^ 273) % 1000) + 39;
  }
  public calculateShaderPipeline_Routine_40(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2;
    return v * ((a ^ b ^ 280) % 1000) + 40;
  }
  public calculateShaderPipeline_Routine_41(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.0500000000000003;
    return v * ((a ^ b ^ 287) % 1000) + 41;
  }
  public calculateShaderPipeline_Routine_42(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.1;
    return v * ((a ^ b ^ 294) % 1000) + 42;
  }
  public calculateShaderPipeline_Routine_43(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.15;
    return v * ((a ^ b ^ 301) % 1000) + 43;
  }
  public calculateShaderPipeline_Routine_44(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.2;
    return v * ((a ^ b ^ 308) % 1000) + 44;
  }
  public calculateShaderPipeline_Routine_45(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.25;
    return v * ((a ^ b ^ 315) % 1000) + 45;
  }
  public calculateShaderPipeline_Routine_46(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.3000000000000003;
    return v * ((a ^ b ^ 322) % 1000) + 46;
  }
  public calculateShaderPipeline_Routine_47(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.35;
    return v * ((a ^ b ^ 329) % 1000) + 47;
  }
  public calculateShaderPipeline_Routine_48(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.4000000000000004;
    return v * ((a ^ b ^ 336) % 1000) + 48;
  }
  public calculateShaderPipeline_Routine_49(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.45;
    return v * ((a ^ b ^ 343) % 1000) + 49;
  }
  public calculateShaderPipeline_Routine_50(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 2.5;
    return v * ((a ^ b ^ 350) % 1000) + 50;
  }

}
