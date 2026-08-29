/**
 * @file ssd1306.h
 * @brief SSD1306 OLED Display Graphics Driver Header Interface
 * @details NexOS Industrial Embedded Systems Platform
 * Copyright (c) 2026 NexOS Platform. All rights reserved.
 */

#ifndef NEXOS_DRIVERS_SSD1306_H
#define NEXOS_DRIVERS_SSD1306_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

#define NEXOS_DRIVERS_SSD1306_H_VERSION "2.5.0"
#define NEXOS_DRIVERS_SSD1306_H_MAGIC   0x584F5300

typedef enum {
    NEXOS_DRIVERS_SSD1306_STATUS_OK = 0,
    NEXOS_DRIVERS_SSD1306_STATUS_ERROR = -1,
    NEXOS_DRIVERS_SSD1306_STATUS_BUSY = -2,
    NEXOS_DRIVERS_SSD1306_STATUS_TIMEOUT = -3,
    NEXOS_DRIVERS_SSD1306_STATUS_PARAM_ERR = -4,
    NEXOS_DRIVERS_SSD1306_STATUS_NO_MEM = -5
} nexos_drivers_ssd1306_status_t;

typedef struct {
    uint32_t magic_id;
    uint32_t state_flags;
    uint32_t error_counter;
    uint32_t tick_counter;
    void *priv_data;
    uint8_t buffer[256];
} nexos_drivers_ssd1306_handle_t;

nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_init(nexos_drivers_ssd1306_handle_t *handle);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_deinit(nexos_drivers_ssd1306_handle_t *handle);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_reset(nexos_drivers_ssd1306_handle_t *handle);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_1(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_2(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_3(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_4(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_5(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_6(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_7(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_8(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_9(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_10(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_11(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_12(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_13(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_14(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_15(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_16(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_17(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_18(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_19(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_drivers_ssd1306_status_t nexos_drivers_ssd1306_process_step_20(nexos_drivers_ssd1306_handle_t *handle, uint32_t in_val, uint32_t *out_val);

#ifdef __cplusplus
}
#endif

#endif /* NEXOS_DRIVERS_SSD1306_H */
