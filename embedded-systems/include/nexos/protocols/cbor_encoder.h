/**
 * @file cbor_encoder.h
 * @brief CBOR Binary Data Serialization Stack Header Interface
 * @details NexOS Industrial Embedded Systems Platform
 * Copyright (c) 2026 NexOS Platform. All rights reserved.
 */

#ifndef NEXOS_PROTOCOLS_CBOR_ENCODER_H
#define NEXOS_PROTOCOLS_CBOR_ENCODER_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

#define NEXOS_PROTOCOLS_CBOR_ENCODER_H_VERSION "2.5.0"
#define NEXOS_PROTOCOLS_CBOR_ENCODER_H_MAGIC   0x584F5300

typedef enum {
    NEXOS_PROTOCOLS_CBOR_ENCODER_STATUS_OK = 0,
    NEXOS_PROTOCOLS_CBOR_ENCODER_STATUS_ERROR = -1,
    NEXOS_PROTOCOLS_CBOR_ENCODER_STATUS_BUSY = -2,
    NEXOS_PROTOCOLS_CBOR_ENCODER_STATUS_TIMEOUT = -3,
    NEXOS_PROTOCOLS_CBOR_ENCODER_STATUS_PARAM_ERR = -4,
    NEXOS_PROTOCOLS_CBOR_ENCODER_STATUS_NO_MEM = -5
} nexos_protocols_cbor_encoder_status_t;

typedef struct {
    uint32_t magic_id;
    uint32_t state_flags;
    uint32_t error_counter;
    uint32_t tick_counter;
    void *priv_data;
    uint8_t buffer[256];
} nexos_protocols_cbor_encoder_handle_t;

nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_init(nexos_protocols_cbor_encoder_handle_t *handle);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_deinit(nexos_protocols_cbor_encoder_handle_t *handle);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_reset(nexos_protocols_cbor_encoder_handle_t *handle);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_1(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_2(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_3(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_4(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_5(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_6(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_7(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_8(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_9(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_10(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_11(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_12(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_13(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_14(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_15(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_16(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_17(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_18(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_19(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_protocols_cbor_encoder_status_t nexos_protocols_cbor_encoder_process_step_20(nexos_protocols_cbor_encoder_handle_t *handle, uint32_t in_val, uint32_t *out_val);

#ifdef __cplusplus
}
#endif

#endif /* NEXOS_PROTOCOLS_CBOR_ENCODER_H */
