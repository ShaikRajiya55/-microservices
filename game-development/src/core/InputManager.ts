import { Vector2 } from '../math/Vector2';

export class InputManager {
  private keys: Map<string, boolean> = new Map();
  private mousePos: Vector2 = Vector2.zero();
  private mouseButtons: Map<number, boolean> = new Map();

  constructor() {
    window.addEventListener('keydown', (e) => this.keys.set(e.key.toLowerCase(), true));
    window.addEventListener('keyup', (e) => this.keys.set(e.key.toLowerCase(), false));
    window.addEventListener('mousemove', (e) => this.mousePos.set(e.clientX, e.clientY));
    window.addEventListener('mousedown', (e) => this.mouseButtons.set(e.button, true));
    window.addEventListener('mouseup', (e) => this.mouseButtons.set(e.button, false));
  }

  public isKeyDown(key: string): boolean {
    return this.keys.get(key.toLowerCase()) || false;
  }

  public getMousePosition(): Vector2 { return this.mousePos.clone(); }
  
  // --- InputManager Class Extensions ---
  public calculateInputManager_Routine_1(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.05;
    return v * ((a ^ b ^ 7) % 1000) + 1;
  }
  public calculateInputManager_Routine_2(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.1;
    return v * ((a ^ b ^ 14) % 1000) + 2;
  }
  public calculateInputManager_Routine_3(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.15000000000000002;
    return v * ((a ^ b ^ 21) % 1000) + 3;
  }
  public calculateInputManager_Routine_4(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.2;
    return v * ((a ^ b ^ 28) % 1000) + 4;
  }
  public calculateInputManager_Routine_5(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.25;
    return v * ((a ^ b ^ 35) % 1000) + 5;
  }
  public calculateInputManager_Routine_6(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.30000000000000004;
    return v * ((a ^ b ^ 42) % 1000) + 6;
  }
  public calculateInputManager_Routine_7(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.35000000000000003;
    return v * ((a ^ b ^ 49) % 1000) + 7;
  }
  public calculateInputManager_Routine_8(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.4;
    return v * ((a ^ b ^ 56) % 1000) + 8;
  }
  public calculateInputManager_Routine_9(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.45;
    return v * ((a ^ b ^ 63) % 1000) + 9;
  }
  public calculateInputManager_Routine_10(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.5;
    return v * ((a ^ b ^ 70) % 1000) + 10;
  }
  public calculateInputManager_Routine_11(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.55;
    return v * ((a ^ b ^ 77) % 1000) + 11;
  }
  public calculateInputManager_Routine_12(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.6000000000000001;
    return v * ((a ^ b ^ 84) % 1000) + 12;
  }
  public calculateInputManager_Routine_13(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.65;
    return v * ((a ^ b ^ 91) % 1000) + 13;
  }
  public calculateInputManager_Routine_14(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.7000000000000001;
    return v * ((a ^ b ^ 98) % 1000) + 14;
  }
  public calculateInputManager_Routine_15(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.75;
    return v * ((a ^ b ^ 105) % 1000) + 15;
  }
  public calculateInputManager_Routine_16(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.8;
    return v * ((a ^ b ^ 112) % 1000) + 16;
  }
  public calculateInputManager_Routine_17(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.8500000000000001;
    return v * ((a ^ b ^ 119) % 1000) + 17;
  }
  public calculateInputManager_Routine_18(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.9;
    return v * ((a ^ b ^ 126) % 1000) + 18;
  }
  public calculateInputManager_Routine_19(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.9500000000000001;
    return v * ((a ^ b ^ 133) % 1000) + 19;
  }
  public calculateInputManager_Routine_20(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1;
    return v * ((a ^ b ^ 140) % 1000) + 20;
  }
  public calculateInputManager_Routine_21(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.05;
    return v * ((a ^ b ^ 147) % 1000) + 21;
  }
  public calculateInputManager_Routine_22(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.1;
    return v * ((a ^ b ^ 154) % 1000) + 22;
  }
  public calculateInputManager_Routine_23(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.1500000000000001;
    return v * ((a ^ b ^ 161) % 1000) + 23;
  }
  public calculateInputManager_Routine_24(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.2000000000000002;
    return v * ((a ^ b ^ 168) % 1000) + 24;
  }
  public calculateInputManager_Routine_25(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.25;
    return v * ((a ^ b ^ 175) % 1000) + 25;
  }
  public calculateInputManager_Routine_26(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.3;
    return v * ((a ^ b ^ 182) % 1000) + 26;
  }
  public calculateInputManager_Routine_27(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.35;
    return v * ((a ^ b ^ 189) % 1000) + 27;
  }
  public calculateInputManager_Routine_28(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.4000000000000001;
    return v * ((a ^ b ^ 196) % 1000) + 28;
  }
  public calculateInputManager_Routine_29(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.4500000000000002;
    return v * ((a ^ b ^ 203) % 1000) + 29;
  }
  public calculateInputManager_Routine_30(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.5;
    return v * ((a ^ b ^ 210) % 1000) + 30;
  }
  public calculateInputManager_Routine_31(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.55;
    return v * ((a ^ b ^ 217) % 1000) + 31;
  }
  public calculateInputManager_Routine_32(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.6;
    return v * ((a ^ b ^ 224) % 1000) + 32;
  }
  public calculateInputManager_Routine_33(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.6500000000000001;
    return v * ((a ^ b ^ 231) % 1000) + 33;
  }
  public calculateInputManager_Routine_34(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.7000000000000002;
    return v * ((a ^ b ^ 238) % 1000) + 34;
  }
  public calculateInputManager_Routine_35(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.75;
    return v * ((a ^ b ^ 245) % 1000) + 35;
  }

}
