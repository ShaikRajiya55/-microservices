/**
 * @file pid_controller.h
 * @brief PID Control Loop with Anti-Windup Header Interface
 * @details NexOS Industrial Embedded Systems Platform
 * Copyright (c) 2026 NexOS Platform. All rights reserved.
 */

#ifndef NEXOS_DSP_PID_CONTROLLER_H
#define NEXOS_DSP_PID_CONTROLLER_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

#define NEXOS_DSP_PID_CONTROLLER_H_VERSION "2.5.0"
#define NEXOS_DSP_PID_CONTROLLER_H_MAGIC   0x584F5300

typedef enum {
    NEXOS_DSP_PID_CONTROLLER_STATUS_OK = 0,
    NEXOS_DSP_PID_CONTROLLER_STATUS_ERROR = -1,
    NEXOS_DSP_PID_CONTROLLER_STATUS_BUSY = -2,
    NEXOS_DSP_PID_CONTROLLER_STATUS_TIMEOUT = -3,
    NEXOS_DSP_PID_CONTROLLER_STATUS_PARAM_ERR = -4,
    NEXOS_DSP_PID_CONTROLLER_STATUS_NO_MEM = -5
} nexos_dsp_pid_controller_status_t;

typedef struct {
    uint32_t magic_id;
    uint32_t state_flags;
    uint32_t error_counter;
    uint32_t tick_counter;
    void *priv_data;
    uint8_t buffer[256];
} nexos_dsp_pid_controller_handle_t;

nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_init(nexos_dsp_pid_controller_handle_t *handle);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_deinit(nexos_dsp_pid_controller_handle_t *handle);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_reset(nexos_dsp_pid_controller_handle_t *handle);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_1(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_2(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_3(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_4(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_5(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_6(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_7(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_8(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_9(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_10(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_11(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_12(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_13(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_14(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_15(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_16(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_17(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_18(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_19(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_dsp_pid_controller_status_t nexos_dsp_pid_controller_process_step_20(nexos_dsp_pid_controller_handle_t *handle, uint32_t in_val, uint32_t *out_val);

#ifdef __cplusplus
}
#endif

#endif /* NEXOS_DSP_PID_CONTROLLER_H */
