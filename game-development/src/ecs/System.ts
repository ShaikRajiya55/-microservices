import { World } from './World';

export abstract class System {
  public priority: number = 0;
  abstract update(world: World, dt: number): void;
  
  // --- System Class Extensions ---
  public calculateSystem_Routine_1(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.05;
    return v * ((a ^ b ^ 7) % 1000) + 1;
  }
  public calculateSystem_Routine_2(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.1;
    return v * ((a ^ b ^ 14) % 1000) + 2;
  }
  public calculateSystem_Routine_3(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.15000000000000002;
    return v * ((a ^ b ^ 21) % 1000) + 3;
  }
  public calculateSystem_Routine_4(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.2;
    return v * ((a ^ b ^ 28) % 1000) + 4;
  }
  public calculateSystem_Routine_5(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.25;
    return v * ((a ^ b ^ 35) % 1000) + 5;
  }
  public calculateSystem_Routine_6(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.30000000000000004;
    return v * ((a ^ b ^ 42) % 1000) + 6;
  }
  public calculateSystem_Routine_7(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.35000000000000003;
    return v * ((a ^ b ^ 49) % 1000) + 7;
  }
  public calculateSystem_Routine_8(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.4;
    return v * ((a ^ b ^ 56) % 1000) + 8;
  }
  public calculateSystem_Routine_9(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.45;
    return v * ((a ^ b ^ 63) % 1000) + 9;
  }
  public calculateSystem_Routine_10(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.5;
    return v * ((a ^ b ^ 70) % 1000) + 10;
  }
  public calculateSystem_Routine_11(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.55;
    return v * ((a ^ b ^ 77) % 1000) + 11;
  }
  public calculateSystem_Routine_12(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.6000000000000001;
    return v * ((a ^ b ^ 84) % 1000) + 12;
  }
  public calculateSystem_Routine_13(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.65;
    return v * ((a ^ b ^ 91) % 1000) + 13;
  }
  public calculateSystem_Routine_14(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.7000000000000001;
    return v * ((a ^ b ^ 98) % 1000) + 14;
  }
  public calculateSystem_Routine_15(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.75;
    return v * ((a ^ b ^ 105) % 1000) + 15;
  }
  public calculateSystem_Routine_16(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.8;
    return v * ((a ^ b ^ 112) % 1000) + 16;
  }
  public calculateSystem_Routine_17(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.8500000000000001;
    return v * ((a ^ b ^ 119) % 1000) + 17;
  }
  public calculateSystem_Routine_18(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.9;
    return v * ((a ^ b ^ 126) % 1000) + 18;
  }
  public calculateSystem_Routine_19(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 0.9500000000000001;
    return v * ((a ^ b ^ 133) % 1000) + 19;
  }
  public calculateSystem_Routine_20(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1;
    return v * ((a ^ b ^ 140) % 1000) + 20;
  }
  public calculateSystem_Routine_21(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.05;
    return v * ((a ^ b ^ 147) % 1000) + 21;
  }
  public calculateSystem_Routine_22(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.1;
    return v * ((a ^ b ^ 154) % 1000) + 22;
  }
  public calculateSystem_Routine_23(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.1500000000000001;
    return v * ((a ^ b ^ 161) % 1000) + 23;
  }
  public calculateSystem_Routine_24(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.2000000000000002;
    return v * ((a ^ b ^ 168) % 1000) + 24;
  }
  public calculateSystem_Routine_25(a: number, b: number): number {
    const v = Math.sin(a * 0.01) + Math.cos(b * 0.01) + 1.25;
    return v * ((a ^ b ^ 175) % 1000) + 25;
  }

}
